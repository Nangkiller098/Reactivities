import axios, { AxiosError, AxiosResponse } from "axios";
import { Activities } from "../../models/Activities";
import { toast } from "react-toastify";
import { router } from "../router/Routes";
import { store } from "../stores/store";
import { User, UserFormValus } from "../../models/user";

//set sleep request api for 10000 second
const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

//set option alert base on statecode from api

//base url api
axios.defaults.baseURL = "http://localhost:5000/api/";

//function sleep api
axios.interceptors.response.use(
  async (response) => {
    await sleep(1000);
    return response;
  },
  //if error
  (error: AxiosError) => {
    const { data, status, config } = error.response as AxiosResponse;

    //
    switch (status) {
      case 400:
        if (
          config.method === "get" &&
          Object.prototype.hasOwnProperty.call(data.errors, "id")
        ) {
          router.navigate("/not-found");
        }
        if (data.errors) {
          const modelStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modelStateErrors.push(data.errors[key]);
            }
          }
          throw modelStateErrors.flat();
        } else {
          toast.error(data);
        }
        break;
      case 401:
        toast.error("unauthorised");
        break;
      case 404:
        router.navigate("/not-found");
        break;
      case 500:
        store.commonStore.setServerError(data);
        router.navigate("/server-error");
        break;
      default:
        break;
    }
    return Promise.reject(error);
  }
);

//catch response from api
const responseBody = <T>(response: AxiosResponse<T>) => response.data;

//setup Authorization
axios.interceptors.request.use((config) => {
  const token = store.commonStore.token;
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

//request main api get/post/path/delete
const request = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: object) =>
    axios.post<T>(url, body).then(responseBody),
  patch: <T>(url: string, body: object) =>
    axios.patch<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

//request api activites
const Activities = {
  list: () => request.get<Activities[]>("/activities"),
  details: (id: string) => request.get<Activities>(`/activities/${id}`),
  create: (activity: Activities) => request.post<void>(`/activities`, activity),
  update: (activity: Activities) =>
    request.patch<void>(`/activities/${activity.id}`, activity),
  delete: (id: string) => axios.delete<void>(`/activities/${id}`),
};

//get user from login
const Account = {
  current: () => request.get<User>(`/account`),
  login: (user: UserFormValus) => request.post<User>(`/account/login`, user),
  register: (user: UserFormValus) =>
    request.post<User>(`/accoutn/register`, user),
};

const agent = {
  Activities,
  Account,
};
export default agent;
