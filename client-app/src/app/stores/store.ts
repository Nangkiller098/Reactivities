/* The code is creating a store object that contains instances of different store classes. These store
classes are used to manage the state of the application. */

import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import CommonStore from "./commonStore";
import UserStore from "./UserStore";
import ModalStore from "./modalStore";
import ProfielStore from "./profileStore";
import CommentStore from "./commentStore";
interface Store {
  activityStore: ActivityStore;
  commonStore: CommonStore;
  userStore: UserStore;
  modalStore: ModalStore;
  profileStore: ProfielStore;
  commentStore: CommentStore;
}
export const store: Store = {
  activityStore: new ActivityStore(),
  commonStore: new CommonStore(),
  userStore: new UserStore(),
  modalStore: new ModalStore(),
  profileStore: new ProfielStore(),
  commentStore: new CommentStore(),
};
export const StoreContext = createContext(store);
export function useStore() {
  return useContext(StoreContext);
}
