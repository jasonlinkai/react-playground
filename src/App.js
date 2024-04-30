import "./App.css";
import Home from "./pages/Home/Home";
import CompareReduxAndContext from "./pages/CompareReduxAndContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

export const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/compare-redux-and-context",
    element: <CompareReduxAndContext />,
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
