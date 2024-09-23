import React from "react";
import Button from "@mui/material/Button";
import clipboard from "clipboardy";

const CP_TXT = "贴入";
const CP_SUCCESS_TXT = "成功";

// <Paste onPaste={()=> "hello world"} text="贴入" />

export default function (props) {
  const [text, setText] = React.useState(props.text || CP_TXT);
  const showSuccess = React.useCallback(() => {
    setText(CP_SUCCESS_TXT);
    setTimeout(() => {
      setText(CP_TXT);
    }, 3000);
  }, []);
  return (
    <Button
      variant="outlined"
      size="small"
      onClick={() => {
        clipboard.read().then(props.onPaste);
        showSuccess();
      }}
      {...props}
    >
      {text}
    </Button>
  );
}
