import "./App.css";
import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import CompareReduxAndContext from "./pages/CompareReduxAndContext";
import DemonstrateSuspense from "./pages/DemonstrateSuspense";
import DemonstrateRef from "./pages/DemonstrateRef";
import DemonstrateErrorBoundary from "./pages/DemonstrateErrorBoundary";
import WebEditor from "./pages/WebEditor";

export const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/compare-redux-and-context",
    element: <CompareReduxAndContext />,
  },
  {
    path: "/demonstrate-suspense",
    element: <DemonstrateSuspense />,
  },
  {
    path: "/demonstrate-ref",
    element: <DemonstrateRef />,
  },
  {
    path: "/demonstrate-error-boundary",
    element: <DemonstrateErrorBoundary />,
  },
  {
    path: "/web-editor",
    element: <WebEditor />,
  },
];

const router = createBrowserRouter(routes);

function App() {
  console.log("App rerendered!");
  useEffect(() => {
    window.addEventListener('error', (e) => {
      console.log('註冊在最外層的全局錯誤監聽: ', e.message)
    })
  })
  return (
      <div className="App">
        <header className="App-header">
          <RouterProvider router={router} />
        </header>
      </div>
  );
}

export default App;
