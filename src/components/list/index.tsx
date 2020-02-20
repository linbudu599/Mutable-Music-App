import React from "react";
import { ListWrapper, ListItem, List } from "./style";
import { getCount } from "../../api/util";
import LazyLoad from "react-lazyload";
import { withRouter } from "react-router-dom";
export interface IRecommendItem {
  id: number;
  picUrl: string;
  playCount: number;
  name: string;
}

interface IRecommendList {
  recommendList: IRecommendItem[];
  history: any;
}

const RecommendList: React.FC<IRecommendList> = ({
  recommendList,
  history
}) => {
  const enterDetail = (id: number) => {
    history.push(`/recommend/${id}`);
  };
  return (
    <ListWrapper>
      <h1 className="title"> 推荐歌单 </h1>
      <List>
        {recommendList.map((item, index) => {
          return (
            <ListItem key={item.id} onClick={() => enterDetail(item.id)}>
              <div className="img_wrapper">
                {/* 提供遮罩，作为阴影衬托文字 */}
                <div className="decorate"></div>
                {/* 加此参数可以减小请求的图片资源大小 */}
                <LazyLoad
                  placeholder={
                    <img
                      width="100%"
                      height="100%"
                      src={require("./music.png")}
                      alt="music"
                    />
                  }
                >
                  <img
                    src={item.picUrl + "?param=300x300"}
                    width="100%"
                    height="100%"
                    alt="music"
                  />
                </LazyLoad>
                <div className="play_count">
                  <i className="iconfont play">&#xe885;</i>
                  <span className="count">{getCount(item.playCount)}</span>
                </div>
              </div>
              <div className="desc">{item.name}</div>
            </ListItem>
          );
        })}
      </List>
    </ListWrapper>
  );
};

// @ts-ignore
export default React.memo(withRouter(RecommendList));
