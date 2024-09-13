import { Routes, Route } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import ReactMarkdown from "react-markdown";
import Layout from "./layout";
import { Logo } from "$src/components";
// 异步加载
const systemPages = import.meta.glob("./system/*/index.jsx", { eager: true });
const readmes = import.meta.glob("./apps/*/readme.md", {
  eager: true,
  query: "?raw",
});

export const systemRouters = Object.keys(systemPages)
  .map((path) => {
    const mathcRet = path.match(/\.\/system\/(.*)\/index.jsx/);
    if (mathcRet) {
      return {
        path: `system/${mathcRet[1]}`,
        Element: systemPages[path].default,
      };
    }
    return null;
  })
  .filter((_) => !!_);

const Home = systemRouters.find((item) => {
  return item.path === "system/home";
}).Element;

export const readmeRouters = Object.keys(readmes)
  .map((path) => {
    const mathcRet = path.match(/\.\/apps\/(.*)\/readme.md/);
    if (mathcRet) {
      return {
        path: `/apps/${mathcRet[1]}`,
        readme: readmes[path].default,
      };
    }
    return null;
  })
  .filter((_) => !!_);

// console.log("readmeRouters", readmeRouters);
export default function ({ url }) {
  return (
    <StaticRouter location={url}>
      <Routes>
        <Route index element={<Home />}></Route>
        {systemRouters.map(({ path, Element }) => {
          return <Route key={path} path={path} element={<Element />} />;
        })}
        {/* util apps path = /apps/* */}
        <Route element={<Layout />}>
          {readmeRouters.map(({ path, readme }) => {
            return (
              <Route
                key="path"
                path={path}
                element={<ReadMeRender readme={readme} />}
              ></Route>
            );
          })}
        </Route>
      </Routes>
    </StaticRouter>
  );
}

function ReadMeRender({ readme }) {
  return (
    <div>
      <Logo />
      <ReactMarkdown>{readme}</ReactMarkdown>
    </div>
  );
}
