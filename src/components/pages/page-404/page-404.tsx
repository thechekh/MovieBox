import React from "react";

import "./page-404.css";
import AppHeader from "../../app-header";

const Page404: React.FunctionComponent = () => {
  return (
    <>
      <AppHeader />
      <h2 className="error_page">page not found</h2>
    </>
  );
};

export default Page404;
