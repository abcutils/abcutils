import React from "react";
import { ReflexContainer, ReflexSplitter, ReflexElement } from "react-reflex";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { styled } from "styled-components";
import readme from "./readme.md?raw";
import { AboutApp } from "$src/components";
import { useStorgeState } from "$src/hooks";

const EXP1 = "[a-z]+";
const EXP2 = readme;
const INPUT_STORGE_KEY_1 = "app-regexp-input-1";
const INPUT_STORGE_KEY_2 = "app-regexp-input-2";
const OUTPUT_STORGE_KEY = "app-ascll2hex-output";

const OUTPUT_TYPES = [
  {
    label: "空格",
    value: " ",
  },
  {
    label: "0x",
    value: "0x",
  },
  {
    label: "0X",
    value: "0x",
  },
  {
    label: "\\0x",
    value: "\\0x",
  },
  {
    label: "\\0X",
    value: "\\0X",
  },
  {
    label: "\\x",
    value: "\\x",
  },
  {
    label: "\\X",
    value: "\\X",
  },
];

export default function () {
  const [input1, setInput1] = useStorgeState(EXP1, INPUT_STORGE_KEY_1);
  const [input2, setInput2] = useStorgeState(EXP2, INPUT_STORGE_KEY_2);
  const [indentType, setIndentType] = useStorgeState(
    OUTPUT_TYPES[0].value,
    OUTPUT_STORGE_KEY
  );

  return (
    <ReflexContainer orientation="vertical">
      <ReflexElement flex={3}>
        <AboutApp readme={readme} />
        <div className="input-title">
          <span className="title">输入</span>
          <div className="operation">
            <div></div>
            <Button
              onClick={() => {
                setInput1(EXP1);
                setInput2(EXP2);
              }}
              size="small"
            >
              示例
            </Button>
          </div>
        </div>
        <TextField
          fullWidth
          label="正则表达式字符串"
          value={input1}
          onChange={(e) => setInput1(e.target.value)}
          style={{ maxWidth: "100%" }}
        />
        <br />
        <br />
        <TextField
          multiline
          rows={10}
          placeholder="输入待匹配的文本"
          fullWidth
          label="待匹配文本"
          value={input2}
          onChange={(e) => setInput2(e.target.value)}
          style={{ maxWidth: "100%" }}
        />
      </ReflexElement>
      <ReflexSplitter></ReflexSplitter>
      <ReflexElement flex={5}>
        <div className="output-title">
          <span className="title">输出</span>
          <div className="operation">
          </div>
        </div>
        <div>
          <ExpResultHighlight text={input2} regexp={input1} />
        </div>
      </ReflexElement>
    </ReflexContainer>
  );
}

function isEffectiveExp(regexp) {
  try {
    new RegExp(regexp);
    return true;
  } catch (e) {
    return false;
  }
}

function htmlEnCode(text) {
  return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const ResultHighlight = styled.code`
  .highlight {
    border: 1px solid #002eff;
    border-radius: 3px;
    background: #d2f7f6;
  }
`;

const ResultHighlightTitle = styled.div`
  margin-bottom: 10px;
  .regexp {
    border: 1px solid #002eff;
    border-radius: 3px;
    background: #d2f7f6;
    margin: 0 10px;
    border-radius: 4px;
    padding: 0 0.3em;
  }
`;
function ExpResultHighlight({ text, regexp }) {
  const [output, setOutput] = React.useState(htmlEnCode(text));
  React.useEffect(() => {
    if (isEffectiveExp(regexp)) {
      const safeText = htmlEnCode(text);
      const reg = new RegExp(regexp, "ig");
      const ret = safeText.match(reg);
      if (ret) {
        setOutput(
          safeText.replace(
            reg,
            (match) => `<span class="highlight">${match}</span>`
          )
        );
      }
    }
  }, [text, regexp]);

  return (
    <div>
      <ResultHighlightTitle>
        高亮使用
        <span className="regexp">
          {isEffectiveExp(regexp) ? new RegExp(regexp, "ig").toString() : null}
        </span>
        的匹配结果
      </ResultHighlightTitle>
      <ResultHighlight
        dangerouslySetInnerHTML={{ __html: output }}
      ></ResultHighlight>
    </div>
  );
}
