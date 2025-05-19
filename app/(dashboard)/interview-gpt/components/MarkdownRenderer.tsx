'use client';

import React, { FC } from 'react';
import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import CodeBlock from './CodeBlock';
import { MarkdownRendererProps } from '../types';

const MarkdownRenderer: FC<MarkdownRendererProps> = (props) => {
  const components: Components = {
    p({ children }) {
      return <p className="mb-2 last:mb-0">{children}</p>;
    },
    // @ts-expect-error - React Markdown types are complex
    code({ inline, className, children, ...props }) {
      const childrenArray = React.Children.toArray(children);
      if (childrenArray.length > 0) {
        if (childrenArray[0] === "▍") {
          return (
            <span className="mt-1 cursor-default animate-pulse">▍</span>
          );
        }

        if (typeof childrenArray[0] === 'string') {
          childrenArray[0] = childrenArray[0].replace("`▍`", "▍");
        }
      }

      const match = /language-(\w+)/.exec(className || "");

      if (inline) {
        return (
          <code className={className} {...props}>
            {children}
          </code>
        );
      }

      return (
        <CodeBlock
          key={Math.random()}
          language={(match && match[1]) || ""}
          value={String(children).replace(/\n$/, "")}
          {...props}
        />
      );
    },
  };

  return (
    <div className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        components={components}
      >
        {props.children}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer; 