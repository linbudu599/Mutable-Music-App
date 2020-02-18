import React, { useState } from "react";
import Horizen from "../../baseUI/horizon-item";
import { categoryTypes, alphaTypes } from "../../api/config";
import { NavContainer } from "./style";

const Singers: React.FC = () => {
  let [category, setCategory] = useState<string>("");
  let [alpha, setAlpha] = useState<string>("");

  let handleUpdateAlpha = (val: string): void => {
    setAlpha(val);
  };

  let handleUpdateCatetory = (val: string): void => {
    setCategory(val);
  };
  return (
    <NavContainer>
      <Horizen
        list={categoryTypes}
        title={"分类 (默认热门):"}
        handleClick={val => handleUpdateCatetory(val)}
        oldVal={category}
      ></Horizen>
      <Horizen
        list={alphaTypes}
        title={"首字母:"}
        handleClick={val => handleUpdateAlpha(val)}
        oldVal={alpha}
      ></Horizen>
    </NavContainer>
  );
};

export default React.memo(Singers);
