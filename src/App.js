import "./App.css";
import Scanner from "./Scanner";

function App() {
  return (
    <div>
      <div
     
        className="laptop-view"
      >
        <p>
          This app is designed for use on mobile devices only. Please use a
          smartphone or tablet to access it.
        </p>
      </div>
      <div className="app">
        <Scanner />
      </div>
    </div>
  );
}

export default App;
