import React from "react";
import { ReflexContainer, ReflexSplitter, ReflexElement } from "react-reflex";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ReactBarcode from "react-barcode";
import { styled } from "styled-components";
import { TextareaAutosize, Pager, PasteBtn } from "$src/components";
import { useStorgeState } from "$src/hooks";

import utils from "$src/utils";

const EXP = "hello\nworld";

const BARCODE_TYPES =
  "CODE39,CODE128,CODE128A,CODE128B,CODE128C,EAN13,EAN8,EAN5,EAN2,UPC,ITF14,ITF,MSI,MSI10,MSI11,MSI1010,MSI1110,pharmacode,codabar".split(
    ","
  );

const PagerA4 = styled(Pager.A4)`
  .barcode {
    margin-bottom: 10px;
    &:hover {
      cursor: pointer;
      box-shadow: 0px 0px 3px #999999;
    }
  }
`;

export default function () {
  const [input, setInput] = useStorgeState(EXP, "app-barcode-input");
  const [indentType, setIndentType] = useStorgeState(
    BARCODE_TYPES[0],
    "app-barcode-indentType"
  );
  const [showBarcode, setShowBarcode] = React.useState(false);
  return (
    <ReflexContainer orientation="vertical">
      <ReflexElement flex={3}>
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
          placeholder="- 每行输入一个"
        />
      </ReflexElement>
      <ReflexSplitter></ReflexSplitter>
      <ReflexElement flex={8}>
        <div className="output-title">
          <span className="title">输出</span>
          <div className="operation">
            <Select
              label="编码方式"
              value={indentType}
              onChange={(e) => setIndentType(e.target.value)}
              sx={{ fontSize: 12, height: 31 }}
            >
              {BARCODE_TYPES.map((value) => {
                return (
                  <MenuItem value={value} key={value} sx={{ fontSize: 12 }}>
                    {value}
                  </MenuItem>
                );
              })}
            </Select>
          </div>
        </div>
        <PagerA4 className="barcode-paper">
          {inputToArray(input).map((value, index) => {
            return (
              <CatchBarcode
                value={value}
                format={indentType}
                key={value + index}
                onClick={() => setShowBarcode(value)}
              />
            );
          })}
        </PagerA4>
      </ReflexElement>
      {!!showBarcode ? (
        <Dialog open={true} maxWidth="sm" onClose={() => setShowBarcode(false)}>
          <DialogContent>
            <CatchBarcode value={showBarcode} format={indentType} />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() =>
                downloadBarcode(document.getElementById("barcode"))
              }
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

function CatchBarcode(props) {
  const [error, setError] = React.useState(true);
  React.useEffect(() => {
    setError(true);
  }, [props.value, props.format]);
  if (error === false) {
    return (
      <div>
        "{props.value}" 不支持编码 {props.format}{" "}
      </div>
    );
  }
  return (
    <div className="barcode" onClick={props.onClick}>
      <ReactBarcode valid={setError} {...props} id="barcode" />
    </div>
  );
}

function inputToArray(input) {
  return String(input)
    .split("\n")
    .filter((_) => !!_);
}

function downloadBarcode(svgNode) {
  const title = svgNode.getElementsByTagName("text")[0].innerHTML;
  utils.downloadSVGNode(svgNode, title, 0);
}
