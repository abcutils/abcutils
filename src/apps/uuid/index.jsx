import React from "react";
import { ReflexContainer, ReflexSplitter, ReflexElement } from "react-reflex";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import { v1, v3, v4, v5, v6, v7 } from "uuid";

import { TextareaAutosize, CopyBtn } from "$src/components";
import { useStorgeState } from "$src/hooks";

const DEFAULT_CONFIG = {
  quantity: 1,
  uuidVersion: "V4",
  outputType1: "low",
  outputType2: "-",
};

const INPUT_STORGE_KEY = "apps-uuid-inputs";

const UUID_VERSION = {
  V1: v1,
  // "V2":v2,
  // "V3":v3,
  V4: v4,
  V5: v5,
  V6: v6,
  V7: v7,
};
const OUTPUT_CASE_SEN = [
  {
    label: "小写",
    value: "low",
    format(uuid) {
      return uuid;
    },
  },
  {
    label: "大写",
    value: "up",
    format(uuid) {
      return uuid.toUpperCase();
    },
  },
];

const OUTPUT_SPLIT_STR = [
  {
    label: "中划线",
    value: "-",
    format(uuid) {
      return uuid;
    },
  },
  {
    label: "无",
    value: "none",
    format(uuid) {
      return uuid.replace(/\-/gi, "");
    },
  },
  {
    label: "竖线",
    value: "|",
    format(uuid) {
      return uuid.replace(/\-/gi, "|");
    },
  },
];

export default function () {
  const [options, setOptions] = useStorgeState(
    DEFAULT_CONFIG,
    INPUT_STORGE_KEY
  );

  const uuids = outputformat(generateUUID(options).join("\n"), options);

  return (
    <ReflexContainer orientation="vertical">
      <ReflexElement flex={3}>
        <div className="input-title">
          <span className="title">输入</span>
          <div className="operation">
            <Button onClick={() => setOptions(DEFAULT_CONFIG)} size="small">
              默认配置
            </Button>
          </div>
        </div>
        <br />
        <TextField
          label="生成数量"
          size="small"
          fullWidth
          variant="outlined"
          value={options.quantity}
          type="number"
          onChange={(e) => {
            setOptions({
              ...options,
              quantity: e.target.value,
            });
          }}
        />
        <br />
        <br />
        <TextField
          label="版本"
          size="small"
          fullWidth
          variant="outlined"
          value={options.uuidVersion}
          select
          onChange={(e) => {
            setOptions({
              ...options,
              uuidVersion: e.target.value,
            });
          }}
        >
          <MenuItem value="V1">V1</MenuItem>
          {/* <MenuItem value="V2" >V2</MenuItem> */}
          {/* <MenuItem value="V3" >V3</MenuItem> */}
          <MenuItem value="V4">V4</MenuItem>
          <MenuItem value="V5">V5</MenuItem>
          <MenuItem value="V6">V6</MenuItem>
          <MenuItem value="V7">V7</MenuItem>
        </TextField>
      </ReflexElement>
      <ReflexSplitter></ReflexSplitter>
      <ReflexElement flex={8}>
        <div className="output-title">
          <span className="title">输出</span>
          <div className="operation">
            <CopyBtn onCopy={() => uuids} />
            <div>
              <Select
                value={options.outputType1}
                onChange={(e) =>
                  setOptions({ ...options, outputType1: e.target.value })
                }
                size="small"
                sx={{ fontSize: 12, height: 31 }}
              >
                {OUTPUT_CASE_SEN.map(({ label, value }) => {
                  return (
                    <MenuItem value={value} key={value} sx={{ fontSize: 12 }}>
                      {label}
                    </MenuItem>
                  );
                })}
              </Select>
              <Select
                value={options.outputType2}
                onChange={(e) =>
                  setOptions({ ...options, outputType2: e.target.value })
                }
                size="small"
                sx={{ fontSize: 12, height: 31, marginLeft: 1 }}
              >
                {OUTPUT_SPLIT_STR.map(({ label, value }) => {
                  return (
                    <MenuItem value={value} key={value} sx={{ fontSize: 12 }}>
                      {label}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>
          </div>
        </div>
        <div>
          <TextareaAutosize value={uuids}></TextareaAutosize>
        </div>
      </ReflexElement>
    </ReflexContainer>
  );
}

function generateUUID(options) {
  return Array.from({ length: options.quantity }).map(() =>
    UUID_VERSION[options.uuidVersion]()
  );
}

function outputformat(uuids, options) {
  return outputSPLITSTR(outputCASESEN(uuids, options), options);
}

function outputCASESEN(uuid, options) {
  const format = OUTPUT_CASE_SEN.find(
    (item) => item.value === options.outputType1
  );
  if (format) {
    return format.format(uuid);
  }
  return uuid;
}

function outputSPLITSTR(uuid, options) {
  const format = OUTPUT_SPLIT_STR.find(
    (item) => item.value === options.outputType2
  );
  if (format) {
    return format.format(uuid);
  }
  return uuid;
}

export { default as config } from "./config.json";
