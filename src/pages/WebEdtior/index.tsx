import "./webEditor.css";
import { useState } from "react";
import Drawer from "./Drawer";
import RenderReactAST from "./RenderReactAst";
import type { AstElement } from "./RenderReactAst/ast";
import { EventNames } from "./event";

const rootAstNode: AstElement = {
  uuid: "1",
  parentUuid: "root",
  type: "div",
  props: {
    key: "key_1",
    className: "container",
  },
  events: {
    onClick: {
      type: EventNames.NAVIGATE,
      payload: { path: "/about!" },
    },
  },
  children: [
    {
      uuid: "2",
      parentUuid: "1",
      type: "button",
      props: {
        key: "key_2",
        style: {
          color: "blue",
        },
      },
      events: {
        onClick: {
          type: EventNames.NAVIGATE,
          payload: { path: "/test!" },
        },
      },
      children: [
        {
          uuid: "3",
          parentUuid: "2",
          innerType: "inner-text",
          content: "Click me",
        },
      ],
    },
  ],
};

const WebEditor: React.FC = () => {
  const [ast] = useState<AstElement>(rootAstNode);
  const [selectedAstElement, setSelectedAstElement] =
    useState<AstElement | null>(null);
  return (
    <div id="web-editor">
      <Drawer selectedAstElement={selectedAstElement} />
      <RenderReactAST ast={ast} setSelectedAstElement={setSelectedAstElement} />
    </div>
  );
};

export default WebEditor;
