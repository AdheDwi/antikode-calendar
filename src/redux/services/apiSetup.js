import { create } from "apisauce";

const api = create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  timeout: 60000,
});

export default api;
