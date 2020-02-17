import { axiosInstance } from "./config";
import { AxiosResponse } from "axios";

interface Banner {
  banners: any;
}

export const getBannerRequest = () => {
  return axiosInstance.get("/banner") as Promise<AxiosResponse<any> & Banner>;
};

interface Result {
  result: string;
}

export const getRecommendListRequest = () => {
  return axiosInstance.get("/personalized") as Promise<
    AxiosResponse<any> & Result
  >;
};
