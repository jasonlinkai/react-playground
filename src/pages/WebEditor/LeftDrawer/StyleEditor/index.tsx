import "./index.css";
import { observer } from "mobx-react-lite";
import { useStores } from "../../../../storages/mobx/useMobxStateTreeStores";
import { AstNodeModelType } from "../../../../storages/mobx/AstNodeModel";
import { StyleEnum } from "../../types";
import AstTagTreePanel from "./components/AstTagTreePanel";

const styleKeys: StyleEnum[] = [...Object.values(StyleEnum)];

const NormalText = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="style-editor-form-item">
      {label}:<span>{value}</span>
    </div>
  );
};

const NormalSelect = ({
  label,
  value,
  onChange,

  options = [],
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options?: { label: string; value: string }[];
}) => {
  return (
    <div className="style-editor-form-item">
      <label className="style-editor-form-item__label">{label}</label>
      <select
        className="style-editor-form-item__select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

const NormalInput = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) => {
  return (
    <div className="style-editor-form-item">
      <label className="style-editor-form-item__label">{label}</label>
      <input
        className="style-editor-form-item__input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

const renderConfigs = {
  [StyleEnum.width]: {
    styleKey: StyleEnum.width,
    props: {},
    Component: NormalInput,
  },
  [StyleEnum.height]: {
    styleKey: StyleEnum.height,
    props: {},
    Component: NormalInput,
  },
  [StyleEnum.color]: {
    styleKey: StyleEnum.color,
    props: {},
    Component: NormalInput,
  },
  [StyleEnum.backgroundColor]: {
    styleKey: StyleEnum.backgroundColor,
    props: {},
    Component: NormalInput,
  },
  [StyleEnum.position]: {
    styleKey: StyleEnum.position,
    props: {
      options: [
        { label: "static", value: "static" },
        { label: "relative", value: "relative" },
        { label: "absolute", value: "absolute" },
        { label: "fixed", value: "fixed" },
        { label: "sticky", value: "sticky" },
      ],
    },
    Component: NormalSelect,
  },
  [StyleEnum.top]: {
    styleKey: StyleEnum.top,
    props: {},
    Component: NormalInput,
  },
  [StyleEnum.right]: {
    styleKey: StyleEnum.right,
    props: {},
    Component: NormalInput,
  },
  [StyleEnum.bottom]: {
    styleKey: StyleEnum.bottom,
    props: {},
    Component: NormalInput,
  },
  [StyleEnum.left]: {
    styleKey: StyleEnum.left,
    props: {},
    Component: NormalInput,
  },
};

const StyleEditor = observer(() => {
  const { editor } = useStores();
  const { selectedAstNode } = editor;
  const node = selectedAstNode as AstNodeModelType;

  const saveAst = () => {
    node.save();
  };

  if (!node) {
    return <div style={{ color: "white" }}>請先選擇節點 </div>;
  }

  return (
    <div className="style-editor">
      <NormalText label={"uuid"} value={node.uuid} />
      <NormalText label={"parent"} value={node?.parent?.uuid || ""} />
      {styleKeys.map((styleKey) => {
        const { Component, props } = renderConfigs[styleKey];
        return (
          <Component
            key={styleKey}
            label={styleKey}
            value={`${node.editingStyle[styleKey] || ""}`}
            onChange={(v) => {
              node.updateEditingStyle({ styleKey, styleValue: v });
            }}
            {...props}
          />
        );
      })}
      {node.isPureTextNode && (
        <NormalInput
          label="content"
          value={node.editingContent || ''}
          onChange={(v) => {
            node.setEditingContent(v);
          }}
        ></NormalInput>
      )}
      <button onClick={saveAst}>save</button>
      <AstTagTreePanel root={node} />
    </div>
  );
});

export default StyleEditor;
