import React, { useState } from "react";
import { Container } from "./style";
import { CSSTransition } from "react-transition-group";

interface IAlbum {
  history: any;
}

const Album: React.FC<IAlbum> = props => {
  const [showStatus, setShowStatus] = useState(true);

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={props.history.goBack}
    >
      <Container>12</Container>
    </CSSTransition>
  );
};

export default React.memo(Album);
