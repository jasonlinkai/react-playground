import { types as t, IAnyModelType } from "mobx-state-tree";
import { Event, EventNames } from "../pages/WebEditor/event";
import { ElementType } from "../pages/WebEditor/RenderReactAst/ast";

export const AstNode = t.model("AstNode", {
  uuid: t.identifier,
  parent: t.maybe(
    t.reference(t.late((): IAnyModelType => AstNode))
  ),
  type: t.enumeration([...Object.values(ElementType)]),
  events: t.optional(
    t.frozen<{
      onClick?: Event<EventNames>;
    }>({}),
    {}
  ),
  children: t.optional(
    t.array(t.late((): IAnyModelType => AstNode)),
    []
  ),
});

// 使用模型创建根节点
// const RootNode: TreeNodeType = AstNode.create(rootAstNode);

// console.log('RootNode', RootNode);
