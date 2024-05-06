import {
  useCallback,
  useEffect,
  useState,
  useTransition,
} from "react";
import { ErrorBoundary } from "react-error-boundary";

function FallbackComponent({ error }: { error: Error }) {
  return (
    <div role="alert">
      <p>補獲到錯誤了，錯誤如下:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
}

const withErrorBoundary: (WrappedComponent: React.FC<any>) => React.FC<any> =
  (WrappedComponent) => (props) => {
    return (
      <ErrorBoundary FallbackComponent={FallbackComponent}>
        現在還沒補獲到錯誤。
        <WrappedComponent {...props} />
      </ErrorBoundary>
    );
  };

const TriggerErrorInUseEffect = withErrorBoundary(({ children }) => {
  useEffect(() => {
    throw new Error("error in TriggerErrorInUseEffect");
  }, []);

  return <div>{children}</div>;
});

const TriggerErrorInUseEffectWrapInPromise = withErrorBoundary(
  ({ children }) => {
    useEffect(() => {
      new Promise(() => {
        throw new Error("error in TriggerErrorInUseEffectWrapInPromise");
      });
    }, []);

    return <div>{children}</div>;
  }
);

const TriggerErrorInUseEffectWrapInSetTimeout = withErrorBoundary(
  ({ children }) => {
    useEffect(() => {
      setTimeout(() => {
        throw new Error("error in TriggerErrorInUseEffectWrapInSetTimeout");
      }, 0);
    }, []);

    return <div>{children}</div>;
  }
);

const TriggerErrorInEventHanlder = withErrorBoundary(({ children }) => {
  const trigger = useCallback(() => {
    throw new Error("error in TriggerErrorInEventHanlder");
  }, []);

  return (
    <div>
      {children}
      <button onClick={trigger}> click me!</button>
    </div>
  );
});

const TriggerErrorInTransition = withErrorBoundary(({ children }) => {
  const [, startTransition] = useTransition();

  return (
    <div>
      {children}
      <button
        onClick={() => {
          startTransition(() => {
            throw new Error("error in TriggerErrorInTransition");
          });
        }}
      >
        click me!
      </button>
    </div>
  );
});

const TriggerErrorInComponent = withErrorBoundary(({ children }) => {
  throw new Error("error in TriggerErrorInTransition");
});

const ErrorComponents = [
  { key: "TriggerErrorInUseEffect", Component: TriggerErrorInUseEffect },
  {
    key: "TriggerErrorInUseEffectWrapInPromise",
    Component: TriggerErrorInUseEffectWrapInPromise,
  },
  {
    key: "TriggerErrorInUseEffectWrapInSetTimeout",
    Component: TriggerErrorInUseEffectWrapInSetTimeout,
  },
  {
    key: "TriggerErrorInEventHanlder",
    Component: TriggerErrorInEventHanlder,
  },
  {
    key: "TriggerErrorInTransition",
    Component: TriggerErrorInTransition,
  },
  {
    key: "TriggerErrorInComponent",
    Component: TriggerErrorInComponent,
  },
];

const DemonstrateErrorBoundary = () => {
  const [name, setName] = useState("");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {ErrorComponents.map(({ key }) => {
        return (
          <button key={`button-${key}`} onClick={() => setName(key)}>
            {key}
          </button>
        );
      })}
      {ErrorComponents.map(({ key, Component }) => {
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

export default DemonstrateErrorBoundary;
