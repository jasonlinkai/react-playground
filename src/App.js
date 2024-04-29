import "./App.css";
import { Button } from "./components/Button";
import { Input } from "./components/Input";
import { Counter } from "./components/Counter";
import { EmployeeList } from "./components/EmployeeList";

function App() {
  console.log('App rerendered!')
  return (
    <div className="App">
      <header className="App-header">
        <Button></Button>
        <Input></Input>
        <Counter></Counter>
        <EmployeeList></EmployeeList>
      </header>
    </div>
  );
}

export default App;
