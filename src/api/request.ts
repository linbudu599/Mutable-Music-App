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

export const getHotSingerListRequest = (
  count: number
): Promise<AxiosResponse<any>> => {
  return axiosInstance.get(`/top/artists?offset=${count}`);
};

export const getSingerListRequest = (
  category: string,
  alpha: string,
  count: number
) => {
  return axiosInstance.get(
    `/artist/list?cat=${category}&initial=${alpha.toLowerCase()}&offset=${count}`
  );
};
