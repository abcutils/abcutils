import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ReplayCircleFilledIcon from "@mui/icons-material/ReplayCircleFilled";
import { LoadingButton } from "$src/components";
// #if [__INCLUDING_PWA__]
import { registerSW } from "virtual:pwa-register";
// #endif

// 新版本提示
export default function () {
  const updateSWRef = React.useRef();
  const [showDialog, setShowDialog] = React.useState(false);
  const [hasUpdate, setHasUpdate] = React.useState(false);

  // #if [__INCLUDING_PWA__]
  React.useEffect(() => {
    console.log("registerSW");
    updateSWRef.current = registerSW({
      onNeedRefresh() {
        setHasUpdate(true);
      },
      onOfflineReady() {
        console.log("应用离线成功");
      },
    });
  }, []);
  // #endif

  return (
    <>
      <span>{__APP_VERSION__}</span>
      {hasUpdate ? (
        <>
          <Tooltip title="有新版本，点击更新" arrow>
            <IconButton onClick={() => setShowDialog(true)}>
              <ReplayCircleFilledIcon
                fontSize="small"
                sx={{ color: "#09ca81" }}
              />
            </IconButton>
          </Tooltip>
          <Snackbar
            open={showDialog}
            maxWidth="sm"
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
            onClose={() => setShowDialog(false)}
          >
            <Alert
              severity="success"
              action={
                <LoadingButton
                  size="small"
                  variant="contained"
                  onClick={() => {
                    updateSWRef
                      .current()
                      .then(() => {
                        setShowDialog(false);
                        console.log("更新成功");
                      })
                      .catch((e) => {
                        console.log(e);
                      });
                  }}
                >
                  更新
                </LoadingButton>
              }
            >
              新版本已就绪，点击“更新”按钮切换到新版本
            </Alert>
          </Snackbar>
        </>
      ) : null}
    </>
  );
}
