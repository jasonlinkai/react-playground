import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import CompareReduxAndContext from "./pages/CompareReduxAndContext";
import DemonstrateSuspense from "./pages/DemonstrateSuspense";

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
];

const router = createBrowserRouter(routes);

function App() {
  console.log("App rerendered!");
  return (
    <div className="App">
      <header className="App-header">
        <RouterProvider router={router} />
      </header>
    </div>
  );
}

export default App;
