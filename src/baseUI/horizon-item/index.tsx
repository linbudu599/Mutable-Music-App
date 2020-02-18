import React, { useState, useRef, useEffect, memo, DOMElement } from "react";
import styled from "styled-components";
import Scroll from "../scroll";
import { List, ListItem } from "./style";

interface IHorizon {
  list: any[];
  oldVal?: string;
  title?: string;
  handleClick: (key: string) => void;
}

const Horizen: React.FC<IHorizon> = ({ list, oldVal, title, handleClick }) => {
  const Category = useRef(null);

  useEffect(() => {
    let categoryDOM = (Category.current as unknown) as HTMLElement;
    let tagElems = categoryDOM.querySelectorAll("span");
    let totalWidth = 0;
    Array.from(tagElems).forEach((ele: any) => {
      totalWidth += ele.offsetWidth;
    });
    // 动态生成宽度
    categoryDOM.style.width = `${totalWidth}px`;
  }, [Category]);

  return (
    <>
      <Scroll direction={"horizental"}>
        <div ref={Category}>
          <List>
            <span>{title}</span>
            {list.map(item => {
              return (
                <ListItem
                  key={item.key}
                  className={`${oldVal === item.key ? "selected" : ""}`}
                  onClick={() => handleClick(item.key)}
                >
                  {item.name}
                </ListItem>
              );
            })}
          </List>
        </div>
      </Scroll>
    </>
  );
};

Horizen.defaultProps = {
  list: [],
  oldVal: "",
  title: "",
  handleClick: () => {}
};

export default Horizen;
