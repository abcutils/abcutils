import React from "react";
import { ReflexContainer, ReflexSplitter, ReflexElement } from "react-reflex";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { toXML } from "./jstoxml";
import { jsonrepair } from "jsonrepair";
import Editor from "@monaco-editor/react";
import readme from "./readme.md?raw";
import { CopyBtn, PasteBtn, LoadingButton, AboutApp } from "$src/components";
import { useStorgeState } from "$src/hooks";

const EXP = JSON.stringify({
  name: "ABC utils",
  site: "https://abcutils.com",
  birthday: "2024年7月",
  feedback: "jelle.lu@gmail.com",
});
const JSON_OUTPUT_TYPES = [
  {
    label: "2空格缩进",
    value: "indent-2",
    format: jsonToXML2,
  },
  {
    label: "4空格缩进",
    value: "indent-4",
    format: jsonToXML4,
  },
  {
    label: "Tab缩进",
    value: "indent-tab",
    format: jsonToXMLTab,
  },
  {
    label: "压缩",
    value: "compress",
    format: jsonToXMLCompress,
  },
];

const INPUT_STORGE_KEY = "app-json2xml-input";
const INDENT_STORGE_KEY = "app-json2xml-indentType";

export default function () {
  const [input, setInput] = useStorgeState(EXP, INPUT_STORGE_KEY);
  const [indentType, setIndentType] = useStorgeState(
    JSON_OUTPUT_TYPES[0].value,
    INDENT_STORGE_KEY
  );

  return (
    <ReflexContainer orientation="vertical">
      <ReflexElement>
        <AboutApp readme={readme} />
        <div className="input-title">
          <span className="title">输入</span>
          <div className="operation">
            <div>
              <PasteBtn onPaste={(value) => setInput(value)} />
              <LoadingButton
                size="small"
                variant="outlined"
                sx={{ marginLeft: 1 }}
                onClick={() => {
                  return jsonrepairRequest(input).then(setInput);
                }}
              >
                AI 修复
              </LoadingButton>
            </div>
            <Button onClick={() => setInput(EXP)} size="small">
              示例
            </Button>
          </div>
        </div>
        <Editor
          defaultLanguage="json"
          height="calc(100vh - 100px)"
          value={input}
          onChange={setInput}
        />
      </ReflexElement>
      <ReflexSplitter></ReflexSplitter>
      <ReflexElement>
        <div className="output-title">
          <span className="title">输出</span>
          <div className="operation">
            <div>
              <CopyBtn onCopy={() => outputFormat(input, indentType)} />
            </div>
            <Select
              value={indentType}
              onChange={(e) => setIndentType(e.target.value)}
              size="small"
              sx={{ fontSize: 12, height: 31 }}
            >
              {JSON_OUTPUT_TYPES.map(({ label, value }) => {
                return (
                  <MenuItem value={value} key={value} sx={{ fontSize: 12 }}>
                    {label}
                  </MenuItem>
                );
              })}
            </Select>
          </div>
        </div>
        <Editor
          defaultLanguage="xml"
          height="calc(100vh - 100px)"
          value={outputFormat(input, indentType)}
        />
      </ReflexElement>
    </ReflexContainer>
  );
}

function jsonToXML2(input) {
  return toXML(input, {
    indent: "  ",
  });
}

function jsonToXML4(input) {
  return toXML(input, {
    indent: "    ",
  });
}

function jsonToXMLTab(input) {
  return toXML(input, {
    indent: " ",
  });
}

function jsonToXMLCompress(input) {
  return toXML(input, {
    indent: "",
  });
}

function outputFormat(inputStr, indentType) {
  try {
    const json = JSON.parse(inputStr);
    const ouputConfig = JSON_OUTPUT_TYPES.find(
      (item) => item.value === indentType
    );
    return ouputConfig.format(json);
  } catch (e) {
    console.log(e);
    return e.message;
  }
}

function jsonrepairRequest(json) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(jsonrepair(json));
    }, 500);
  });
}
