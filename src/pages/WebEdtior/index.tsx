import "./webEditor.css"
import { useState } from "react";
import Drawer from "./Drawer";
import RenderReactAST from "./RenderReactAst";
import type { AstElement } from "./RenderReactAst";

// Define your AST
const defaultAst: AstElement = {
  id: "1",
  type: "div",
  props: {
    key: "key_1",
    className: "container",
  },
  children: [
    {
      id: "2",
      type: "button",
      props: {
        key: "key_2",
        style: {
          color: 'blue',
        },
      },
      children: ["Click me"],
    },
  ],
};

const WebEditor: React.FC = () => {
  const [ast] = useState<AstElement>(defaultAst);
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
