import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterIndex, filterIdx } from "../../api/util";
import { getRankList } from "./store";
import Scroll from "../../baseUI/scroll";
import Loading from "../../baseUI/loading";
import { EnterLoading } from "./../Singers/style";
import { List, ListItem, SongList, Container } from "./style";
import { renderRoutes } from "react-router-config";

interface IRank {
  route: any;
}

const Rank: React.FC<IRank> = props => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRankList());
    return () => {};
    // eslint-disable-next-line
  }, []);
  const data = useSelector((state: any) => ({
    rankList: state.getIn(["rank", "rankList"]),
    loading: state.getIn(["rank", "loading"])
  }));

  const { rankList, loading } = data;
  let list = rankList ? rankList.toJS() : [];

  let globalStartIndex = filterIndex(list);
  console.log(list);
  let officialList = list.slice(0, globalStartIndex);
  let globalList = list.slice(globalStartIndex);

  const renderRankList = (list: any[], global: boolean) => {
    return (
      <List globalRank={global}>
        {list.map((item: any) => {
          return (
            <ListItem
              key={`${Math.random()}-${item.coverImgId}`}
              tracks={item.tracks}
              onClick={() => enterDetail(item.name)}
            >
              <div className="img_wrapper">
                <img src={item.coverImgUrl} alt="" />
                <div className="decorate"></div>
                <span className="update_frequecy">{item.updateFrequency}</span>
              </div>
              {renderSongList(item.tracks)}
            </ListItem>
          );
        })}
      </List>
    );
  };

  const renderSongList = (list: any) => {
    return list.length ? (
      <SongList>
        {list.map((item: any, index: number) => {
          return (
            <li key={index}>
              {index + 1}. {item.first} - {item.second}
            </li>
          );
        })}
      </SongList>
    ) : null;
  };

  const enterDetail = (name: string) => {
    const idx = filterIdx(name);
    if (idx === null) {
      alert("暂无相关数据");
      return;
    }
  };

  let displayStyle = loading ? { display: "none" } : { display: "" };

  return (
    <Container>
      <Scroll>
        <div>
          <h1 className="offical" style={displayStyle}>
            {" "}
            官方榜{" "}
          </h1>
          {renderRankList(officialList, false)}
          <h1 className="global" style={displayStyle}>
            {" "}
            全球榜{" "}
          </h1>
          {renderRankList(globalList, true)}
          {loading ? (
            <EnterLoading>
              <Loading></Loading>
            </EnterLoading>
          ) : null}
        </div>
      </Scroll>
      {renderRoutes(props.route.routes)}
    </Container>
  );
};

export default React.memo(Rank);
