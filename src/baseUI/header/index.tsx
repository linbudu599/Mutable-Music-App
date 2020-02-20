import React from "react";
import { HeaderContainer } from "./style";

interface IHeader {
  handleClick: () => void;
  title: string;
}

// 处理函数组件拿不到 ref 的问题，所以用 forwardRef
const Header: React.FC<IHeader> = React.forwardRef((props, ref) => {
  const { handleClick = () => {}, title = "标题" } = props;
  return (
    <HeaderContainer ref={ref}>
      <i className="iconfont back" onClick={handleClick}>
        &#xe655;
      </i>
      <h1>{title}</h1>
    </HeaderContainer>
  );
});

export default React.memo(Header);
