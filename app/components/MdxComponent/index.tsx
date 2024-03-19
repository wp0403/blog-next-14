"use client";
import Link from "next/link";
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Image, message } from "antd";
import React, { useMemo, useEffect } from "react";
import { useGetState } from "ahooks";
import CodeBlock from "@components/CodeBlock";

export default function useMdx(props: MDXRemoteProps) {
  const [tocList, setTocList, getTocList] = useGetState<any[]>([]);
  const handleCopy = () => {
    message.success("复制成功");
  };

  // 将标题内容转换成id时可以用的字符串
  const generateUniqueId = (text = "") => {
    if (typeof text !== "string") {
      return "";
    }
    // 将文本转换为小写，去除空格，并使用一种哈希函数生成数字
    const hash = text
      .trim()
      .toLowerCase()
      .replace(/\s/g, "")
      .split("")
      .reduce(function (acc, char) {
        return acc + char.charCodeAt(0);
      }, 0);

    // 使用前缀加上哈希值，以确保唯一性
    const uniqueId = "anchor_" + hash;

    return uniqueId;
  };

  // 生成唯一id
  const generateHeadingId = (string, level) => {
    return generateUniqueId(string) + "-" + level;
  };

  const flag =
    typeof window !== "undefined"
      ? document.querySelector(".markdown_body")?.innerHTML
      : "";

  useEffect(() => {
    const list = document.querySelectorAll(".markdown-toc-item");

    const newList = Array.from(list).map((v: any) => {
      return {
        id: v.id,
        title: v.innerText,
        i: v.nodeName.split("")[1],
      };
    });

    setTocList(newList);
  }, [flag]);

  const renderTitle = (node, type) => {
    const newChlidren = Array.isArray(node.children)
      ? node.children[0]
      : node.children;
    const id = generateHeadingId(newChlidren, type);
    switch (type) {
      case 1:
        return (
          <h1 className="markdown-toc-item" id={id}>
            {newChlidren}
          </h1>
        );
      case 2:
        return (
          <h2 className="markdown-toc-item" id={id}>
            {newChlidren}
          </h2>
        );
      case 3:
        return (
          <h3 className="markdown-toc-item" id={id}>
            {newChlidren}
          </h3>
        );
      case 4:
        return (
          <h4 className="markdown-toc-item" id={id}>
            {newChlidren}
          </h4>
        );
      case 5:
        return (
          <h5 className="markdown-toc-item" id={id}>
            {newChlidren}
          </h5>
        );
      case 6:
        return (
          <h6 className="markdown-toc-item" id={id}>
            {newChlidren}
          </h6>
        );
    }
  };

  const markdownHtml = useMemo(
    () => (
      <div className="markdown_body">
        <Image.PreviewGroup>
          <MDXRemote
            {...props}
            components={{
              h1: (node: any) => renderTitle(node, 1),
              h2: (node: any) => renderTitle(node, 2),
              h3: (node: any) => renderTitle(node, 3),
              h4: (node: any) => renderTitle(node, 4),
              h5: (node: any) => renderTitle(node, 5),
              h6: (node: any) => renderTitle(node, 6),
              code({ className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return (
                  <>
                    {match && match[1] && (
                      <div className="code_copy">
                        <div className="code_language">{match[1]}</div>
                        <CopyToClipboard
                          text={String(children).replace(/\n$/, "")}
                          onCopy={handleCopy}
                        >
                          <div className="code_btn">复制代码</div>
                        </CopyToClipboard>
                      </div>
                    )}
                    <CodeBlock language={match && match[1] ? match[1] : ""}>
                      {String(children).replace(/\n$/, "")}
                    </CodeBlock>
                  </>
                );
              },
              img({ src, alt }) {
                return (
                  <Image
                    className={"blog_img"}
                    src={src}
                    alt={alt}
                    rootClassName={"blog_img"}
                  />
                );
              },
              a({ href, children }) {
                if (RegExp("#").test(href || "")) {
                  return <a href={href}>{children}</a>;
                }
                return (
                  <Link
                    href={href as any}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                  >
                    {children}
                  </Link>
                );
              },
              p({ children }) {
                return <div className="tagName-p">{children}</div>;
              },
            }}
          />
        </Image.PreviewGroup>
      </div>
    ),
    [props]
  );

  const tocDom = useMemo(() => {
    let list: any[] = getTocList().map((v) => v.i);
    list = [...new Set(list)].sort((a, b) => a - b);

    return (
      <>
        {getTocList().map((v) => {
          return (
            <div
              className={`toc-item toc-item${list.findIndex(
                (val) => val == v.i
              )}`}
              key={v.id}
              onClick={() => {
                const top = document.getElementById(v.id)?.offsetTop || 0;
                document.body.scrollTo({
                  left: 0,
                  top: top - 80,
                  behavior: "smooth",
                });
              }}
            >
              <span>{v.title}</span>
            </div>
          );
        })}
      </>
    );
  }, [tocList]);

  return {
    tocDom,
    markdownHtml,
  };
}
