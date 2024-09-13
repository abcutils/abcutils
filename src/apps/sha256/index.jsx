import React from "react";
import { ReflexContainer, ReflexSplitter, ReflexElement } from "react-reflex";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import sha224 from "crypto-js/sha224";
import sha256 from "crypto-js/sha256";
import sha384 from "crypto-js/sha384";
import sha512 from "crypto-js/sha512";
import { TextareaAutosize, PasteBtn, IconCopyBtn } from "$src/components";
import { useStorgeState } from "$src/hooks";

const EXP = "hello";
const INPUT_STORGE_KEY = "app-sha265-input";

export default function () {
  const [input, setInput] = useStorgeState(EXP, INPUT_STORGE_KEY);

  return (
    <ReflexContainer orientation="vertical" className="apps-sha265">
      <ReflexElement flex={3}>
        <div className="input-title">
          <span className="title">输入</span>
          <div className="operation">
            <PasteBtn onPaste={setInput} />
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
          {/* <div className='operation' >
          <Button size="small" variant="outlined" >设置</Button>
        </div> */}
        </div>
        <div>
          <br />
          <FormControl fullWidth>
            <InputLabel htmlFor="sha224">SHA224</InputLabel>
            <Input
              value={sha224(input).toString()}
              id="sha224"
              multiline
              startAdornment={
                <IconCopyBtn onCopy={() => sha224(input).toString()} />
              }
            />
          </FormControl>
          <br />
          <br />
          <br />
          <FormControl fullWidth>
            <InputLabel htmlFor="SHA256">SHA256</InputLabel>
            <Input
              value={sha256(input).toString()}
              id="SHA256"
              multiline
              startAdornment={
                <IconCopyBtn onCopy={() => sha256(input).toString()} />
              }
            />
          </FormControl>
          <br />
          <br />
          <br />
          <FormControl fullWidth>
            <InputLabel htmlFor="sha384">SHA384</InputLabel>
            <Input
              value={sha384(input).toString()}
              id="sha384"
              multiline
              startAdornment={
                <IconCopyBtn onCopy={() => sha384(input).toString()} />
              }
            />
          </FormControl>
          <br />
          <br />
          <br />
          <FormControl fullWidth>
            <InputLabel htmlFor="sha512">SHA512</InputLabel>
            <Input
              value={sha512(input).toString()}
              id="sha512"
              multiline
              startAdornment={
                <IconCopyBtn onCopy={() => sha512(input).toString()} />
              }
            />
          </FormControl>
        </div>
      </ReflexElement>
    </ReflexContainer>
  );
}
