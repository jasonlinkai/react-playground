import "./styleEditor.css";
import { useEffect, useState } from "react";
import { useAst } from "../AstProvider";

enum StyleEnum {
  width = "width",
  height = "height",
  color = "color",
  backgroundColor = "backgroundColor",
}

const styleKeys: StyleEnum[] = [
  StyleEnum.width,
  StyleEnum.height,
  StyleEnum.color,
  StyleEnum.backgroundColor,
];

const NormalText = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="style-editor-row">
      {label}:<span>{value}</span>
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

const StyleEditor = () => {
  const { selectedAstElement, updateAstElementStyleByUuid } = useAst();
  const [styleObj, setStyleObj] = useState<React.CSSProperties | null>(null);
  const saveAst = () => {
    if (selectedAstElement && styleObj) {
      updateAstElementStyleByUuid({
        uuid: selectedAstElement?.uuid,
        updates: styleObj,
      });
    }
  };
  useEffect(() => {
    if (selectedAstElement) {
      setStyleObj(selectedAstElement.props.style);
    }
  }, [selectedAstElement]);

  if (!selectedAstElement || !styleObj) {
    return <div>請先選擇節點</div>;
  }

  return (
    <div className="style-editor">
      <NormalText label={"uuid"} value={selectedAstElement.uuid} />
      <NormalText label={"parentUuid"} value={selectedAstElement.parentUuid} />
      {styleKeys.map((key) => {
        return (
          <NormalInput
            key={key}
            label={key}
            value={`${styleObj[key] || ""}`}
            onChange={(v) => {
              setStyleObj({
                ...styleObj,
                [key]: v,
              });
            }}
          />
        );
      })}
      <button onClick={saveAst}>save</button>
    </div>
  );
};

export default StyleEditor;
