import { RankTypes } from "./config";

export const getCount = (count: number): string | number | undefined => {
  if (count < 0) return;
  if (count < 10000) {
    return count;
  } else if (Math.floor(count / 10000) < 10000) {
    return Math.floor(count / 1000) / 10 + "万";
  } else {
    return Math.floor(count / 10000000) / 10 + "亿";
  }
};

export const debounce = (func: () => {}, delay: number) => {
  let timer: number;
  return function(...args: any[]) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      // @ts-ignore
      func.apply(this, args);
      clearTimeout(timer);
    }, delay);
  };
};

export const filterIndex = (rankList: any[]) => {
  for (let i = 0; i < rankList.length - 1; i++) {
    // 当前项有歌名而下一项没有 说明下一项是全球榜单
    if (rankList[i].tracks.length && !rankList[i + 1].tracks.length) {
      return i + 1;
    }
  }
};
//找出排行榜的编号
export const filterIdx = (name: string) => {
  for (let key in RankTypes) {
    if ((RankTypes[key] as string) === name) return key;
  }
  return null;
};
