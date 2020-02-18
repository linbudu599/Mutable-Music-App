import React, { useState, useRef, useEffect, memo } from "react";
import styled from "styled-components";
import Scroll from "../scroll";
import { List, ListItem } from "./style";

interface IHorizon {
  list: any[];
  oldVal: string;
  title: string;
  handleClick: (key: number) => void;
}

type IH = Partial<IHorizon>;

const Horizen: React.FC<IHorizon> = ({ list, oldVal, title, handleClick }) => {
  return (
    <>
      <Scroll direction={"horizental"}>
        <div>
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
