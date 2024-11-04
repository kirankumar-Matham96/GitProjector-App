import appStyles from "./App.module.css";
import Home from "./containers/Home";

function App() {
  return (
    <div className={appStyles.bgContainer}>
      <Home />
    </div>
  );
}

export default App;
