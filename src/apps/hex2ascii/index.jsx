import React from "react";
import { ReflexContainer, ReflexSplitter, ReflexElement } from "react-reflex";
import Button from "@mui/material/Button";
import { TextareaAutosize, PasteBtn, CopyBtn } from "$src/components";
import { useStorgeState } from "$src/hooks";

const EXP = "61 62 63 75 74 69 6c 73 2e 63 6f 6d";
const INPUT_STORGE_KEY = "app-hex2ascll-input";

export default function () {
  const [input, setInput] = useStorgeState(EXP, INPUT_STORGE_KEY);

  return (
    <ReflexContainer orientation="vertical">
      <ReflexElement flex={3}>
        <div className="input-title">
          <span className="title">输入</span>
          <div className="operation">
            <div>
              <PasteBtn onPaste={setInput} sx={{ marginRight: 1 }} />
            </div>
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
        <div></div>
      </ReflexElement>
      <ReflexSplitter></ReflexSplitter>
      <ReflexElement flex={8}>
        <div className="output-title">
          <span className="title">输出</span>
          <div className="operation">
            <CopyBtn onCopy={() => hex2ascii(input)} />
          </div>
        </div>
        <div>
          <TextareaAutosize value={hex2ascii(input)}></TextareaAutosize>
          <br />
          <br />
          <br />
        </div>
      </ReflexElement>
    </ReflexContainer>
  );
}

function hex2ascii(hex) {
  hex = hexRepalceSplitStr(hex);
  let str = "";
  for (let i = 0; i < hex.length; i += 2) {
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  }
  return str;
}

function hexRepalceSplitStr(hexStr) {
  const splitStr = [
    /\s/gi,
    /0x/gi,
    /0X/gi,
    /\\0x/gi,
    /\\0X/gi,
    /\\x/gi,
    /\\X/gi,
  ];
  for (let i = 0; i < splitStr.length; i++) {
    hexStr = hexStr.replace(splitStr[i], "");
  }
  return hexStr;
}

export { default as config } from "./config.json";
