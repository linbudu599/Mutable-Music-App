import React, { useState, useEffect } from "react";
import Horizen from "../../baseUI/horizon-item";
import { categoryTypes, alphaTypes } from "../../api/config";
import { NavContainer, ListContainer, List, ListItem } from "./style";
import Loading from "../../baseUI/loading";
import {
  getSingerList,
  getHotSingerList,
  changeEnterLoading,
  changePageCount,
  refreshMoreSingerList,
  changePullUpLoading,
  changePullDownLoading,
  refreshMoreHotSingerList
} from "./store/actionCreators";
import Scroll from "./../../baseUI/scroll/index";
import { connect, useSelector, useDispatch } from "react-redux";
import LazyLoad, { forceCheck } from "react-lazyload";

interface ISingerList {
  singerList: any[];
  enterLoading: boolean;
  pullUpLoading: boolean;
  pullDownLoading: boolean;
  pageCount: number;
  getHotSingerDispatch: any;
  updateDispatch: any;
  pullDownRefreshDispatch: any;
  pullUpRefreshDispatch: any;
}

type IS = Partial<ISingerList>;

const Singers: React.FC<IS> = props => {
  let [category, setCategory] = useState<string>("");
  let [alpha, setAlpha] = useState<string>("");

  const {
    singerList,
    enterLoading,
    pullUpLoading,
    pullDownLoading,
    pageCount
  } = props;

  const {
    getHotSingerDispatch,
    updateDispatch,
    pullDownRefreshDispatch,
    pullUpRefreshDispatch
  } = props;

  useEffect(() => {
    getHotSingerDispatch();
    // eslint-disable-next-line
  }, []);

  let handleUpdateCatetory = (val: string): void => {
    setCategory(val);
    updateDispatch(val, alpha);
  };

  let handleUpdateAlpha = (val: string): void => {
    setAlpha(val);
    updateDispatch(category, val);
  };

  const handlePullUp = () => {
    pullUpRefreshDispatch(category, alpha, category === "", pageCount);
  };

  const handlePullDown = () => {
    pullDownRefreshDispatch(category, alpha);
  };

  const renderSingerList = () => {
    // @ts-ignore
    const list = singerList ? singerList.toJS() : [];
    return (
      <List>
        {list.map((item: any, index: number) => {
          return (
            <ListItem key={item.accountId + "" + index}>
              <div className="img_wrapper">
                <LazyLoad
                  placeholder={
                    <img
                      width="100%"
                      height="100%"
                      src={require("./music.png")}
                      // src={require("./singer.png")}
                      alt="music"
                    />
                  }
                >
                  <img
                    src={`${item.picUrl}?param=300x300`}
                    width="100%"
                    height="100%"
                    alt="music"
                  />
                </LazyLoad>
              </div>
              <span className="name">{item.name}</span>
            </ListItem>
          );
        })}
      </List>
    );
  };
  return (
    <NavContainer>
      <Horizen
        list={categoryTypes}
        title={"分类 (默认热门):"}
        handleClick={(val: string) => {
          handleUpdateCatetory(val);
        }}
        oldVal={category}
      ></Horizen>
      <Horizen
        list={alphaTypes}
        title={"首字母:"}
        handleClick={(val: string) => handleUpdateAlpha(val)}
        oldVal={alpha}
      ></Horizen>
      <ListContainer>
        <Scroll
          pullUp={handlePullUp}
          pullDown={handlePullDown}
          pullUpLoading={pullUpLoading}
          pullDownLoading={pullDownLoading}
          onScroll={forceCheck}
        >
          {renderSingerList()}
        </Scroll>
        <Loading show={enterLoading}></Loading>
      </ListContainer>
    </NavContainer>
  );
};

const mapStateToProps = (state: any) => ({
  singerList: state.getIn(["singers", "singerList"]),
  enterLoading: state.getIn(["singers", "enterLoading"]),
  pullUpLoading: state.getIn(["singers", "pullUpLoading"]),
  pullDownLoading: state.getIn(["singers", "pullDownLoading"]),
  pageCount: state.getIn(["singers", "pageCount"])
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    getHotSingerDispatch() {
      dispatch(getHotSingerList());
    },
    updateDispatch(category: string, alpha: string) {
      dispatch(changePageCount(0)); //由于改变了分类，所以pageCount清零
      dispatch(changeEnterLoading(true)); //loading，现在实现控制逻辑，效果实现放到下一节，后面的loading同理
      dispatch(getSingerList(category, alpha));
    },
    // 滑到最底部刷新部分的处理
    pullUpRefreshDispatch(
      category: string,
      alpha: string,
      hot: boolean,
      count: number
    ) {
      dispatch(changePullUpLoading(true));
      dispatch(changePageCount(count + 1));
      if (hot) {
        dispatch(refreshMoreHotSingerList());
      } else {
        dispatch(refreshMoreSingerList(category, alpha));
      }
    },
    //顶部下拉刷新
    pullDownRefreshDispatch(category: string, alpha: string) {
      dispatch(changePullDownLoading(true));
      dispatch(changePageCount(0)); //属于重新获取数据
      if (category === "" && alpha === "") {
        dispatch(getHotSingerList());
      } else {
        dispatch(getSingerList(category, alpha));
      }
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Singers));
