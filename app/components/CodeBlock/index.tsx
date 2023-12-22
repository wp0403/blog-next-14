"use client";
import React, { useEffect } from "react";
import hljs from "highlight.js";

const CodeBlock = ({ language, children }) => {
  useEffect(() => {
    // 重新渲染前取消所有dataset.highlighted
    const highlightedElements = document.querySelectorAll(".hljs");
    highlightedElements.forEach((element: any) => {
      if(element.dataset){
        delete element.dataset.highlighted
      }
    });
    // 页面加载完成
    hljs.configure({
      ignoreUnescapedHTML: true,
      throwUnescapedHTML: false,
    });
    // 高亮所有代码块
    hljs.highlightAll();
  }, []);

  return <code className={language}>{children}</code>;
};

export default CodeBlock;
