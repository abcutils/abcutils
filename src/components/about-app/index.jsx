import React from "react";
import BrightnessAutoIcon from "@mui/icons-material/BrightnessAuto";
import CloseIcon from "@mui/icons-material/Close";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "styled-components";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import './github-markdown.css'

import "./index.less";

export default function ({ readme }) {
  const [display, setDisplay] = React.useState(false);
  return (
    <div className="about-app">
      <div className="about-icon">
        <Tooltip title="工具介绍" arrow>
          <IconButton onClick={() => setDisplay(!display)}>
            <BrightnessAutoIcon />
          </IconButton>
        </Tooltip>
      </div>

      {display ? (
        <DialogAbout readme={readme} onClose={() => setDisplay(false)} />
      ) : null}
    </div>
  );
}

const ReactMarkdownLayout = styled(ReactMarkdown)`
  h1 {
    font-size: 1.4em;
    margin: 0.3em 0;
  }
`;

function DialogAbout({ readme, onClose }) {
  return (
    <Dialog open={true} maxWidth="lg" onClose={onClose}>
      <DialogTitle>介绍</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <ReactMarkdownLayout className="markdown-body" remarkPlugins={[remarkGfm]}>{readme}</ReactMarkdownLayout>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>关闭</Button>
      </DialogActions>
    </Dialog>
  );
}
