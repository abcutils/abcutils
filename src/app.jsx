import { Routes, Route } from "react-router-dom";
import routers, { systemRouters, Home, NotFound } from "./router";
import Layout from "./layout";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "react-reflex/styles.css";

import "./app.less";

export default function App() {
  return (
    <Routes>
      {/* system pages path = / or /system*/}
      <Route index element={<Home />}></Route>
      {systemRouters.map(({ path, Element }) => {
        return <Route key={path} path={path} element={<Element />} />;
      })}

      {/* util apps path = /apps/* */}
      <Route element={<Layout />}>
        {routers.map(({ path, Element }) => {
          return <Route key={path} path={path} element={<Element />} />;
        })}

        {/* not-found */}
        <Route path="*" element={<NotFound />}></Route>
      </Route>
    </Routes>
  );
}
