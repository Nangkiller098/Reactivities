import { Activities } from "./../../models/Activities";
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agents";
import { v4 as uuid } from "uuid";
export default class ActivityStore {
  activityRegistry = new Map<string, Activities>();
  selectedActivity: Activities | undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  //get data and sort by date to z-a
  get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => Date.parse(b.date) - Date.parse(a.date)
    );
  }

  //loading all data activity
  loadActivities = async () => {
    this.setLoadingInitial(true);
    try {
      const activities = await agent.Activities.list();
      activities.forEach((activity) => {
        this.setActivity(activity);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  //load activity by id in view form
  loadActivity = async (id: string) => {
    let activity = this.getActivity(id);
    if (activity) {
      this.selectedActivity = activity;
      return activity;
    } else {
      try {
        activity = await agent.Activities.details(id);
        if (!activity) {
          alert("null");
        }
        this.setActivity(activity);
        runInAction(() => {
          this.selectedActivity = activity;
          this.setLoadingInitial(false);
        });
        //
        return activity;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  //set date in activty view
  private setActivity = (activity: Activities) => {
    activity.date = activity.date.split("T")[0];
    this.activityRegistry.set(activity.id, activity);
  };

  //select and get activty by id
  private getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  };

  //for checking create or edit activity
  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  //create activity
  createActiviy = async (activity: Activities) => {
    this.loading = true;
    activity.id = uuid();
    try {
      await agent.Activities.create(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.editMode = false;
        this.loading = false;
      });
    }
  };

  //update activity
  updateActivity = async (activity: Activities) => {
    this.loading = true;
    try {
      await agent.Activities.update(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  //delete activity
  deleteActivity = async (id: string) => {
    this.loading = true;
    try {
      await agent.Activities.delete(id);
      runInAction(() => {
        this.activityRegistry.delete(id);
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}
