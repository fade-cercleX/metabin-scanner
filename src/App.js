import "./App.css";
import Scanner from "./Scanner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div>
      <ToastContainer />
      <div className="laptop-view">
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
