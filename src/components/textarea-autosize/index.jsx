import TextareaAutosize from "@mui/material/TextareaAutosize";
import { IconCopyBtn } from "../copy-btn";

import "./index.less";

export default function (props) {
  return (
    <div className="default-textarea-wrap">
      <IconCopyBtn onCopy={() => props.value} />
      <TextareaAutosize
        className="default-textarea-style"
        minRows={10}
        maxRows={50}
        {...props}
      ></TextareaAutosize>
    </div>
  );
}
