import "./styleEditor.css";
import { useMemo } from "react";
import { useAst } from "../AstProvider";

enum StyleEnum {
  width = "width",
  height = "height",
  color = "color",
  backgroundColor = "backgroundColor",
  position = "position",
}

const styleKeys: StyleEnum[] = [
  StyleEnum.width,
  StyleEnum.height,
  StyleEnum.color,
  StyleEnum.backgroundColor,
  StyleEnum.position,
];

const NormalText = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="style-editor-row">
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
    <div className="style-editor-row">
      {label}:
      <select value={value} onChange={(e) => onChange(e.target.value)}>
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
    <div className="style-editor-row">
      {label}:
      <input value={value} onChange={(e) => onChange(e.target.value)} />
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
};

const StyleEditor = () => {
  const {
    editingSelectedAstElement,
    setEditingSelectedAstElement,
    updateAstElementStyleByUuid,
  } = useAst();

  const saveAst = () => {
    if (editingSelectedAstElement) {
      updateAstElementStyleByUuid({
        uuid: editingSelectedAstElement?.uuid,
        updates: editingSelectedAstElement.props.style,
      });
    }
  };

  const styleObj = useMemo(() => {
    return editingSelectedAstElement?.props.style;
  }, [editingSelectedAstElement]);

  if (!editingSelectedAstElement) {
    return <div style={{ color: "white" }}>請先選擇節點</div>;
  }

  return (
    <div className="style-editor">
      <NormalText label={"uuid"} value={editingSelectedAstElement.uuid} />
      <NormalText
        label={"parentUuid"}
        value={editingSelectedAstElement.parentUuid}
      />
      {styleKeys.map((styleKey) => {
        const { Component, props } = renderConfigs[styleKey];
        return (
          <Component
            key={styleKey}
            label={styleKey}
            value={`${styleObj[styleKey] || ""}`}
            onChange={(v) => {
              setEditingSelectedAstElement({
                ...editingSelectedAstElement,
                props: {
                  ...editingSelectedAstElement.props,
                  style: {
                    ...styleObj,
                    [styleKey]: v,
                  },
                },
              });
            }}
            {...props}
          />
        );
      })}
      <button onClick={saveAst}>save</button>
    </div>
  );
};

export default StyleEditor;
