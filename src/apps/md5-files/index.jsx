import React from "react";
import { ReflexContainer, ReflexSplitter, ReflexElement } from "react-reflex";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CloudUpload from "@mui/icons-material/CloudUpload";
import useRequest from "ahooks/es/useRequest";
import md5 from "crypto-js/md5";
import CryptoJS from "crypto-js";

import { TextareaAutosize, CopyBtn } from "$src/components";
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
    label: "逗号分割",
    value: ",",
  },
  {
    label: "空格分割",
    value: " ",
  },
  {
    label: "竖线分割",
    value: "|",
  },
];

export default function () {
  const [input, setInput] = React.useState([]);
  const [indentType, setIndentType] = useStorgeState(
    OUTPUT_TYPES[0].value,
    "app-md5-files-indentType"
  );
  const { data = [] } = useRequest(
    () => {
      return filesMD5Output(input, indentType);
    },
    {
      refreshDeps: [input],
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
            <div>
              <CopyBtn onCopy={() => data.join("\n")} />
            </div>
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
          <TextareaAutosize value={data.join("\n")} />
        </div>
      </ReflexElement>
    </ReflexContainer>
  );
}

function filesMD5Output(files, space = " ") {
  files = Array.from(files);
  return Promise.all(files.map(fileToMD5)).then((md5s) => {
    const ret = files.map((file, index) => {
      return `${file.name}${space}${md5s[index]}`;
    });
    return ret;
  });
}

function fileToMD5(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = (e) => {
      const wordArray = CryptoJS.lib.WordArray.create(e.target.result);
      resolve(md5(wordArray).toString());
    };
  });
}
