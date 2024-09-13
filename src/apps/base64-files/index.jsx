import React from "react";
import { ReflexContainer, ReflexSplitter, ReflexElement } from "react-reflex";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CloudUpload from "@mui/icons-material/CloudUpload";
import useRequest from "ahooks/es/useRequest";
import CryptoJS from "crypto-js";

import { TextareaAutosize } from "$src/components";
import { useStorgeState } from "$src/hooks";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const OUTPUT_TYPES = [
  {
    label: "原始内容",
    value: "origin",
    format(base64Str) {
      return base64Str;
    },
  },
  {
    label: "HTML img 标签使用",
    value: "html-img",
    format(base64Str, file) {
      // <img src="" />
      return `<img src="data:${file.type};base64,${base64Str}" />`;
    },
  },
];

export default function () {
  const [input, setInput] = React.useState([]);
  const [indentType, setIndentType] = useStorgeState(
    OUTPUT_TYPES[0].value,
    "app-base64-files-indentType"
  );
  const { data = [] } = useRequest(
    () => {
      return filesMD5Output(input, indentType);
    },
    {
      refreshDeps: [input, indentType],
    }
  );
  return (
    <ReflexContainer orientation="vertical">
      <ReflexElement flex={3}>
        <div className="input-title">
          <span className="title">输入</span>
          <div className="operation">
            <div>
              <Button
                size="small"
                component="label"
                variant="outlined"
                tabIndex={-1}
                startIcon={<CloudUpload />}
              >
                选择本地文件（可多选）
                <VisuallyHiddenInput
                  type="file"
                  multiple
                  onChange={(e) => {
                    setInput(e.target.files);
                  }}
                />
              </Button>
            </div>
          </div>
          <br />
          {Array.from(input).map((file) => {
            return <div key={file.name}>{file.name}</div>;
          })}
          {input.length ? (
            <div>
              <Button
                variant="outlined"
                color="error"
                onClick={() => setInput([])}
                size="small"
              >
                清除
              </Button>
            </div>
          ) : null}
        </div>
      </ReflexElement>
      <ReflexSplitter></ReflexSplitter>
      <ReflexElement flex={8}>
        <div className="output-title">
          <span className="title">输出</span>
          <div className="operation">
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
          {data.map(([file, base64Str]) => {
            return (
              <div key={file.name}>
                {file.name}
                <TextareaAutosize value={base64Str} maxRows={10} />
              </div>
            );
          })}
        </div>
      </ReflexElement>
    </ReflexContainer>
  );
}

function filesMD5Output(files, indentType) {
  files = Array.from(files);
  const format =
    OUTPUT_TYPES.find((item) => item.value === indentType) || OUTPUT_TYPES[0];
  return Promise.all(files.map(fileToMD5)).then((base64Arr) => {
    const ret = files.map((file, index) => {
      return [file, format.format(base64Arr[index], file)];
    });
    return ret;
  });
}

function fileToMD5(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      // console.log(e.target.result)
      const wordArray = CryptoJS.lib.WordArray.create(e.target.result);
      resolve(CryptoJS.enc.Base64.stringify(wordArray));
    };
    fileReader.readAsArrayBuffer(file);
    // fileReader.readAsDataURL(file)
  });
}
