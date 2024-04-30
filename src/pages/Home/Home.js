import "./Home.css";
import { useNavigate } from "react-router-dom";
import { routes } from "../../App";

function Home() {
  const navigate = useNavigate();
  console.log("Home rerendered!");
  return (
    <nav>
      <ul className="links">
        {routes.map((route) => {
          return (
            <li key={route.path} onClick={() => navigate(route.path)}>
              點擊前往 {route.path}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Home;
