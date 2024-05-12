import {
  types as t,
  IAnyModelType,
  Instance,
  SnapshotIn,
  SnapshotOut,
  detach,
} from "mobx-state-tree";
import { Event, EventNames } from "../../utils/event";
import { ElementType } from "../../pages/WebEditor/types";
import { StyleEnum } from "../../pages/WebEditor/types";

const AstNodeModelPropsStyle = t.model("AstNodeModelPropsStyle", {
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

export type AstNodeModelPropsStyleType = Instance<
  typeof AstNodeModelPropsStyle
>;
export type AstNodeModelPropsStyleSnapshotInType = SnapshotIn<
  typeof AstNodeModelPropsStyle
>;
export type AstNodeModelPropsStyleSnapshotOutType = SnapshotOut<
  typeof AstNodeModelPropsStyle
>;

const AstNodeModelProps = t.model("AstNodeModelProps", {
  className: t.optional(t.string, ""),
  style: t.optional(AstNodeModelPropsStyle, {}),
});

export const AstNodeModel = t
  .model("AstNodeModel", {
    uuid: t.identifier,
    parent: t.maybe(t.reference(t.late((): IAnyModelType => AstNodeModel))),
    type: t.enumeration([...Object.values(ElementType)]),
    events: t.optional(
      t.frozen<{
        onClick?: Event<EventNames>;
      }>({}),
      {}
    ),
    props: t.optional(AstNodeModelProps, {}),
    children: t.optional(
      t.array(t.late((): IAnyModelType => AstNodeModel)),
      []
    ),
    content: t.maybe(t.string),
  })
  .volatile<{
    isSelected: boolean;
    isDragOvered: boolean;
    editingStyle: Partial<SnapshotOut<AstNodeModelPropsStyleType>>;
  }>(() => ({
    isSelected: false,
    isDragOvered: false,
    editingStyle: {},
  }))
  .views((self) => ({
    get isRootNode() {
      return self.parent === undefined;
    },
    get isPureTextNode() {
      return self.type === ElementType["pure-text"];
    },
  }))
  .actions((self) => ({
    setParent(uuid: string) {
      self.parent = uuid;
    },
    setIsSelected(v: boolean) {
      self.isSelected = v;
    },
    setIsDragOvered(v: boolean) {
      self.isDragOvered = v;
    },
    save() {
      self.props.style = AstNodeModelPropsStyle.create(self.editingStyle);
    },
    setEditingStyle(
      editingStyle: Partial<SnapshotOut<AstNodeModelPropsStyleType>>
    ) {
      self.editingStyle = editingStyle;
    },
    updateEditingStyle({
      styleKey,
      styleValue,
    }: {
      styleKey: StyleEnum;
      styleValue: string;
    }) {
      self.editingStyle = {
        ...self.editingStyle,
        [styleKey]: styleValue,
      };
    },
    addChild(child: any) {
      child.setParent(self.uuid);
      self.children.push(child);
      return child;
    },
    removeChild(uuid: any) {
      const childIndex = self.children.findIndex((child) => child.uuid === uuid);
      const child = self.children[childIndex];
      detach(child);
    },
  }));

export type AstNodeModelType = Instance<typeof AstNodeModel>;
export type AstNodeModelSnapshotInType = SnapshotIn<typeof AstNodeModel>;
export type AstNodeModelSnapshotOutType = SnapshotOut<typeof AstNodeModel>;
