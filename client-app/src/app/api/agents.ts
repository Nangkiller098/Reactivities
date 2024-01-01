import axios, { AxiosResponse } from "axios";
import { Activities } from "../../models/Activities";

axios.defaults.baseURL = "http://localhost:5000/api/";

const responseBody = <T>(response: AxiosResponse<T>) => response.data;
const request = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: Record<string, never>) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: Record<string, never>) =>
    axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};
const Activities = {
  list: () => request.get<Activities[]>("/activities"),
};

const agent = {
  Activities,
};
export default agent;
