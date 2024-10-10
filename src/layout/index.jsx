import React from "react";
import { useOutlet, Link, useLocation } from "react-router-dom";
import { AiOutlineBarcode } from "react-icons/ai";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import {
  Transform,
  Fingerprint,
  QrCode,
  Compress,
  ContentCut,
  StarOutlineRounded,
  StarRateRounded,
} from "@mui/icons-material";

import { styled } from "styled-components";
import { useStorgeState } from "$src/hooks";
import { isBrowser, isInElectronMacApp } from "$src/utils";
import { Logo, PWA, Baffle, Icons } from "$src/components";

const _isInElectronMacApp = isInElectronMacApp();

const MacAppTitleBar = styled.div`
  position: absolute;
  width: 100%;
  height: ${({ $display }) => ($display ? "30px" : 0)};
  top: 0;
  z-index: 1000;
  -webkit-app-region: drag;
  &:hover {
    background-color: #e5e5e52b;
  }
`;

const AppLayout = styled.div`
  display: flex;
  min-height: 100vh;
  min-width: 100vw;
  .content-split-line {
    width: 0px;
    position: relative;
    z-index: 1;
    &:hover {
      box-shadow: 0 0 3px 1px var(--divider-color);
    }
    .silder-toggle-btn {
      position: absolute;
      top: 40%;
      z-index: 2;
    }
  }
  .right-content {
    width: 100vw;
  }
`;

const SildeWidth = "300px";
const Silder = styled.div`
  position: relative;
  width: ${({ $display }) => ($display ? SildeWidth : 0)};
  border-right: 1px solid  var(--divider-color);
  background-color: var(--background-color-2);
  height: 100vh;
  overflow: hidden;
  z-index: 2;
  .my-utils-title {
    font-size: 15px;
    margin-left: 20px;
    margin-top: 0;
    margin-bottom: 0;
  }
  .nav-list {
    height: calc(100vh - 140px);
    overflow: auto;
    .MuiListItem-root {
      .like-btn {
        display: none;
      }

      &:hover {
        .like-btn {
          display: inline-flex;
        }
      }
    }
  }
  .nav-footer-bar {
    min-height: 70px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    .website {
      /* color: #000000; */
      box-sizing: border-box;
      &:hover {
        border-bottom: 1px solid #000000;
      }
    }
    .version {
      display: flex;
      align-items: center;
      font-size: 12px;
    }
  }
`;

const BodyContent = styled.div`
  width: ${({ $display }) => {
    return $display ? `calc(100vw - ${SildeWidth})` : `calc(100vw - 0px)`;
  }};
  .vertical.reflex-element {
    box-sizing: border-box;
    padding: ${_isInElectronMacApp ? "30px 20px" : "10px 20px"};
    max-height:100vh;
  }
  .input-title,
  .output-title {
    margin-bottom: 5px;
    min-height: 2em;
    .title {
      font-weight: 700;
    }
    .operation {
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
    }
  }
`;

const NavSearch = styled.div`
  min-height: 70px;
  padding: 0 10px;
  padding-top: ${_isInElectronMacApp ? "20px" : ""};
  box-sizing: border-box;
`;

export const NAV_LIST = [
  {
    text: "JSON 格式化/压缩",
    path: "/apps/json",
    icon: <Icons.JSON size="24" />,
  },
  {
    text: "XML 格式化/压缩",
    path: "/apps/xml",
    icon: <Icons.XML size="24" />,
  },
  {
    text: "HTML 格式化/压缩",
    path: "/apps/html",
    icon: <Icons.HTML size="24" />,
  },
  {
    text: "CSS 格式化/压缩",
    path: "/apps/css",
    icon: <Icons.CSS size="24" />,
  },
  {
    text: "JS 格式化/压缩",
    path: "/apps/javascript",
    icon: <Icons.JS size="24" />,
  },
  {
    text: "SQL 格式化",
    path: "/apps/sql",
    icon: <Icons.SQL size="24" />,
  },
  {
    text: "JSON 转 XML",
    path: "/apps/json-to-xml",
    icon: <Transform size="24" />,
  },
  {
    text: "ASCII 转 Hex",
    path: "/apps/ascii2hex",
    icon: <Transform size="24" />,
  },
  {
    text: "Hex 转 ASCII",
    path: "/apps/hex2ascii",
    icon: <Transform size="24" />,
  },
  {
    text: "正则表达式",
    path: "/apps/regexp",
    icon: <Icons.RegExp size="24" />,
  },
  {
    text: "条形码生成",
    path: "/apps/barcode",
    icon: <AiOutlineBarcode size="24" />,
  },
  {
    text: "二维码生成",
    path: "/apps/qrcode",
    icon: <QrCode size="24" />,
  },
  {
    text: "MD5 生成",
    path: "/apps/md5",
    icon: <Fingerprint size="24" />,
  },
  {
    text: "文件 MD5 值",
    path: "/apps/md5-files",
    icon: <Fingerprint size="24" />,
  },
  {
    text: "Base64 编码/解码",
    path: "/apps/base64",
    icon: <Fingerprint size="24" />,
  },
  {
    text: "文件 Base64 编码",
    path: "/apps/base64-files",
    icon: <Fingerprint size="24" />,
  },
  {
    text: "SHA256 生成",
    path: "/apps/sha256",
    icon: <Fingerprint size="24" />,
  },
  {
    text: "UUID 生成",
    path: "/apps/uuid",
    icon: <Fingerprint size="24" />,
  },{
    text: "屏幕颜色提取",
    path: "/apps/eye-dropper",
    icon: <Icons.EyeDropper size="24" />,
  },
  {
    text: "图片裁剪",
    path: "/apps/image-crop",
    icon: <ContentCut size="24" />,
  },
  {
    text: "图片压缩",
    path: "/apps/image-compress",
    icon: <Compress size="24" />,
  },
];

export default function () {
  const location = useLocation();
  const [sidebarDisplay, setSidebarDisplay] = useStorgeState(true, "abcutils-sidebar-display", getDefaultSidebarDisplay());
  const [searchKey, setSearchKey] = React.useState();
  const { apps, hasLike, toggleLikePath } = useSortLikeApps(NAV_LIST);

 
  return (
    <>
      <Baffle></Baffle>
      <MacAppTitleBar $display={_isInElectronMacApp}></MacAppTitleBar>
      <AppLayout>
        <Silder $display={sidebarDisplay}>
          <NavSearch>
            <TextField
              fullWidth
              label="搜索工具"
              type="search"
              variant="outlined"
              size="small"
              sx={{ borderRadius: 10, marginTop: 2 }}
              onChange={(e) => setSearchKey(e.target.value)}
            />
          </NavSearch>
          <nav className="nav-list">
            <List disablePadding={false}>
              {filterUtils(apps, searchKey).map((navItem) => {
                return (
                  <ListItem
                    key={navItem.path}
                    disablePadding
                    secondaryAction={
                      <IconButton
                        className={!hasLike(navItem.path) ? "like-btn" : ""}
                        onClick={() => {
                          toggleLikePath(navItem.path);
                        }}
                      >
                        {hasLike(navItem.path) ? (
                          <StarRateRounded sx={{ color: "#44add5" }} />
                        ) : (
                          <StarOutlineRounded />
                        )}
                      </IconButton>
                    }
                  >
                    <ListItemButton
                      component={Link}
                      to={navItem.path}
                      selected={navItem.path === location.pathname}
                    >
                      <ListItemIcon
                        style={{ minWidth: "auto", marginRight: 10 }}
                      >
                        {navItem.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={navItem.text}
                        sx={{ fontSize: 12 }}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </nav>
          <div className="nav-footer-bar">
            <a className="website" href="https://abcutils.com" target="_blank">
              <Logo size="20" /> Utils.com
            </a>
            <div className="version">
              <PWA />
            </div>
          </div>
        </Silder>
        <div className="content-split-line">
          <div className="silder-toggle-btn">
            <IconButton
              sx={{ padding: "20px 0", borderRadius: 0, marginLeft: "-5px" }}
              onClick={() => setSidebarDisplay(!sidebarDisplay)}
            >
              <NavigateBeforeIcon></NavigateBeforeIcon>
            </IconButton>
          </div>
        </div>
        <BodyContent $display={sidebarDisplay}>{useOutlet()}</BodyContent>
      </AppLayout>
    </>
  );
}

// like apps

function useSortLikeApps(navList) {
  const [likes, setLikes] = useStorgeState([], "my-like-apps");
  const setMapLikes = new Set(likes);
  const sortedApps = [
    ...navList.filter((item) => {
      return setMapLikes.has(item.path);
    }),
    ...navList.filter((item) => {
      return !setMapLikes.has(item.path);
    }),
  ];

  return {
    apps: sortedApps,
    hasLike(path) {
      return setMapLikes.has(path);
    },
    toggleLikePath(appPath) {
      if (setMapLikes.has(appPath)) {
        setMapLikes.delete(appPath);
      } else {
        setMapLikes.add(appPath);
      }
      setLikes(Array.from(setMapLikes));
    },
  };
}

function filterUtils(utilsList, filterKey) {
  if (filterKey) {
    return utilsList.filter((item) => {
      return (
        item.text.indexOf(filterKey.toLowerCase()) > -1 ||
        item.text.indexOf(filterKey.toUpperCase()) > -1
      );
    });
  }
  return utilsList;
}


function getDefaultSidebarDisplay(){
  // 如果屏幕宽度小于1024默认隐藏
  if(isBrowser()){
    if(window.innerWidth < 1300){
      return false
    }
    return location.search.indexOf("mode=import") > -1 ? false : undefined;
  }
  return undefined;
}