
import Editor from "@monaco-editor/react";
import useMediaQuery from '@mui/material/useMediaQuery';

export default function(props){
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  return <Editor {...props} theme={prefersDarkMode ? "vs-dark" : "light"} />
}