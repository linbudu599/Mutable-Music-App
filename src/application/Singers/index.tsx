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
import { useSelector, useDispatch } from "react-redux";
import LazyLoad, { forceCheck } from "react-lazyload";

const Singers: React.FC = () => {
  let [category, setCategory] = useState<string>("");
  let [alpha, setAlpha] = useState<string>("");

  const data = useSelector((state: any) => ({
    singerList: state.getIn(["singers", "singerList"]),
    enterLoading: state.getIn(["singers", "enterLoading"]),
    pullUpLoading: state.getIn(["singers", "pullUpLoading"]),
    pullDownLoading: state.getIn(["singers", "pullDownLoading"]),
    pageCount: state.getIn(["singers", "pageCount"])
  }));

  const dispatch = useDispatch();

  const {
    singerList,
    enterLoading,
    pullUpLoading,
    pullDownLoading,
    pageCount
  } = data;

  useEffect(() => {
    dispatch(getHotSingerList());
    // eslint-disable-next-line
  }, []);

  let handleUpdateCatetory = (val: string): void => {
    setCategory(val);
    dispatch(changePageCount(0)); //由于改变了分类，所以pageCount清零
    dispatch(changeEnterLoading(true)); //loading，现在实现控制逻辑，效果实现放到下一节，后面的loading同理
    dispatch(getSingerList(val, alpha));
  };

  let handleUpdateAlpha = (val: string): void => {
    setAlpha(val);
    dispatch(changePageCount(0));
    dispatch(changeEnterLoading(true));
    dispatch(getSingerList(category, val));
  };

  const handlePullUp = () => {
    dispatch(changePullUpLoading(true));
    dispatch(changePageCount(pageCount + 1));
    if (category === "") {
      dispatch(refreshMoreHotSingerList());
    } else {
      dispatch(refreshMoreSingerList(category, alpha));
    }
  };

  const handlePullDown = () => {
    dispatch(changePullDownLoading(true));
    dispatch(changePageCount(0)); //属于重新获取数据
    if (category === "" && alpha === "") {
      dispatch(getHotSingerList());
    } else {
      dispatch(getSingerList(category, alpha));
    }
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

export default React.memo(Singers);
