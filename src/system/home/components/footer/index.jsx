import { Link } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import { styled } from "styled-components";
import { PWA, Logo } from "$src/components";
import { Tooltip } from "@mui/material";

const Footer = styled.div`
  background: white;
  padding: 50px 0;
  background-position: top;
  display: flex;
  justify-content: space-evenly;
  .other-links {
    line-height: 2em;
    a {
      color: inherit;
      text-decoration: underline;
      &:hover {
        text-decoration: none;
      }
    }
    dt {
      font-weight: 700;
      margin-bottom: 10px;
      font-size: 16px;
    }
    dd {
      margin-left: 0;
      font-size: 14px;
    }
  }
`;

export default function () {
  return (
    <Footer>
      <dl className="other-links">
        <dt>ABCUtils</dt>
        <dd>
          <Link to="/demo">Demo</Link>
        </dd>
        <dd>
          <Link to="/faqs">FAQs</Link>
        </dd>
        <dd>
          <Link to="/changelog">Changelog</Link>
        </dd>
        <dd>
          <Link to="/apps/json">在线使用</Link>
        </dd>
      </dl>

      <dl className="other-links">
        <dt>开源社区</dt>
        <dd>
          <Link to="https://mui.com/" target="_blank">
            MUI
          </Link>
        </dd>
        <dd>
          <Link to="https://axios-http.com" target="_blank">
            axios
          </Link>
        </dd>
        <dd>
          <Link to="https://github.com/brix/crypto-js" target="_blank">
            crypto-js
          </Link>
        </dd>
        <dd>
          <Link to="https://microsoft.github.io/monaco-editor" target="_blank">
            monaco-editor
          </Link>
        </dd>
        <dd>
          <Link to="https://ahooks.js.org/zh-CN" target="_blank">
            ahooks
          </Link>
        </dd>
        <dd>
          <Link to="https://www.npmjs.com/package/clipboardy" target="_blank">
            clipboardy
          </Link>
        </dd>
        <dd>
          <Link to="https://www.npmjs.com/package/cropperjs" target="_blank">
            cropperjs
          </Link>
        </dd>

        <dd>
          <Link
            to="https://www.npmjs.com/package/sql-formatter"
            target="_blank"
          >
            sql-formatter
          </Link>
        </dd>
        <dd>
          <Link
            to="https://www.npmjs.com/package/xml-formatter"
            target="_blank"
          >
            xml-formatter
          </Link>
        </dd>
        <dd>
          <Link to="https://www.npmjs.com/package/uuid" target="_blank">
            uuid
          </Link>
        </dd>
        <dd>
          <Link to="https://www.npmjs.com/package/jsonrepair" target="_blank">
            jsonrepair
          </Link>
        </dd>
        <dd>
          <Link to="https://dayjs.fenxianglu.cn" target="_blank">
            dayjs
          </Link>
        </dd>
        <dd>
          <Link to="https://cn.vitejs.dev" target="_blank">
            Vite
          </Link>
        </dd>
        <dd>
          <Link to="https://www.npmjs.com/package/less" target="_blank">
            less
          </Link>
        </dd>
      </dl>

      <dl className="other-links">
        <dt>关于</dt>
        <dd>
          <Tooltip title="Github" arrow>
            <Link to="https://github.com/abcutils/abcutils" target="_blank">
              <GitHubIcon />
            </Link>
          </Tooltip>
        </dd>
        <dd>
          <a to="https://github.com/abcutils/abcutils/issues" target="_blank">
            反馈 issues
          </a>
        </dd>
        <dd>
          <Link to="https://beian.miit.gov.cn" target="_blank">
            蜀ICP备2024083295号-2
          </Link>
        </dd>
        <dd>
          <PWA />
        </dd>
      </dl>
    </Footer>
  );
}
