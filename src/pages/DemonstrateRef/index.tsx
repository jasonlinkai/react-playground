import { useRef, forwardRef, useState, useImperativeHandle } from "react";


interface InputRef {
  focus: () => void;
}
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  testId: string; 
}

const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = (props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(
    ref,
    () => {
      return {
        focus() {
          if (inputRef.current) {
            inputRef.current.focus();
          }
        },
      };
    },
    []
  );
  return <input ref={inputRef} {...props} />;
};

const ForwardedInput = forwardRef(Input);

const TwiceEncapsulationBestPratice: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const [account, setAccount] = useState("");
  return (
    <div>
      {children}
      <ForwardedInput
        ref={ref}
        placeholder="請輸入帳號"
        value={account}
        onChange={(e) => setAccount(e.target.value)}
        testId="123"
      />
    </div>
  );
};

const Components = [
  {
    key: "TwiceEncapsulationBestPratice",
    Component: TwiceEncapsulationBestPratice,
  },
];

const DemonstrateRef = () => {
  const [name, setName] = useState("");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {Components.map(({ key }) => {
        return (
          <button key={`button-${key}`} onClick={() => setName(key)}>
            {key}
          </button>
        );
      })}
      {Components.map(({ key, Component }) => {
        if (key !== name) return null;
        return (
          <Component key={key}>
            <div>{key}</div>
          </Component>
        );
      })}
    </div>
  );
};

export default DemonstrateRef;
