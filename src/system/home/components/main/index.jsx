import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Done from "@mui/icons-material/Done";
import { styled } from "styled-components";
import sp from "./sp.png";

export default function () {
  return (
    <main>
      <FirstScreen />
      <AIFixJSON />
      <UtilsList />
      <QAList />
      <Changelog />
    </main>
  );
}

const Section = styled.section`
  display: flex;
  padding: 50px 10%;
  h1 {
    color: #000000;
  }

  .desc {
    width: 40%;
    box-sizing: border-box;
    &.in-right {
      padding-left: 50px;
    }
  }

  .demo {
    width: 60%;
    img {
      box-shadow: 0px 0px 36px 13px #0000002e;
    }
  }

  &&.utils-all {
    display: block;
    text-align: center;
    padding: 50px 0;
    h1 {
      font-size: 36px;
      margin-bottom: 60px;
    }

    .utils-links {
      display: flex;
      justify-content: center;
      text-align: center;
      line-height: 2em;
      dl {
        margin: 0 5%;
      }

      dt {
        font-weight: 700;
      }

      dd {
        a {
          display: inline-block;
          margin-left: 0;
          font-size: 14px;
          background-color: #dbeaff;
          margin: 10px 0;
          padding: 0px 1em;
          border-radius: 6px;
          &:hover {
            background-color: #b7cff1;
          }
        }
      }
    }
  }

  &&.log-module {
    display: block;
    padding: 50px 30%;
    h2 {
      font-size: 1.2em;
    }
  }
`;

function FirstScreen() {
  return (
    <Section>
      <div className="desc">
        <h1>免费、跨端、集成AI能力、高效日常工具集</h1>
        <div>
          <p>
            <Done
              fontSize="medium"
              sx={{
                color: "#00c597",
                verticalAlign: "middle",
                marginRight: 1,
              }}
            />
            <span>20+ 精心打造的的工具集产品, 持续更新，完全免费</span>
          </p>
          <p>
            <Done
              fontSize="medium"
              sx={{ color: "#00c597", verticalAlign: "middle", marginRight: 1 }}
            />
            <span>使用PWA技术离线保障离线可用</span>
          </p>
          <p>
            <Done
              fontSize="medium"
              sx={{ color: "#00c597", verticalAlign: "middle", marginRight: 1 }}
            />
            <span>满足你的所有使用场景，浏览器访问 / Mac App / Window App</span>
          </p>
          <p>
            <Done
              fontSize="medium"
              sx={{ color: "#00c597", verticalAlign: "middle", marginRight: 1 }}
            />
            <span>不收集客户数据，保障你的隐私安全</span>
          </p>
        </div>
        <Button
          size="large"
          variant="contained"
          component={Link}
          to="/apps/json"
          sx={{ width: "60%" }}
        >
          免费在线使用
        </Button>
      </div>
      <div className="demo">
        <img src={sp} width="100%" />
      </div>
    </Section>
  );
}

function AIFixJSON() {
  return (
    <Section>
      <div className="demo">
        <img src={sp} width="100%" />
      </div>
      <div className="desc in-right">
        <h1>集成 AI 能力</h1>
        <div>
          <p>
            <span>JSON/XML/HTML 格式错误, AI一键修复</span>
          </p>
          <p>
            <span>AI 翻译，一次输入，多语言输出</span>
          </p>
          <p>
            <span>每日免费额度的AI对话</span>
          </p>
          <p>
            <span>更多 AI 能力助你快速提高工作效率</span>
          </p>
        </div>
      </div>
    </Section>
  );
}

function UtilsList() {
  return (
    <Section className="utils-all">
      <a id="utils"></a>
      <h1>工具集预览 20+</h1>

      <div className="utils-links">
        <dl>
          <dt>格式化/压缩</dt>
          <dd>
            <Link to="/apps/json">JSON 格式化/压缩</Link>
          </dd>
          <dd>
            <Link to="/apps/xml">XML 格式化/压缩</Link>
          </dd>
          <dd>
            <Link to="/apps/html">HTML 格式化/压缩</Link>
          </dd>
          <dd>
            <Link to="/apps/css">CSS 格式化/压缩</Link>
          </dd>
          <dd>
            <Link to="/apps/sql">SQL 格式化/压缩</Link>
          </dd>
          <dd>
            <Link to="/apps/image-crop">图片裁剪</Link>
          </dd>
          <dd>
            <Link to="/apps/image-compress">图片在线压缩</Link>
          </dd>
        </dl>

        <dl>
          <dt>类型转换</dt>
          <dd>
            <Link to="/apps/json-to-xml">JSON 转 XML</Link>
          </dd>
          <dd>
            <Link to="/apps/ascii2hex">ASCII 转 Hex</Link>
          </dd>
          <dd>
            <Link to="/apps/hex2ascii">Hex 转 ASCII</Link>
          </dd>
        </dl>

        <dl>
          <dt>内容生成</dt>
          <dd>
            <Link to="/apps/barcode">Barcode 生成</Link>
          </dd>
          <dd>
            <Link to="/apps/qrcode">QRCode 生成</Link>
          </dd>
          <dd>
            <Link to="/apps/md5">MD5 生成</Link>
          </dd>
          <dd>
            <Link to="/apps/md5-files">本地文件MD5计算</Link>
          </dd>
          <dd>
            <Link to="/apps/base64">Base64 编码/解码</Link>
          </dd>
          <dd>
            <Link to="/apps/base64-files">图片Base64 编码解码</Link>
          </dd>
          <dd>
            <Link to="/apps/sha256">HAS 算法</Link>
          </dd>
          <dd>
            <Link to="/apps/sha256">UUID 生成</Link>
          </dd>
        </dl>
      </div>
    </Section>
  );
}

function QAList() {
  return (
    <Section className="log-module">
      <a id="faqs">
        <h1>FAQs</h1>
      </a>
      <h2>abcutils 收费吗？</h2>
      <p>工具集完全免费，部分AI能力避免滥用，可能会要求注册登录</p>
    </Section>
  );
}

function Changelog() {
  return (
    <Section className="log-module">
      <a id="changelog">
        <h1>更新日志</h1>
      </a>

      <h2>2024年8月</h2>
      <div>
        <ul>
          <li>网站首页上线</li>
          <li>JSON AI 修复能力接入</li>
          <li>新增图片裁剪/压缩工具</li>
        </ul>
      </div>
      <h2>2024年7月</h2>
      <div>
        <ul>
          <li>首个版本发布，包含10+工具</li>
        </ul>
      </div>
    </Section>
  );
}
