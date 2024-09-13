// 下载SVG
export function downloadSVGNode(
  svgNode,
  filename = "download",
  whiteSpace = 0
) {
  const svgData = new XMLSerializer().serializeToString(svgNode);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();
  img.onload = () => {
    canvas.width = img.width + whiteSpace * 2;
    canvas.height = img.height + whiteSpace * 2;
    ctx.drawImage(img, whiteSpace, whiteSpace);
    const pngFile = canvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.download = filename;
    downloadLink.href = `${pngFile}`;
    downloadLink.click();
  };
  img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
}

// 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) my-app/1.0.0 Chrome/128.0.6613.36 Electron/32.0.1 Safari/537.36'
export function isInElectronMacApp() {
  // return true;
  return isBrowser() && navigator.userAgent.indexOf("Electron/") > -1;
}

export function isBrowser() {
  return (
    typeof window !== "undefined" && typeof window.document !== "undefined"
  );
}

export default {
  isBrowser,
  downloadSVGNode,
  isInElectronMacApp,
};
