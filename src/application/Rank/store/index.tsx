import { fromJS } from "immutable";

import { getRankListRequest } from "../../../api/request";

export const CHANGE_RANK_LIST = "home/rank/CHANGE_RANK_LIST";
export const CHANGE_LOADING = "home/rank/CHANGE_LOADING";

const changeRankList = (data: any) => ({
  type: CHANGE_RANK_LIST,
  data: fromJS(data)
});

const changeLoading = (data: boolean) => ({
  type: CHANGE_LOADING,
  data
});

export const getRankList = () => {
  return (dispatch: any) => {
    getRankListRequest().then(res => {
      let list = res && res.list;
      dispatch(changeRankList(list));
      dispatch(changeLoading(false));
    });
  };
};

const defaultState = fromJS({
  rankList: [],
  loading: true
});

const reducer = (state = defaultState, action: { type: string; data: any }) => {
  switch (action.type) {
    case CHANGE_RANK_LIST:
      return state.set("rankList", action.data);
    case CHANGE_LOADING:
      return state.set("loading", action.data);
    default:
      return state;
  }
};

export { reducer };
