import React, { useState } from "react";
import { Container } from "./style";
import { CSSTransition } from "react-transition-group";
import Header from "./../../baseUI/header";
interface IAlbum {
  history: any;
}

const Album: React.FC<IAlbum> = props => {
  const [showStatus, setShowStatus] = useState(true);

  const handleBack = () => {
    setShowStatus(false);
  };

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      // 当你点击后，执行路由跳转逻辑，这个时候路由变化，
      // 当前的组件会被立即卸载，相关的动画当然也就不复存在了。
      // 最后我的解决方案就是，先让页面切出动画执行一次，然后在动画执行完的瞬间跳转路由，
      onExited={props.history.goBack}
    >
      <Container>
        <Header title={"返回"} handleClick={handleBack}></Header>
        jairu
      </Container>
    </CSSTransition>
  );
};

export default React.memo(Album);
