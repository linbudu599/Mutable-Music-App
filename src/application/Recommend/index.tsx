import React, { useRef, useState, useEffect } from "react";
import Slider, { IBanner } from "../../components/slider";
import RecommendList, { IRecommendItem } from "../../components/list";
import Scroll from "../../components/scroll";
import { Content } from "./style";
import { useSelector, useDispatch } from "react-redux";
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
    recommendList: state.getIn(["recommend", "recommendList"])
  }));

  const dispatch = useDispatch();
  const { bannerList, recommendList } = selectedData;
  const scrollRef = useRef();

  useEffect(() => {
    dispatch(actionTypes.getBannerList());
    dispatch(actionTypes.getRecommendList());
    //eslint-disable-next-line
  }, []);

  const bannerListJS = bannerList ? bannerList.toJS() : [];
  const recommendListJS = recommendList ? recommendList.toJS() : [];

  return (
    <Content>
      <Scroll className="list" ref={scrollRef}>
        <div>
          <Slider bannerList={bannerListJS}></Slider>
          <RecommendList recommendList={recommendListJS}></RecommendList>
        </div>
      </Scroll>
    </Content>
  );
};

export default React.memo(Recommend);
