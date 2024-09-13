import React from "react";
import { ReflexContainer, ReflexSplitter, ReflexElement } from "react-reflex";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import ReactQRCode from "react-qr-code";
import { styled } from "styled-components";
import { TextareaAutosize, Pager, PasteBtn, AboutApp } from "$src/components";
import readme from "./readme.md?raw";
import { useStorgeState } from "$src/hooks";

import utils from "$src/utils";

const PagerA4 = styled(Pager.A4)`
  .qrcode {
    margin-bottom: 10px;
    display: inline-block;
    padding: 16px;
    background-color: #ffffff;
    border: 1px solid #e7e7e7;
    &:hover {
      cursor: pointer;
      box-shadow: 0px 0px 3px #999999;
    }
    svg {
      display: block;
    }
  }
`;
const EXP = ["https://google.com", "hello", "world"].join("\n");

export default function () {
  const [input, setInput] = useStorgeState(EXP, "app-qrcode-input");
  const [showBarcode, setShowBarcode] = React.useState(false);
  return (
    <ReflexContainer orientation="vertical">
      <ReflexElement flex={3}>
        <AboutApp readme={readme} />
        <div className="input-title">
          <span className="title">输入</span>
          <div className="operation">
            <PasteBtn onPaste={setInput} />
            <Button onClick={() => setInput(EXP)} size="small">
              示例
            </Button>
          </div>
        </div>
        <TextareaAutosize
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ maxWidth: "100%" }}
        />
      </ReflexElement>
      <ReflexSplitter></ReflexSplitter>
      <ReflexElement flex={8}>
        <div className="output-title">
          <span className="title">输出</span>
          <div className="operation">
            <Button size="small" variant="outlined">
              设置
            </Button>
          </div>
        </div>
        <PagerA4>
          {inputToArray(input).map((value, index) => {
            return (
              <CatchQRCode
                value={value}
                title={value}
                key={value + index}
                onClick={() => setShowBarcode(value)}
              />
            );
          })}
        </PagerA4>
      </ReflexElement>
      {!!showBarcode ? (
        <Dialog
          open={true}
          maxWidth="sm"
          onClose={() => setShowBarcode(false)}
          onShow={console.log}
        >
          <DialogContent>
            <CatchQRCode
              value={showBarcode}
              title={showBarcode}
              id="qrcode"
              size={300}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => downloadSVGNode(document.getElementById("qrcode"))}
            >
              下载
            </Button>{" "}
            <Button onClick={() => setShowBarcode(false)}>关闭</Button>
          </DialogActions>
        </Dialog>
      ) : null}
    </ReflexContainer>
  );
}

function CatchQRCode(props) {
  const size = props.size || 150;
  return (
    <div className="qrcode" onClick={props.onClick}>
      <ReactQRCode {...props} size={size} />
    </div>
  );
}

function inputToArray(input) {
  return String(input)
    .split("\n")
    .filter((_) => !!_);
}

function downloadSVGNode(svgNode) {
  const title = svgNode.getElementsByTagName("title")[0].innerHTML;
  utils.downloadSVGNode(svgNode, title, 16);
}
