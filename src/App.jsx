import "./App.css";
import { CalendarGrid } from "./components/CalendarGrid";
import { Days } from "./components/Days";
import { Form } from "./components/Form";
import { Header } from "./components/Header";
import useToggle from "./hooks/useToggle";

function App() {
  const [isVisible, setVisibility] = useToggle();

  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();

  return (
    <>
      <Header year={year} month={month} />
      <Days />
      <CalendarGrid year={year} month={month} setVisibility={setVisibility} />
      <Form isVisible={isVisible} setVisibility={setVisibility} />
    </>
  );
}

export default App;
