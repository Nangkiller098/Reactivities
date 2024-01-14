/* The CommonStore class is used to handle server error messages and store the token in local storage
for an ASP.NET Core application. */

import { ServerError } from "./../../models/serverError";
import { makeAutoObservable, reaction } from "mobx";

//Commonstore is use for get server message error and token from asp.net core
export default class CommonStore {
  error: ServerError | null = null;
  token: string | null | undefined = localStorage.getItem("jwt");
  appLoaded = false;

  constructor() {
    makeAutoObservable(this);
    reaction(
      () => this.token,
      (token) => {
        if (token) {
          localStorage.setItem("jwt", token);
        } else {
          localStorage.removeItem("jwt");
        }
      }
    );
  }

  //push alert error message from server
  setServerError(error: ServerError) {
    this.error = error;
  }

  //set token to localstoreage
  setToken = (token: string | null | undefined) => {
    if (token) localStorage.setItem("jwt", token);
    this.token = token;
  };

  //load app
  setAppLoaded = () => {
    this.appLoaded = true;
  };
}
