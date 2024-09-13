import React from "react";
import { ReflexContainer, ReflexSplitter, ReflexElement } from "react-reflex";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import readme from "./readme.md?raw";
import { TextareaAutosize, PasteBtn, CopyBtn, AboutApp } from "$src/components";
import { useStorgeState } from "$src/hooks";

const EXP = "abcutils.com";
const INPUT_STORGE_KEY = "app-ascll2hex-input";
const OUTPUT_STORGE_KEY = "app-ascll2hex-output";

const OUTPUT_TYPES = [
  {
    label: "空格",
    value: " ",
  },
  {
    label: "0x",
    value: "0x",
  },
  {
    label: "0X",
    value: "0x",
  },
  {
    label: "\\0x",
    value: "\\0x",
  },
  {
    label: "\\0X",
    value: "\\0X",
  },
  {
    label: "\\x",
    value: "\\x",
  },
  {
    label: "\\X",
    value: "\\X",
  },
];

export default function () {
  const [input, setInput] = useStorgeState(EXP, INPUT_STORGE_KEY);
  const [indentType, setIndentType] = useStorgeState(
    OUTPUT_TYPES[0].value,
    OUTPUT_STORGE_KEY
  );

  return (
    <ReflexContainer orientation="vertical">
      <ReflexElement flex={3}>
        <AboutApp readme={readme} />
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
      </ReflexElement>
      <ReflexSplitter></ReflexSplitter>
      <ReflexElement flex={8}>
        <div className="output-title">
          <span className="title">输出</span>
          <div className="operation">
            <CopyBtn onCopy={() => ascii2hex(input, indentType)} />
            <Select
              value={indentType}
              onChange={(e) => setIndentType(e.target.value)}
              size="small"
              sx={{ fontSize: 12, height: 31 }}
            >
              {OUTPUT_TYPES.map(({ label, value }) => {
                return (
                  <MenuItem value={value} key={value} sx={{ fontSize: 12 }}>
                    {label}
                  </MenuItem>
                );
              })}
            </Select>
          </div>
        </div>
        <div>
          <TextareaAutosize
            value={ascii2hex(input, indentType)}
          ></TextareaAutosize>
          <br />
          <br />
          <br />
        </div>
      </ReflexElement>
    </ReflexContainer>
  );
}

function ascii2hex(str, splitStr = " ") {
  const hex = [,];
  for (let i = 0; i < str.length; i++) {
    hex.push(str.charCodeAt(i).toString(16));
  }
  return hex.join(splitStr).trim();
}
