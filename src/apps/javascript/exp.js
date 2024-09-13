export default `import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/main.jsx");import * as RefreshRuntime from "/@react-refresh";

if (!window.$RefreshReg$) throw new Error("React refresh preamble was not loaded. Something is wrong.");
const prevRefreshReg = window.$RefreshReg$;
const prevRefreshSig = window.$RefreshSig$;
window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/Users/lujun/codeup/project-silk-pouch/src/main.jsx");
window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;

// import { StrictMode } from 'react'
import __vite__cjsImport1_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=773efbf7"; const _jsxDEV = __vite__cjsImport1_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport2_reactDom_client from "/node_modules/.vite/deps/react-dom_client.js?v=773efbf7"; const createRoot = __vite__cjsImport2_reactDom_client["createRoot"];
import { BrowserRouter, Routes, Route } from "/node_modules/.vite/deps/react-router-dom.js?v=773efbf7";
import routers, { Home } from "/src/router.jsx?t=1724747073193";
import Layout from "/src/layout/index.jsx?t=1724746490807";
import { loader } from "/node_modules/.vite/deps/@monaco-editor_react.js?v=773efbf7";
import "/node_modules/.store/@fontsource+roboto@5.0.14/node_modules/@fontsource/roboto/300.css";
import "/node_modules/.store/@fontsource+roboto@5.0.14/node_modules/@fontsource/roboto/400.css";
import "/node_modules/.store/@fontsource+roboto@5.0.14/node_modules/@fontsource/roboto/500.css";
import "/node_modules/.store/@fontsource+roboto@5.0.14/node_modules/@fontsource/roboto/700.css";
import "/src/main.less";
loader.config({
    paths: {
        vs: "https://g.alicdn.com/code/lib/monaco-editor/0.30.1/min/vs"
    }
});
const basename = location.host.indexOf("176yxgl.com") > -1 ? "/toolbox" : "";
export default function App() {
    return /*#__PURE__*/ _jsxDEV(BrowserRouter, {
        basename: basename,
        children: /*#__PURE__*/ _jsxDEV(Routes, {
            children: /*#__PURE__*/ _jsxDEV(Route, {
                element: /*#__PURE__*/ _jsxDEV(Layout, {}, void 0, false, {
                    fileName: "/Users/lujun/codeup/project-silk-pouch/src/main.jsx",
                    lineNumber: 24,
                    columnNumber: 23
                }, void 0),
                children: [
                    /*#__PURE__*/ _jsxDEV(Route, {
                        index: true,
                        element: /*#__PURE__*/ _jsxDEV(Home, {}, void 0, false, {
                            fileName: "/Users/lujun/codeup/project-silk-pouch/src/main.jsx",
                            lineNumber: 25,
                            columnNumber: 31
                        }, void 0)
                    }, void 0, false, {
                        fileName: "/Users/lujun/codeup/project-silk-pouch/src/main.jsx",
                        lineNumber: 25,
                        columnNumber: 9
                    }, this),
                    routers.map(({ path, Element })=>{
                        return /*#__PURE__*/ _jsxDEV(Route, {
                            path: path,
                            element: /*#__PURE__*/ _jsxDEV(Element, {}, void 0, false, {
                                fileName: "/Users/lujun/codeup/project-silk-pouch/src/main.jsx",
                                lineNumber: 27,
                                columnNumber: 58
                            }, void 0)
                        }, path, false, {
                            fileName: "/Users/lujun/codeup/project-silk-pouch/src/main.jsx",
                            lineNumber: 27,
                            columnNumber: 18
                        }, this);
                    })
                ]
            }, void 0, true, {
                fileName: "/Users/lujun/codeup/project-silk-pouch/src/main.jsx",
                lineNumber: 24,
                columnNumber: 7
            }, this)
        }, void 0, false, {
            fileName: "/Users/lujun/codeup/project-silk-pouch/src/main.jsx",
            lineNumber: 23,
            columnNumber: 5
        }, this)
    }, void 0, false, {
        fileName: "/Users/lujun/codeup/project-silk-pouch/src/main.jsx",
        lineNumber: 22,
        columnNumber: 10
    }, this);
}
_c = App;
// react 18 StrictMode 瀵艰嚧useEffect鎵ц2娆�
createRoot(document.getElementById('root')).render(// <StrictMode>
/*#__PURE__*/ _jsxDEV(App, {}, void 0, false, {
    fileName: "/Users/lujun/codeup/project-silk-pouch/src/main.jsx",
    lineNumber: 38,
    columnNumber: 5
}, this));
var _c;
$RefreshReg$(_c, "App");


window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
  RefreshRuntime.registerExportsForReactRefresh("/Users/lujun/codeup/project-silk-pouch/src/main.jsx", currentExports);
  import.meta.hot.accept((nextExports) => {
    if (!nextExports) return;
    const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate(currentExports, nextExports);
    if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
  });
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanN4Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCB7IFN0cmljdE1vZGUgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IGNyZWF0ZVJvb3QgfSBmcm9tICdyZWFjdC1kb20vY2xpZW50J1xuaW1wb3J0IHsgQnJvd3NlclJvdXRlciwgUm91dGVzLCBSb3V0ZSB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nXG5pbXBvcnQgcm91dGVycywge0hvbWV9IGZyb20gJy4vcm91dGVyJ1xuaW1wb3J0IExheW91dCBmcm9tICcuL2xheW91dCdcblxuXG5pbXBvcnQgeyBsb2FkZXIgfSBmcm9tICdAbW9uYWNvLWVkaXRvci9yZWFjdCc7XG5cbmltcG9ydCAnQGZvbnRzb3VyY2Uvcm9ib3RvLzMwMC5jc3MnO1xuaW1wb3J0ICdAZm9udHNvdXJjZS9yb2JvdG8vNDAwLmNzcyc7XG5pbXBvcnQgJ0Bmb250c291cmNlL3JvYm90by81MDAuY3NzJztcbmltcG9ydCAnQGZvbnRzb3VyY2Uvcm9ib3RvLzcwMC5jc3MnO1xuXG5pbXBvcnQgJy4vbWFpbi5sZXNzJ1xuXG5sb2FkZXIuY29uZmlnKHsgcGF0aHM6IHsgdnM6IFwiaHR0cHM6Ly9nLmFsaWNkbi5jb20vY29kZS9saWIvbW9uYWNvLWVkaXRvci8wLjMwLjEvbWluL3ZzXCIgfSB9KTtcblxuY29uc3QgYmFzZW5hbWUgPSBsb2NhdGlvbi5ob3N0LmluZGV4T2YoXCIxNzZ5eGdsLmNvbVwiKSA+IC0xID8gXCIvdG9vbGJveFwiIDogXCJcIlxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBBcHAoKSB7XG4gIHJldHVybiA8QnJvd3NlclJvdXRlciBiYXNlbmFtZT17YmFzZW5hbWV9ID5cbiAgICA8Um91dGVzPlxuICAgICAgPFJvdXRlIGVsZW1lbnQ9ezxMYXlvdXQgLz59ID5cbiAgICAgICAgPFJvdXRlIGluZGV4IGVsZW1lbnQ9ezxIb21lIC8+fT48L1JvdXRlPlxuICAgICAgICB7cm91dGVycy5tYXAoKHsgcGF0aCwgRWxlbWVudCB9KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIDxSb3V0ZSBrZXk9e3BhdGh9ICBwYXRoPXtwYXRofSBlbGVtZW50PXs8RWxlbWVudCAvPn0gLz5cbiAgICAgICAgfSl9XG4gICAgICA8L1JvdXRlPlxuICAgIDwvUm91dGVzPlxuICA8L0Jyb3dzZXJSb3V0ZXI+XG59XG5cblxuLy8gcmVhY3QgMTggU3RyaWN0TW9kZSDlr7zoh7R1c2VFZmZlY3TmiafooYwy5qyhXG5jcmVhdGVSb290KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290JykpLnJlbmRlcihcbiAgLy8gPFN0cmljdE1vZGU+XG4gICAgPEFwcCAvPlxuICAvLyA8L1N0cmljdE1vZGU+LFxuKVxuIl0sIm5hbWVzIjpbImNyZWF0ZVJvb3QiLCJCcm93c2VyUm91dGVyIiwiUm91dGVzIiwiUm91dGUiLCJyb3V0ZXJzIiwiSG9tZSIsIkxheW91dCIsImxvYWRlciIsImNvbmZpZyIsInBhdGhzIiwidnMiLCJiYXNlbmFtZSIsImxvY2F0aW9uIiwiaG9zdCIsImluZGV4T2YiLCJBcHAiLCJlbGVtZW50IiwiaW5kZXgiLCJtYXAiLCJwYXRoIiwiRWxlbWVudCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJyZW5kZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEscUNBQXFDOztBQUNyQyxTQUFTQSxVQUFVLFFBQVEsbUJBQWtCO0FBQzdDLFNBQVNDLGFBQWEsRUFBRUMsTUFBTSxFQUFFQyxLQUFLLFFBQVEsbUJBQWtCO0FBQy9ELE9BQU9DLFdBQVVDLElBQUksUUFBTyxXQUFVO0FBQ3RDLE9BQU9DLFlBQVksV0FBVTtBQUc3QixTQUFTQyxNQUFNLFFBQVEsdUJBQXVCO0FBRTlDLE9BQU8sNkJBQTZCO0FBQ3BDLE9BQU8sNkJBQTZCO0FBQ3BDLE9BQU8sNkJBQTZCO0FBQ3BDLE9BQU8sNkJBQTZCO0FBRXBDLE9BQU8sY0FBYTtBQUVwQkEsT0FBT0MsTUFBTSxDQUFDO0lBQUVDLE9BQU87UUFBRUMsSUFBSTtJQUE0RDtBQUFFO0FBRTNGLE1BQU1DLFdBQVdDLFNBQVNDLElBQUksQ0FBQ0MsT0FBTyxDQUFDLGlCQUFpQixDQUFDLElBQUksYUFBYTtBQUUxRSxlQUFlLFNBQVNDO0lBQ3RCLHFCQUFPLFFBQUNkO1FBQWNVLFVBQVVBO2tCQUM5QixjQUFBLFFBQUNUO3NCQUNDLGNBQUEsUUFBQ0M7Z0JBQU1hLHVCQUFTLFFBQUNWOzs7Ozs7a0NBQ2YsUUFBQ0g7d0JBQU1jLEtBQUs7d0JBQUNELHVCQUFTLFFBQUNYOzs7Ozs7Ozs7O29CQUN0QkQsUUFBUWMsR0FBRyxDQUFDLENBQUMsRUFBRUMsSUFBSSxFQUFFQyxPQUFPLEVBQUU7d0JBQzdCLHFCQUFPLFFBQUNqQjs0QkFBa0JnQixNQUFNQTs0QkFBTUgsdUJBQVMsUUFBQ0k7Ozs7OzJCQUE3QkQ7Ozs7O29CQUNyQjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJUjtLQVh3Qko7QUFjeEIsc0NBQXNDO0FBQ3RDZixXQUFXcUIsU0FBU0MsY0FBYyxDQUFDLFNBQVNDLE1BQU0sQ0FDaEQsZUFBZTtjQUNiLFFBQUNSIn0=`