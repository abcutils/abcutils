import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Done from "@mui/icons-material/Done";
import OfflineBoltIcon from "@mui/icons-material/OfflineBolt";
import { styled } from "styled-components";
import sp from "./sp.png";
import offlinepng from "./offline.png";
import { Tooltip } from "@mui/material";

export default function () {
  return (
    <main>
      <FirstScreen />
      <OFFLine />
      <ALLUTILS />
      <APIDOC />
      <UtilsList />
      <QAList />
      <Changelog />
    </main>
  );
}

const Section = styled.section`
  position: relative;
  display: flex;
  padding: 50px 10%;
  @media (max-width: 700px) {
    flex-direction: column;
    .desc,
    .demo {
      width: auto !important;
    }
  }
  h1 {
    color: #000000;
  }

  .anchor-point{
    position: absolute;
    top:-60px;
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
    img,
    video,iframe {
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
        <h1>开源、免费、跨端、集成AI能力、日常工具集</h1>
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
            <span>20+ 精心打造的的工具集产品，持续更新，完全免费</span>
          </p>
          <p>
            <Done
              fontSize="medium"
              sx={{ color: "#00c597", verticalAlign: "middle", marginRight: 1 }}
            />
            <span>
              使用 PWA 技术保障网站离线可用
              <Tooltip title="离线可用" arrow>
                <OfflineBoltIcon
                  sx={{ color: "#646cff", verticalAlign: "middle" }}
                />
              </Tooltip>
            </span>
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
          variant="outlined"
          component={Link}
          to="/apps/json"
          sx={{ marginBottom: 1 }}
        >
          免费在线使用
        </Button>
        <br />
        <Button
          size="large"
          variant="outlined"
          component={"a"}
          href="https://auto-rok-game.oss-cn-hangzhou.aliyuncs.com/abc-utils/ABC%20Utils-darwin-arm64-1.0.0.zip"
          target="_blank"
          sx={{ marginBottom: 1 }}
        >
          下载 Mac OS App(darwin-arm64)
        </Button>

        <br />
        <Button
          disabled
          size="large"
          variant="outlined"
          component={"a"}
          href=""
          target="_blank"
          title="制作中..."
        >
          下载 Windows App(x64)
        </Button>
      </div>
      <div className="demo">
        <video autoPlay loop playsInline muted poster={sp} width="100%">
          <source
            src="https://www.abcutils.com/_video/json-fix.mp4"
            type="video/mp4"
          ></source>
        </video>
      </div>
    </Section>
  );
}

function OFFLine() {
  return (
    <Section>
      <div className="demo">
        <video autoPlay loop playsInline muted poster={offlinepng} width="100%">
          <source
            src="https://www.abcutils.com/_video/offline.mp4"
            type="video/mp4"
          ></source>
        </video>
      </div>
      <div className="desc in-right">
        <h1>离线可用</h1>
        <div>
          <p>
            <span>
              仅需一次在线访问, PWA 技术保障工具离线可用{" "}
              <Tooltip title="离线可用" arrow>
                <OfflineBoltIcon
                  sx={{ color: "#646cff", verticalAlign: "middle" }}
                />
              </Tooltip>
            </span>
          </p>
          <p>
            <span>工具完全离线，保障你的数据安全</span>
          </p>
        </div>
      </div>
    </Section>
  );
}


function APIDOC(){
  return <Section>
      <div className="demo">
        <iframe 
          frameBorder="0" 
          width="100%"
          height="500"
          src="https://abcutils.com/apps/qrcode?mode=import&input=mode=import&input=hello abcutils" 
        />
      </div>
      <div className="desc in-right">
        <a id="api" className="anchor-point"></a>
        <h1>API</h1>
        <div>
          <p>
            仅需要一行代码，在你的站点使用 abc utils。
          </p>
          <code>{`<!-- html -->
<iframe 
  frameborder="0" 
  width="100%"
  height="500"
  src="https://abcutils.com/apps/qrcode?mode=import&input=hello abcutils" 
/>
`} 
          </code>
        </div>
        <div>
          <p>
            参数说明
          </p>
          <code>
{`* https://abcutils.com/\${appPath}?mode=import&\${otherParams}
* mode=import 固定当前为引入模式，工具会做一些适配 UI 适配
* input=xxxxx 部分工具支持通过 URL 传入默认输出数据
`}</code>
        </div>
      </div>
  </Section>
}

function ALLUTILS() {
  return (
    <Section>
      <div className="desc in-right">
        <h1>持续更新，已支持 20+</h1>
        <div>
          <p>
            <span>包括不限于 格式化、类型转换、内容生成</span>
          </p>
          <p>
            <span>多端覆盖，在线Web，离线访问，桌面App</span>
          </p>
        </div>
      </div>
      <div className="demo">
        <video autoPlay loop playsInline  muted poster={sp} width="100%">
          <source
            src="https://www.abcutils.com/_video/all-utils.mp4"
            type="video/mp4"
          ></source>
        </video>
      </div>
    </Section>
  );
}

function UtilsList() {
  return (
    <Section className="utils-all">
      <a id="utils" className="anchor-point" ></a>
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
            <Link to="/apps/sha256">HASH 算法</Link>
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
      <a id="faqs" className="anchor-point"></a>
      <h1>FAQs</h1>
      <h2>abcutils 收费吗？</h2>
      <p>工具集完全免费，避免 AI 能力被滥用，可能会有人机校验</p>
    </Section>
  );
}

function Changelog() {
  return (
    <Section className="log-module">
      <a id="changelog" className="anchor-point" ></a>
      <h1>更新日志</h1>
      <h2>2024年9月</h2>
      <div>
        <ul>
          <li>
            <a href="https://github.com/abcutils/abcutils" target="_blank">
              代码开源
            </a>
          </li>
          <li>搜索引擎优化：支持每个工具撰写readme.md, 并SSG构建静态站点</li>
          <li>
            <Tooltip title="离线可用" arrow>
              <OfflineBoltIcon
                sx={{ color: "#646cff", verticalAlign: "middle" }}
              />
            </Tooltip>
            <span>支持 PWA 离线访问。</span>
          </li>
        </ul>
      </div>
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
