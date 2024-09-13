import React from "react";
import { ReflexContainer, ReflexSplitter, ReflexElement } from "react-reflex";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { format } from "sql-formatter";
import Editor from "@monaco-editor/react";
import readme from "./readme.md?raw";
import { CopyBtn, PasteBtn, AboutApp } from "$src/components";
import { useStorgeState } from "$src/hooks";
import EXP from "./exp";

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
  // {
  //   "label":"压缩",
  //   "value":"compress",
  //   "format": jsonToXMLCompress
  // }
];

const INPUT_STORGE_KEY = "app-sql-input";
const INDENT_STORGE_KEY = "app-sql-indentType";

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
            </div>
            <Button onClick={() => setInput(EXP)} size="small">
              示例
            </Button>
          </div>
        </div>
        <Editor
          defaultLanguage="sql"
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
          defaultLanguage="sql"
          height="calc(100vh - 100px)"
          value={outputFormat(input, indentType)}
        />
      </ReflexElement>
    </ReflexContainer>
  );
}
// this.editor.getAction(['editor.action.formatDocument'])._run();

export { default as config } from "./config.json";

function jsonToXML2(input) {
  return format(input, {
    tabWidth: 2,
  });
}

function jsonToXML4(input) {
  return format(input, {
    tabWidth: 4,
  });
}

function jsonToXMLTab(input) {
  return format(input, {
    tabWidth: 1,
    indent_char: "\t",
  });
}

function jsonToXMLCompress(input) {
  return format(input, {
    tabWidth: 0,
    indent_char: "",
  });
}

function outputFormat(inputStr, indentType) {
  try {
    const ouputConfig = JSON_OUTPUT_TYPES.find(
      (item) => item.value === indentType
    );
    return ouputConfig.format(inputStr);
  } catch (e) {
    return e.message;
  }
}
