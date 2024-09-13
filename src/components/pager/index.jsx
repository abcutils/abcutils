import React from "react";
import classnames from "classnames";
import Button from "@mui/material/Button";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useStorgeState } from "$src/hooks";

import "./index.less";

const PAGER_ALIGN_CLASSMAP = {
  left: "align-left",
  center: "align-center",
  right: "align-right",
  justify: "align-justify",
};
function Pager(props) {
  const size = props.size || "A4";
  const id = props.id || size;
  const [align, setAling] = useStorgeState("left", id);

  return (
    <div className="default-paper">
      <div className="default-paper-operation">
        {/* <Button variant="outlined" size="small" sx={{ marginRight: 1 }}>
          打印页面
        </Button> */}
        <ToggleButtonGroup
          value={align}
          exclusive
          onChange={(_, aling) => setAling(aling)}
          aria-label="text alignment"
          size="small"
        >
          <ToggleButton value="left" aria-label="left aligned">
            <FormatAlignLeftIcon sx={{ fontSize: 12 }} />
          </ToggleButton>
          <ToggleButton value="center" aria-label="centered">
            <FormatAlignCenterIcon sx={{ fontSize: 12 }} />
          </ToggleButton>
          <ToggleButton value="right" aria-label="right aligned">
            <FormatAlignRightIcon sx={{ fontSize: 12 }} />
          </ToggleButton>
          <ToggleButton value="justify" aria-label="justified">
            <FormatAlignJustifyIcon sx={{ fontSize: 12 }} />
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div
        {...props}
        className={classnames(
          "default-paper-container",
          size,
          props.className,
          PAGER_ALIGN_CLASSMAP[align]
        )}
      ></div>
    </div>
  );
}

function A3(props) {
  return <Pager size="A3" {...props}></Pager>;
}

function A4(props) {
  return <Pager size="A4" {...props}></Pager>;
}

function A5(props) {
  return <Pager size="A5" {...props}></Pager>;
}

export default {
  Pager,
  A3,
  A4,
  A5,
};
