import { useEffect } from "react";
import firestore from "./shared/firestore";
import logo from "./logo.svg";
import "./App.css";

function App() {
  //test firestore
  useEffect(() => {
    firestore
      .collection("tests")
      .get()
      .then((querySnapshot) => {
        console.log(querySnapshot.docs.map((doc) => doc.data()));
      });
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
