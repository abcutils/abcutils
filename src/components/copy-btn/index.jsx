import React from "react";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import ContentCopyRounded from "@mui/icons-material/ContentCopyRounded";
import CheckRounded from "@mui/icons-material/CheckRounded";
import IconButton from "@mui/material/IconButton";
import clipboard from "clipboardy";

import "./index.less";

// <CopyBtn onCopy={()=> "hello world"} />

const CP_TXT = "点击复制到剪贴板";
const CP_SUCCESS_TXT = "复制成功";

export default function (props) {
  const [text, setText] = React.useState(CP_TXT);
  const showSuccess = React.useCallback(() => {
    setText(CP_SUCCESS_TXT);
    setTimeout(() => {
      setText(CP_TXT);
    }, 3000);
  }, []);
  return (
    <Button
      className="copy-btn"
      variant="outlined"
      size="small"
      onClick={() => {
        clipboard.write(props.onCopy());
        showSuccess();
      }}
      {...props}
    >
      {text}
    </Button>
  );
}

export function IconCopyBtn(props) {
  const [complate, setComplate] = React.useState(false);
  const showSuccess = React.useCallback(() => {
    setComplate(true);
    setTimeout(() => {
      setComplate(false);
    }, 5000);
  }, []);
  return (
    <Tooltip title={getText(complate)} arrow>
      <IconButton
        className="copy-btn"
        variant="outlined"
        size="small"
        onClick={() => {
          clipboard.write(props.onCopy());
          showSuccess();
        }}
        {...props}
      >
        {complate ? (
          <CheckRounded sx={{ color: "#1976d2" }} />
        ) : (
          <ContentCopyRounded />
        )}
      </IconButton>
    </Tooltip>
  );
}

function getText(complate) {
  return complate ? CP_SUCCESS_TXT : CP_TXT;
}
