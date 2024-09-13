import React from "react";
import { Link } from "react-router-dom";
import { ReflexContainer, ReflexSplitter, ReflexElement } from "react-reflex";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import CloudUpload from "@mui/icons-material/CloudUpload";

import md5 from "crypto-js/md5";

import { TextareaAutosize, PasteBtn, IconCopyBtn } from "$src/components";
import { useStorgeState } from "$src/hooks";

const EXP = "hello";
const INPUT_STORGE_KEY = "app-md5-input";

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
              <Button
                size="small"
                variant="outlined"
                tabIndex={-1}
                startIcon={<CloudUpload />}
                component={Link}
                to="/apps/md5-files"
              >
                文件 MD5 生成
              </Button>
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
        </div>
        <div>
          <br />
          <FormControl fullWidth>
            <InputLabel htmlFor="z32">32位小写</InputLabel>
            <Input
              value={md5(input).toString()}
              id="z32"
              startAdornment={
                <IconCopyBtn onCopy={() => md5(input).toString()} />
              }
            />
          </FormControl>
          <br />
          <br />
          <br />
          <FormControl fullWidth>
            <InputLabel htmlFor="z32">32位大写</InputLabel>
            <Input
              value={md5(input).toString().toUpperCase()}
              id="z32"
              startAdornment={
                <IconCopyBtn
                  onCopy={() => md5(input).toString().toUpperCase()}
                />
              }
            />
          </FormControl>

          <br />
          <br />
          <br />
          <FormControl fullWidth>
            <InputLabel htmlFor="z32">16位小写</InputLabel>
            <Input
              value={md5(input, {}).toString().slice(8, 24)}
              id="z32"
              startAdornment={
                <IconCopyBtn
                  onCopy={() => md5(input).toString().slice(8, 24)}
                />
              }
            />
          </FormControl>
          <br />
          <br />
          <br />
          <FormControl fullWidth>
            <InputLabel htmlFor="z32">16位大写</InputLabel>
            <Input
              value={md5(input, {}).toString().toUpperCase().slice(8, 24)}
              id="z32"
              startAdornment={
                <IconCopyBtn
                  onCopy={() =>
                    md5(input).toString().toUpperCase().slice(8, 24)
                  }
                />
              }
            />
          </FormControl>
        </div>
      </ReflexElement>
    </ReflexContainer>
  );
}

export { default as config } from "./config.json";
