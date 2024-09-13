import React from "react";
import { ReflexContainer, ReflexSplitter, ReflexElement } from "react-reflex";
import { styled } from "@mui/material/styles";
import Compressor from "compressorjs";
import Button from "@mui/material/Button";
import CloudUpload from "@mui/icons-material/CloudUpload";
import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import useRequest from "ahooks/es/useRequest";

import { useStorgeState } from "$src/hooks";

import "cropperjs/dist/cropper.css";

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
      return `<img src="data:${file.type};base64,${base64Str}" />`;
    },
  },
];

export default function () {
  const cropperRef = React.useRef();
  const [options, setOptions] = useStorgeState({
    mimeType: "auto",
    quality: 0.8,
  });
  const [files, setFiles] = React.useState([]);
  const [indentType, setIndentType] = useStorgeState(
    OUTPUT_TYPES[0].value,
    "app-base64-files-indentType"
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
                选择本地图片(可选择多个)
                <VisuallyHiddenInput
                  type="file"
                  accept="image/png, image/jpeg, image/gif, image/webp"
                  multiple
                  onChange={(e) => {
                    setFiles(e.target.files);
                  }}
                />
              </Button>
            </div>
          </div>
        </div>
        <div>
          <br />
          <TextField
            label="输出质量（%）"
            size="small"
            fullWidth
            variant="outlined"
            value={(options.quality * 100).toFixed(0)}
            type="number"
            onChange={(e) => {
              let v = e.target.value / 100;
              v = v > 1 ? 1 : v;
              v = v < 0 ? 0 : v;
              setOptions({
                ...options,
                quality: v,
              });
            }}
          />
          <br />
          <br />
          <TextField
            label="输出格式"
            size="small"
            fullWidth
            variant="outlined"
            placeholder="压缩率0-1"
            value={options.mimeType}
            select
            onChange={(e) => {
              setOptions({
                ...options,
                mimeType: e.target.value,
              });
            }}
          >
            <MenuItem value="auto">与原图保持不变</MenuItem>
            <MenuItem value="image/png">.png</MenuItem>
            <MenuItem value="image/jpeg">.jpg</MenuItem>
            <MenuItem value="image/gif">.gif</MenuItem>
            <MenuItem value="image/webp">.webp</MenuItem>
          </TextField>
        </div>
      </ReflexElement>
      <ReflexSplitter></ReflexSplitter>
      <ReflexElement flex={8}>
        <div className="output-title">
          <span className="title">输出</span>
          <div className="operation">
            <div></div>
            <Button
              size="small"
              component="label"
              variant="outlined"
              onClick={() => {
                const base64data = cropperRef.current.cropper
                  .getCroppedCanvas()
                  .toDataURL();
                downloadFileByBase64(base64data);
              }}
            >
              全部下载到本地
            </Button>
          </div>
        </div>
        <div>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>文件名</TableCell>
                  <TableCell align="right">原始大小(KB)</TableCell>
                  <TableCell align="right">压缩后(KB)</TableCell>
                  <TableCell align="right">压缩比</TableCell>
                  <TableCell align="right">输出格式</TableCell>
                  <TableCell align="right">操作</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.from(files).map((file) => (
                  <CompressorResult
                    key={file.name}
                    file={file}
                    options={options}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </ReflexElement>
    </ReflexContainer>
  );
}

function CompressorResult({ file, options }) {
  const { data = "", loading } = useRequest(
    () => {
      return compressorFileRequest(file, options);
    },
    {
      refreshDeps: [file, options],
    }
  );
  return (
    <TableRow key={file.name}>
      <TableCell component="th" scope="row">
        {file.name}
      </TableCell>
      <TableCell align="right">{ktoKB(file.size)}</TableCell>
      <TableCell align="right">
        {loading ? <CircularProgress size={16} /> : ktoKB(data.size)}
      </TableCell>
      <TableCell align="right">
        {loading ? (
          <CircularProgress size={16} />
        ) : (
          compressionRatio(file.size, data.size)
        )}
      </TableCell>
      <TableCell align="right">{data.type}</TableCell>
      <TableCell align="right">
        <Button
          variant="contained"
          size="small"
          onClick={() => downloadBlob(data, data.name)}
        >
          下载
        </Button>
      </TableCell>
    </TableRow>
  );
}

function ktoKB(size) {
  return (size / 1024).toFixed(2);
}

function compressionRatio(originSize, outputSize) {
  return parseInt(((originSize - outputSize) / originSize) * 100) + "%";
}
function compressorFileRequest(file, options) {
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      ...options,
      success(ret) {
        resolve(ret);
      },
    });
  });
}

function downloadFile(url, name = "What's the fuvk") {
  var a = document.createElement("a");
  a.setAttribute("href", url);
  a.setAttribute("download", name);
  a.setAttribute("target", "_blank");
  let clickEvent = document.createEvent("MouseEvents");
  clickEvent.initEvent("click", true, true);
  a.dispatchEvent(clickEvent);
}

function downloadBlob(blob, name) {
  downloadFile(URL.createObjectURL(blob), name);
}
