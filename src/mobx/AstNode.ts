import {
  types as t,
  IAnyModelType,
  Instance,
  SnapshotIn,
  SnapshotOut,
} from "mobx-state-tree";
import { Event, EventNames } from "../pages/WebEditor/event";
import { ElementType } from "../pages/WebEditor/RenderReactAst/ast";
import { StyleEnum } from "../pages/WebEditor/StyleEditor";

const AstNodePropsStyle = t.model("AstNodePropsStyle", {
  width: t.maybe(t.string),
  height: t.maybe(t.string),
  color: t.maybe(t.string),
  backgroundColor: t.maybe(t.string),
  position: t.maybe(t.string),
  top: t.maybe(t.string),
  right: t.maybe(t.string),
  bottom: t.maybe(t.string),
  left: t.maybe(t.string),
});

export type AstNodePropsStyleType = Instance<typeof AstNodePropsStyle>;
export type AstNodePropsStyleSnapshotInType = SnapshotIn<
  typeof AstNodePropsStyle
>;
export type AstNodePropsStyleSnapshotOutType = SnapshotOut<
  typeof AstNodePropsStyle
>;

const AstNodeProps = t.model("AstNodeProps", {
  style: t.optional(AstNodePropsStyle, {}),
});

export const AstNode = t
  .model("AstNode", {
    uuid: t.identifier,
    parent: t.maybe(t.reference(t.late((): IAnyModelType => AstNode))),
    type: t.enumeration([...Object.values(ElementType)]),
    events: t.optional(
      t.frozen<{
        onClick?: Event<EventNames>;
      }>({}),
      {}
    ),
    props: t.optional(AstNodeProps, {}),
    children: t.optional(t.array(t.late((): IAnyModelType => AstNode)), []),
    content: t.maybe(t.string),
  })
  .views((self) => ({
    get isPureTextNode() {
      return self.type === ElementType["pure-text"];
    },
  }))
  .actions((self) => ({
    updateStyle({
      styleKey,
      styleValue,
    }: {
      styleKey: StyleEnum;
      styleValue: string;
    }) {
      self.props.style[styleKey] = styleValue;
    },
  }));

export type AstNodeType = Instance<typeof AstNode>;
export type AstNodeSnapshotInType = SnapshotIn<typeof AstNode>;
export type AstNodeSnapshotOutType = SnapshotOut<typeof AstNode>;
