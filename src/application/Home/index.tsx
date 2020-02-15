import React from "react";
import { renderRoutes } from "react-router-config";

const Home: React.FC = ({ route }: any) => {
  return (
    <>
      <div>Home</div>
      {renderRoutes(route.routes)}
    </>
  );
};

export default React.memo(Home);
