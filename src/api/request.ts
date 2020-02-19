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

type PromiseRes = Promise<AxiosResponse<any> & Result>;

export const getRecommendListRequest = () => {
  return axiosInstance.get("/personalized") as PromiseRes;
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
  console.log(category, alpha, count);
  return axiosInstance.get(
    `/artist/list?cat=${category}&initial=${alpha.toLowerCase()}&offset=${count}`
  );
};

interface IList {
  list: any[];
}

export const getRankListRequest = () => {
  return axiosInstance.get(`/toplist/detail`) as Promise<
    AxiosResponse<any> & IList
  >;
};
