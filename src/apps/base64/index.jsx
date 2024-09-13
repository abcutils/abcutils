import React from "react";
import { Link } from "react-router-dom";
import { ReflexContainer, ReflexSplitter, ReflexElement } from "react-reflex";
import Button from "@mui/material/Button";
import CloudUpload from "@mui/icons-material/CloudUpload";

import CryptoJS from "crypto-js";
import Base64 from "crypto-js/enc-base64";

import { TextareaAutosize, PasteBtn, CopyBtn } from "$src/components";
import { useStorgeState } from "$src/hooks";

const EXP = "hello";
const INPUT_STORGE_KEY = "app-base65-input";

export default function () {
  const [input, setInput] = useStorgeState("", INPUT_STORGE_KEY);
  React.useEffect(() => {
    const query = new URLSearchParams(location.search);
    const input = query.get("input");
    if (input) {
      setInput(input);
    }
  }, [location.search]);

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
                to="/apps/base64-files"
              >
                图片 Base64 编码
              </Button>
            </div>
            <Button onClick={() => setInput(EXP)} size="small">
              示例
            </Button>
          </div>
        </div>
        <TextareaAutosize
          placeholder={`- 输入字符串编码为Base64格式 \n- 输入Base64格式的数据自动解码`}
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
            <CopyBtn onCopy={() => toOutput(input)} />
          </div>
        </div>
        <div>
          <TextareaAutosize value={toOutput(input)}></TextareaAutosize>
          <br />
          <br />
          <br />
        </div>
      </ReflexElement>
    </ReflexContainer>
  );
}

function isBase64String(str) {
  try {
    return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gi.test(
      str
    );
  } catch (e) {
    return false;
  }
}

function toOutput(input) {
  if (isBase64String(input)) {
    try {
      // 解码
      return Base64.parse(input).toString(CryptoJS.enc.Utf8);
    } catch (e) {
      console.log(e);
    }
  }
  // 编码
  return Base64.stringify(CryptoJS.enc.Utf8.parse(input));
}
