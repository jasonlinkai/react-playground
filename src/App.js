import "./App.css";
import CompareReduxAndContext from "./pages/CompareReduxAndContext";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/compare-redux-and-context",
    element: <CompareReduxAndContext />,
  },
]);

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
