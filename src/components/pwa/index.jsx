import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ReplayCircleFilledIcon from "@mui/icons-material/ReplayCircleFilled";
import { LoadingButton } from "$src/components";
// #if [__INCLUDING_PWA__]
import { registerSW } from "virtual:pwa-register";
// #endif
// import { isInElectronMacApp } from "$src/utils";

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
        // if (isInElectronMacApp()) {
        setHasUpdate(true);
        // } else {
        //   // 自动更新
        //   updateSWRef
        //     .current()
        //     .then(() => {
        //       console.log("自动更新成功");
        //     })
        //     .catch((e) => {
        //       console.log("pwa 更新失败", e);
        //     });
        // }
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
          <Dialog
            open={showDialog}
            maxWidth="sm"
            onClose={() => setShowDialog(false)}
          >
            <DialogTitle>有新版本可以更新啦</DialogTitle>
            <DialogContent>
              请确保互联网访问畅通， 更新大约会下载 5~10M 的数据。
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowDialog(false)}>取消</Button>
              <LoadingButton
                onClick={() => {
                  return updateSWRef
                    .current()
                    .then(() => {
                      setShowDialog(false);
                      console.log("更新成功");
                    })
                    .catch((e) => {
                      console.log(e);
                    });
                }}
                variant="contained"
              >
                更新
              </LoadingButton>
            </DialogActions>
          </Dialog>
        </>
      ) : null}
    </>
  );
}
