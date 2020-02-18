import React, { useRef, useState, useEffect } from "react";
import Slider, { IBanner } from "../../components/slider";
import RecommendList, { IRecommendItem } from "../../components/list";
import Loading from "../../baseUI/loading/index";
import Scroll from "../../baseUI/scroll";
import { Content } from "./style";
import { useSelector, useDispatch } from "react-redux";
import { forceCheck } from "react-lazyload";
import * as actionTypes from "./store/actionCreators";

// TODO: should declare these items?
interface IRecommend {
  bannerList?: any;
  recommendList?: any;
  getBannerDataDispatch?: any;
  getRecommendListDataDispatch?: any;
}

const Recommend: React.FC<IRecommend> = props => {
  const selectedData = useSelector((state: any) => ({
    bannerList: state.getIn(["recommend", "bannerList"]),
    recommendList: state.getIn(["recommend", "recommendList"]),
    enterLoading: state.getIn(["recommend", "enterLoading"])
  }));

  const dispatch = useDispatch();
  const { bannerList, recommendList, enterLoading } = selectedData;
  const scrollRef = useRef();

  useEffect(() => {
    dispatch(actionTypes.getBannerList());
    dispatch(actionTypes.getRecommendList());
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    // 如果页面有数据，则不发请求
    //immutable 数据结构中长度属性 size
    if (!bannerList.size) {
      dispatch(actionTypes.getBannerList());
    }
    if (!recommendList.size) {
      dispatch(actionTypes.getRecommendList());
    }
    // eslint-disable-next-line
  }, []);

  const bannerListJS = bannerList ? bannerList.toJS() : [];
  const recommendListJS = recommendList ? recommendList.toJS() : [];

  return (
    <Content>
      <Scroll className="list" onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerListJS}></Slider>
          <RecommendList recommendList={recommendListJS}></RecommendList>
        </div>
        {enterLoading ? <Loading></Loading> : null}
      </Scroll>
    </Content>
  );
};

export default React.memo(Recommend);
