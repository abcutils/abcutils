import React from "react";
import { renderToString } from "react-dom/server";
import { ServerStyleSheet } from "styled-components";
import App, { readmeRouters } from "./build/server/index.ssr.js";
import fs from "fs";
import path from "path";

function makeDirRecursive(dirPath) {
  if (!fs.existsSync(dirPath)) {
    makeDirRecursive(path.dirname(dirPath));
    fs.mkdirSync(dirPath);
  }
}

const indexPath = "./build/client/index.html";
const htmlTemplate = fs.readFileSync(indexPath).toString();

const index = { path: "/" };
const allRouters = [...readmeRouters, index];
allRouters.forEach(function ({ path }) {
  const sheet = new ServerStyleSheet();
  const html = renderToString(
    sheet.collectStyles(React.createElement(App, { url: path }))
  );

  const styles = sheet.getStyleTags();

  const newHtml = htmlTemplate
    .replace("<!--CSS-->", styles)
    .replace("<!--body-->", html);

  makeDirRecursive(`./build/client${path}`);
  fs.writeFileSync(`./build/client${path}/index.html`, newHtml);
  console.log("ssg done:", `./build/client${path}/index.html`);
});
