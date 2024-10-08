import React from "react";
import { isBrowser } from "$src/utils";

// useStorgeState(defaultValue, storgeKey, firstValue)
export default function useStorgeState(defaultValue, storgeKey, firstValue) {
  // 首次渲染，优先使用 firstValue
  const [value, setValue] = React.useState(function(){
    if(firstValue !== undefined && firstValue !== null) {
      return firstValue
    }
    return getStorge(storgeKey, defaultValue);
  });
  const newSetValue = React.useCallback(
    (v) => {
      setValue(v);
      setStorge(storgeKey, v);
    },
    [setValue]
  );
  return [value, newSetValue];
}

function setStorge(storgeKey, v) {
  if (isBrowser()) {
    if (typeof v === "string") {
      localStorage.setItem(storgeKey, v);
    } else {
      localStorage.setItem(storgeKey, JSON.stringify(v));
    }
  }
}

function getStorge(storgeKey, defaultValue) {
  if (isBrowser()) {
    const storgeValue = window.localStorage.getItem(storgeKey);
    if (storgeValue === null) {
      return defaultValue;
    }
    return toDefaultValueType(defaultValue, storgeValue);
  }
  return defaultValue;
}

function toDefaultValueType(defaultValue, value) {
  const typeStr = Object.prototype.toString.call(defaultValue);
  if (typeStr === "[object Number]") {
    return Number(value);
  }

  if (typeStr === "[object Object]" || typeStr === "[object Array]") {
    return JSON.parse(value);
  }

  if (typeStr === "[object Boolean]") {
    return { false: false, true: true }[value];
  }

  return String(value);
}
