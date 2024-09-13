import React from "react";
import { ReflexContainer, ReflexSplitter, ReflexElement } from "react-reflex";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUpload from "@mui/icons-material/CloudUpload";
import ReactCropperElement from "react-cropper";
import { useStorgeState } from "$src/hooks";

import "cropperjs/dist/cropper.css";

import EXP from "./assets/child.jpg";

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
  const [image, setImage] = React.useState(EXP);
  const [indentType, setIndentType] = useStorgeState(
    OUTPUT_TYPES[0].value,
    "app-base64-files-indentType"
  );

  return (
    <ReflexContainer orientation="vertical">
      <ReflexElement flex={8}>
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
                选择单个本地图片
                <VisuallyHiddenInput
                  type="file"
                  accept="image/png, image/jpeg, image/gif, image/webp"
                  onChange={(e) => {
                    fileToBase64(e.target.files[0]).then((imageBase64) => {
                      setImage(imageBase64);
                    });
                  }}
                />
              </Button>
            </div>
          </div>
        </div>
        <div style={{ height: 400 }}>
          {image ? (
            <ReactCropperElement
              src={image}
              preview=".img-preview"
              ref={cropperRef}
              initialAspectRatio={1}
              viewMode={1}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false}
              guides={true}
            />
          ) : null}
        </div>
      </ReflexElement>
      <ReflexSplitter></ReflexSplitter>
      <ReflexElement flex={3}>
        <div className="output-title">
          <span className="title">输出</span>
          <div className="operation">
            {image ? (
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
                保存到本地
              </Button>
            ) : null}
          </div>
        </div>

        <div>
          <div
            className="img-preview"
            style={{ height: 300, overflow: "hidden" }}
          ></div>
        </div>
      </ReflexElement>
    </ReflexContainer>
  );
}

// function ReactCropper(props){
//   const ref = React.useRef()
//   React.useEffect(()=>{
//     const img = new Image()
//     img.src = props.image;
//     props.cropper.current = new Cropper(img, {
//       container: "#abc",
//       cropperView: props.cropperView
//     });
//     window.cropper = props.cropper.current
//   }, [])

//   return <div id="abc" style={{height:"80vh"}} ></div>
// }

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      resolve(e.target.result);
      // console.log(e.target.result)
      // const wordArray = CryptoJS.lib.WordArray.create(e.target.result)
      // resolve(CryptoJS.enc.Base64.stringify(wordArray))
    };
    // fileReader.readAsArrayBuffer(file)
    fileReader.readAsDataURL(file);
  });
}

function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
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

function downloadFileByBase64(base64, name) {
  var myBlob = dataURLtoBlob(base64);
  var myUrl = URL.createObjectURL(myBlob);
  downloadFile(myUrl, name);
}

export { default as config } from "./config.json";
