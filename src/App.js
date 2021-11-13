import "./App.css";
import Routes from "./Routes/Routes";
import Navbar from "./components/Navigation/Navbar";

function App(props) {
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  );
}

export default App;
