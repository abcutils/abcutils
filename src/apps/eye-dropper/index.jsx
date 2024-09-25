import React from "react";
import { ReflexContainer, ReflexSplitter, ReflexElement } from "react-reflex";
import { styled } from "styled-components";
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

import {Icons} from '$src/components'
import { useStorgeState } from "$src/hooks";
import { isBrowser } from "$src/utils";

import IconButton  from "@mui/material/IconButton";


const EyeDropContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .inner{
    min-width: var(--min-width);
    padding: 10px 30px;
    text-align: center;
    background: var(--background-color-2);
    border: 1px solid var(--divider-color);
    border-radius: 15px;
    margin-top:5%;
  }
  .palette {
    position: relative;
      width: var(--min-width);
      padding: 10px 30px 30px 30px;
      display: flex;
      justify-content: space-around;
      border-radius: 15px;
      margin-top:40px;
      background: var(--background-color-2);
      border: 1px solid var(--divider-color);
      h1{
        position: absolute;
        font-size:12px;
        top:-30px;
        left:0px;
        line-height: 1em;
      }
      .swatch{
        position: relative;
        width: 100px;
        height: 100px;
        background-color: #000000;
        border-radius: 50%;
        margin:10px;
        span{
          position: absolute;
          bottom:-25px;
          width: 100%;
          text-align: center;
        }
      }
    }
`;

const DEFAULT_HISTORY_COLORS = ["#4285F4", "#FBBC05", '#646cff'];
export default function () {

  const [historyColors, setHistoryColors] = useStorgeState(DEFAULT_HISTORY_COLORS, "eye-dropper-history-color");
  const {loading, data = null, run} = useRequest(eyeDropperRequest, {
    manual:true,
    onSuccess(data){
      setHistoryColors([data.sRGBHex, ...historyColors].slice(0, 6))
    }
  })

  return (
    <ReflexContainer orientation="vertical">
      <ReflexElement flex={3}>
        <EyeDropContainer>
          <div className="inner">
            <h1>Eye Dropper</h1>
            <p>点击 Eye Dropper 按钮，选择屏幕内任何位置的颜色</p>
            <IconButton 
              loading={loading}
              block 
              sx={{padding:3, background:"var(--background-color)", border:"1px solid var(--divider-color)"}} 
              onClick={()=>{
                run()
              }} 
            >
              <Icons.EyeDropper size={72} ></Icons.EyeDropper>
            </IconButton>
            <p>已选择的颜色</p>
            <p>{data ? data.sRGBHex.toUpperCase() : "NONE"}</p>
          </div>
          <div className="palette">
            <h1>历史色值</h1>
            {
              historyColors.map((c)=>{
                return <div class="swatch" style={{backgroundColor: c}} >
                  <span>{c.toUpperCase()}</span>
                </div>
              })
            }
          </div>
        </EyeDropContainer>
      </ReflexElement>
    </ReflexContainer>
  );
}


function eyeDropperRequest(){
  if(isBrowser()){
    if(!window.EyeDropper){
      return new Promise((resolve, reject)=>{
        reject(new Error("当前浏览器不支持 EyeDropper API，推荐使用 Chrome"))
      })
    }
    return new EyeDropper().open()
  }
  return Promise.reject(new Error("请在浏览器环境使用此功能"))
}