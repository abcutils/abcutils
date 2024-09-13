import React, { Suspense } from "react";
import Markdown from "react-markdown";
import { Logo } from "$src/components";
const DEFAULT_APP_PATH = "apps/json";

// 异步加载
const apps = import.meta.glob("./apps/**/index.jsx", { eager: false });
// 异步加载
const systemPages = import.meta.glob("./system/*/index.jsx", { eager: false });

const appsRouters = Object.keys(apps)
  .map((path) => {
    const mathcRet = path.match(/\.\/apps\/(.*)\/index.jsx/);
    if (mathcRet) {
      return {
        path: `apps/${mathcRet[1]}`,
        Element: createLazyApp(apps[path]),
      };
    }
    return null;
  })
  .filter((_) => !!_);

export const systemRouters = Object.keys(systemPages)
  .map((path) => {
    const mathcRet = path.match(/\.\/system\/(.*)\/index.jsx/);
    if (mathcRet) {
      return {
        path: `system/${mathcRet[1]}`,
        Element: createLazyApp(systemPages[path]),
      };
    }
    return null;
  })
  .filter((_) => !!_);

function createLazyApp(load) {
  const App = React.lazy(load);
  return function () {
    return (
      <ErrorBoundary>
        <Suspense
          fallback={
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100%",
                opacity: 0.1,
              }}
            >
              <Logo size="100" />
            </div>
          }
        >
          <App />
        </Suspense>
      </ErrorBoundary>
    );
  };
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 30 }}>
          <Markdown>{errorMarkdocs(this.state.error)}</Markdown>
        </div>
      );
    }
    return this.props.children;
  }
}

function errorMarkdocs(error) {
  return `
### Oops 渲染出现一些错误
* 页面信息
\`\`\`
${location.href}
${__APP_VERSION__}
\`\`\`
* 错误堆栈
\`\`\` ${error?.message}\n${error?.stack} 
\`\`\`

### 尝试修复方法 
* 方式1：刷新页面 
* 方式2：打开浏览器控制台清除本网站缓存 
\`\`\` localStorage.clear() \`\`\`
* 方式3：如果长期有错误，可以反馈给以下邮件
\`\`\` jelle.lu@gmail.com \`\`\`
`;
}

// 默认首页
export const FirstApp = appsRouters.find(
  (item) => item.path === DEFAULT_APP_PATH
).Element;

// 404
export const NotFound = appsRouters.find((item) => {
  return item.path === "apps/not-found";
}).Element;

export const Home = systemRouters.find((item) => {
  return item.path === "system/home";
}).Element;

/**
 * [
 *  {
 *    path:"apps/json",
 *    Element: React.Component
 *  }
 * ]
 * */
export default appsRouters;
