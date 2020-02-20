import styled from "styled-components";
import style from "../../assets/global-style";

// 设定 transfrom 的固定点，接下来的动画都是绕这个点旋转或平移
// 设置 rotateZ 的值，让整个页面能够拥有 Z 坐标方向的矢量

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background: ${style["background-color"]};
  transform-origin: right bottom;
  &.fly-enter,
  &.fly-appear {
    transform: rotateZ (30deg) translate3d (100%, 0, 0);
  }
  &.fly-enter-active,
  &.fly-appear-active {
    transition: transform 0.3s;
    transform: rotateZ (0deg) translate3d (0, 0, 0);
  }
  &.fly-exit {
    transform: rotateZ (0deg) translate3d (0, 0, 0);
  }
  &.fly-exit-active {
    transition: transform 0.3s;
    transform: rotateZ (30deg) translate3d (100%, 0, 0);
  }
`;
