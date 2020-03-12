import React from "react";
import "../style/Page.css";

function Page({ children }) {
  return <section className="page">{children}</section>;
}

export default Page;
