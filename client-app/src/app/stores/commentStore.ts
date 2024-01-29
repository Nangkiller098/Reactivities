import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { ChatComment } from "../../models/comment";
import { makeAutoObservable, runInAction } from "mobx";
import { store } from "./store";

export default class CommentStore {
  comments: ChatComment[] = [];
  hubConntextion: HubConnection | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  createHubConnection = (activityId: string) => {
    if (store.activityStore.selectedActivity) {
      this.hubConntextion = new HubConnectionBuilder()
        .withUrl(import.meta.env.VITE_CHAT_URL + "?activityId=" + activityId, {
          accessTokenFactory: () => store.userStore.user?.token as string,
        })
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build();
      this.hubConntextion
        .start()
        .catch((error) =>
          console.log("Error establishing the connection", error)
        );

      this.hubConntextion.on("LoadComments", (comments: ChatComment[]) => {
        runInAction(() => {
          comments.forEach((comment) => {
            comment.createdAt = new Date(comment.createdAt);
          });
          this.comments = comments;
        });
      });

      this.hubConntextion.on("ReceiveComment", (comment: ChatComment) => {
        comment.createdAt = new Date(comment.createdAt);
        runInAction(() => this.comments.push(comment));
      });
    }
  };

  stopHubConnection = () => {
    this.hubConntextion
      ?.stop()
      .catch((error) => console.log("Error stopping connection", error));
  };

  clearComments = () => {
    this.comments = [];
    this.stopHubConnection();
  };

  addComment = async (values: { body: string; activityId?: string }) => {
    values.activityId = store.activityStore.selectedActivity?.id;
    try {
      await this.hubConntextion?.invoke("SendComment", values);
    } catch (error) {
      console.log(error);
    }
  };
}
