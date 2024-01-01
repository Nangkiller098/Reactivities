import axios, { AxiosResponse } from "axios";
import { Activities } from "../../models/Activities";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = "http://localhost:5000/api/";
axios.interceptors.response.use(async (response) => {
  try {
    await sleep(1000);
    return response;
  } catch (ex) {
    console.log(ex);
    return await Promise.reject(ex);
  }
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;
const request = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: object) =>
    axios.post<T>(url, body).then(responseBody),
  patch: <T>(url: string, body: object) =>
    axios.patch<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};
const Activities = {
  list: () => request.get<Activities[]>("/activities"),
  details: (id: string) => request.get<Activities>(`/activities/${id}`),
  create: (activity: Activities) => request.post<void>(`/activities`, activity),
  update: (activity: Activities) =>
    request.patch<void>(`/activities/${activity.id}`, activity),
  delete: (id: string) => axios.delete<void>(`/activities/${id}`),
};

const agent = {
  Activities,
};
export default agent;
