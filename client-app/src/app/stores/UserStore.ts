import { makeAutoObservable, runInAction } from "mobx";
import { User, UserFormValus } from "../../models/user";
import agent from "../api/agents";
import { store } from "./store";
import { router } from "../router/Routes";

//UserStore is for get user for login and logout and register
export default class UserStore {
  user: User | null = null;
  constructor() {
    makeAutoObservable(this);
  }
  //check user login or not
  get isLoggedIn() {
    return !!this.user;
  }
  //login
  login = async (creds: UserFormValus) => {
    try {
      const user = await agent.Account.login(creds);
      store.commonStore.setToken(user.token);
      runInAction(() => (this.user = user));
      router.navigate("/activities");
      store.modalStore.closeModal();
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  //logout
  logout = () => {
    store.commonStore.setToken(null);
    this.user = null;
    router.navigate(`/`);
  };

  //getuser
  getUser = async () => {
    try {
      const user = await agent.Account.current();
      runInAction(() => (this.user = user));
    } catch (error) {
      console.log(error);
    }
  };
}
