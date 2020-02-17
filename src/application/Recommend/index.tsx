import React, { useRef, useState, useEffect } from "react";
import Slider, { IBanner } from "../../components/slider";
import RecommendList, { IRecommendItem } from "../../components/list";
import Scroll from "../../components/scroll";
import { Content } from "./style";
import { connect } from "react-redux";
import * as actionTypes from "./store/actionCreators";

interface IRecommend {
  bannerList?: any;
  recommendList?: any;
  getBannerDataDispatch?: any;
  getRecommendListDataDispatch?: any;
}

const Recommend: React.FC<IRecommend> = props => {
  const { bannerList, recommendList } = props;
  const { getBannerDataDispatch, getRecommendListDataDispatch } = props;
  const scrollRef = useRef();

  useEffect(() => {
    getBannerDataDispatch();
    getRecommendListDataDispatch();
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

// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = (state: any) => ({
  // 不要在这里将数据 toJS
  // 不然每次 diff 比对 props 的时候都是不一样的引用，还是导致不必要的重渲染，属于滥用 immutable
  // 仓库中是一个immutable对象，因此可以直接在其属性上调用toJS，见上面
  bannerList: state.getIn(["recommend", "bannerList"]),
  recommendList: state.getIn(["recommend", "recommendList"])
});

// 映射 dispatch 到 props 上
const mapDispatchToProps = (dispatch: any) => {
  return {
    getBannerDataDispatch() {
      dispatch(actionTypes.getBannerList());
    },
    getRecommendListDataDispatch() {
      dispatch(actionTypes.getRecommendList());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Recommend));
