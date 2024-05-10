import "./styleEditor.css";
import { Fragment } from "react";
import { useAst } from "../AstProvider";
import { AstElement } from "../RenderReactAst/ast";

export enum StyleEnum {
  width = "width",
  height = "height",
  color = "color",
  backgroundColor = "backgroundColor",
  position = "position",
  top = "top",
  right = "right",
  bottom = "bottom",
  left = "left",
}

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

const AstTree = ({ root, level = 0 }: { root: AstElement; level?: number }) => {
  return (
    <Fragment>
      {root.children.map((child) => {
        const isTextElement = "innerType" in child;
        const marginLeft = `${10 * level}px`;
        return (
          <div
            key={`ast-tree-panel-item-${child.uuid}`}
            className="ast-tree-panel-item"
            style={{ marginLeft }}
          >
            {isTextElement ? (
              <span className="ast-tree-panel-item__content">
                {child.content}
              </span>
            ) : (
              <>
                <span className="ast-tree-panel-item__start-tag">{`<${child.type}>`}</span>
                <AstTree root={child} level={level + 1} />
                <span className="ast-tree-panel-item__end-tag">{`</${child.type}>`}</span>
              </>
            )}
          </div>
        );
      })}
    </Fragment>
  );
};

const AstTreePanel = ({ root }: { root: AstElement }) => {
  return (
    <div className="ast-tree-panel">
      <div className="ast-tree-panel__title">AstTreePanel</div>
      <AstTree root={root} />
    </div>
  );
};

const StyleEditor = () => {
  const {
    editingSelectedAstElement,
    updateEditingSelectedAstElementStyle,
    updateAstElement,
  } = useAst();

  const saveAst = () => {
    if (editingSelectedAstElement) {
      updateAstElement({
        newAstElement: editingSelectedAstElement,
      });
    }
  };

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
            value={`${editingSelectedAstElement.props.style[styleKey] || ""}`}
            onChange={(v) => {
              updateEditingSelectedAstElementStyle({ styleKey, styleValue: v });
            }}
            {...props}
          />
        );
      })}
      <button onClick={saveAst}>save</button>
      <AstTreePanel root={editingSelectedAstElement} />
    </div>
  );
};

export default StyleEditor;
