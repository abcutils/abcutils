import React from "react";
import { useLocation } from "react-router-dom";
export default function () {
  const location = useLocation();
  return (
    <div style={{ paddingLeft: "30%" }}>
      <h1>404</h1>
      <p>Not Found</p>
      <p>地址 "{location.pathname}" 找不到对应的工具</p>
      <p>
        <a href="/">回到首页</a>
      </p>
    </div>
  );
}
