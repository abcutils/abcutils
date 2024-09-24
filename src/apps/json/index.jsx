import React from "react";
import { ReflexContainer, ReflexSplitter, ReflexElement } from "react-reflex";
import axios from "axios";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { jsonrepair } from "jsonrepair";
import { CopyBtn, PasteBtn, LoadingButton, AboutApp, MonacoEditor } from "$src/components";
import { useStorgeState } from "$src/hooks";
import readme from "./readme.md?raw";


const INPUT_STORGE_KEY = "app-json-input";
const INDENT_STORGE_KEY = "app-json-indentType";

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
    format: to2IndentType,
  },
  {
    label: "4空格缩进",
    value: "indent-4",
    format: to4IndentType,
  },
  {
    label: "Tab缩进",
    value: "indent-tab",
    format: toTABIndentType,
  },
  {
    label: "压缩",
    value: "compress",
    format: toCompress,
  },
];

export default function () {
  const [input, setInput] = useStorgeState(EXP, INPUT_STORGE_KEY);
  const [indentType, setIndentType] = useStorgeState(
    JSON_OUTPUT_TYPES[0].value,
    INDENT_STORGE_KEY
  );

  const outputJSON = outputFormat(input, indentType);
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
        <MonacoEditor
          defaultLanguage="json"
          width="100%"
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
              <Button
                size="small"
                variant="outlined"
                onClick={() => setInput(outputFormat(input, indentType))}
                sx={{ marginRight: "10px" }}
              >
                复制到左侧
              </Button>
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
        {outputJSON instanceof Error ? (
          <div className="json-error">
            <div>{outputJSON.message}</div>
            <LoadingButton
              variant="contained"
              sx={{ marginLeft: 1 }}
              onClick={() => {
                return jsonrepairRequest(input).then(setInput);
              }}
            >
              AI 修复
            </LoadingButton>
          </div>
        ) : (
          <MonacoEditor
            defaultLanguage="json"
            width="100%"
            height="calc(100vh - 100px)"
            value={outputJSON}
          />
        )}
      </ReflexElement>
    </ReflexContainer>
  );
}

function to2IndentType(input) {
  return JSON.stringify(input, "", "  ");
}

function to4IndentType(input) {
  return JSON.stringify(input, "", "    ");
}

function toTABIndentType(input) {
  return JSON.stringify(input, "", "  ");
}

function toCompress(input) {
  return JSON.stringify(input, "", "");
}

function outputFormat(inputStr, indentType) {
  try {
    const json = JSON.parse(inputStr);
    const ouputConfig = JSON_OUTPUT_TYPES.find(
      (item) => item.value === indentType
    );
    return ouputConfig.format(json);
  } catch (e) {
    return e;
  }
}

function jsonrepairRequest(jsonStr) {
  try {
    const fixjson = localPairJson(jsonStr);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(fixjson);
      }, 300);
    });
  } catch (e) {
    return axios({
      url: "/api/fix/json",
      headers: {},
      method: "POST",
      data: {
        input: jsonStr,
      },
    }).then((res) => {
      return res.data.data;
    });
  }
}

function localPairJson(jsonStr) {
  return jsonrepair(jsonStr);
}
