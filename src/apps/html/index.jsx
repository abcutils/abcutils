import React from "react";
import { ReflexContainer, ReflexSplitter, ReflexElement } from "react-reflex";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import beautify from "js-beautify";
import readme from "./readme.md?raw";
import { CopyBtn, PasteBtn, AboutApp, MonacoEditor} from "$src/components";
import { useStorgeState } from "$src/hooks";

const EXP = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ABC utils</title>
    <style>
    .hello{
    background:#f30f30}
    </style>
    <script
      type="module"
      crossorigin
      src="https://yibu-web.oss-cn-hangzhou.aliyuncs.com/business/project-silk-pouch/assets/index.js"
    ></script>
    <link
      rel="stylesheet"
      crossorigin
      href="https://yibu-web.oss-cn-hangzhou.aliyuncs.com/business/project-silk-pouch/assets/index.css"
    />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`;
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

const INPUT_STORGE_KEY = "app-html-input";
const INDENT_STORGE_KEY = "app-html-indentType";

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
        <MonacoEditor
          defaultLanguage="html"
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
        <MonacoEditor
          defaultLanguage="html"
          height="calc(100vh - 100px)"
          value={outputFormat(input, indentType)}
        />
      </ReflexElement>
    </ReflexContainer>
  );
}

function jsonToXML2(input) {
  return beautify.html(input, {
    indent_size: 2,
  });
}

function jsonToXML4(input) {
  return beautify.html(input, {
    indent_size: 4,
  });
}

function jsonToXMLTab(input) {
  return beautify.html(input, {
    indent_size: 1,
    indent_char: "\t",
  });
}

function jsonToXMLCompress(input) {
  return beautify
    .html(input, {
      indent_size: 0,
      indent_char: "",
    })
    .replace(/[\n\s]/gi, "");
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
