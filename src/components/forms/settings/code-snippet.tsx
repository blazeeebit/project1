"use client";
import { Copy } from "lucide-react";
import React from "react";
import { Section } from "../../section-label";

type CodeSnippetProps = {
  id: string;
};

export const CodeSnippet = ({ id }: CodeSnippetProps) => {
  let snippet = `
const iframe = document.createElement("iframe");

const iframeStyles = (styleString) => {
const style = document.createElement('style');
style.textContent = styleString;
document.head.append(style);
}

iframeStyles('
    .chat-frame {
        position: fixed;
        bottom: 50px;
        right: 50px;
        border: none;
    }
')

iframe.src = "http://localhost:3000/chatbot"
iframe.classList.add('chat-frame')
document.body.appendChild(iframe)

window.addEventListener("message", (e) => {
    if(e.origin !== "http://localhost:3000/") return null
    let dimensions = JSON.parse(e.data)
    iframe.width = dimensions.width
    iframe.height = dimensions.height
    iframe.contentWindow.postMessage("${id}", "http://localhost:3000/")
})
    `;
  return (
    <div className="mt-10 flex flex-col gap-5 items-start">
      <Section
        label="Code snippet"
        message="Copy and paste this code snippet into the header tag of your website"
      />
      <div className="bg-muted px-10 rounded-lg inline-block relative">
        <Copy
          className="absolute top-5 right-5 text-gray-400 cursor-pointer"
          onClick={() => {
            navigator.clipboard.writeText(snippet);
          }}
        />
        <pre>
          <code className="text-gray-500">{snippet}</code>
        </pre>
      </div>
    </div>
  );
};
