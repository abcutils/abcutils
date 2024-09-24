import React from "react";
import { ReflexContainer, ReflexSplitter, ReflexElement } from "react-reflex";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import beautify from "js-beautify";
import readme from "./readme.md?raw";
import { CopyBtn, PasteBtn, AboutApp, MonacoEditor} from "$src/components";
import { useStorgeState } from "$src/hooks";

const EXP = `
:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}
a:hover {
  color: #535bf2;
}

body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
  background-color: #f8f9fb;
}


@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  a:hover {
    color: #747bff;
  }
}

/* default ui */ 

select{
  border-radius: 8px;
  box-sizing: border-box;
  height: 2em;
  line-height: 2em;
  padding: 0 1em;
}
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

const INPUT_STORGE_KEY = "app-css-input";
const INDENT_STORGE_KEY = "app-css-indentType";

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
          defaultLanguage="css"
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
          defaultLanguage="css"
          height="calc(100vh - 100px)"
          value={outputFormat(input, indentType)}
        />
      </ReflexElement>
    </ReflexContainer>
  );
}

function jsonToXML2(input) {
  return beautify.css(input, {
    indent_size: 2,
  });
}

function jsonToXML4(input) {
  return beautify.css(input, {
    indent_size: 4,
  });
}

function jsonToXMLTab(input) {
  return beautify.css(input, {
    indent_size: 1,
    indent_char: "\t",
  });
}

function jsonToXMLCompress(input) {
  return beautify
    .css(input, {
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
