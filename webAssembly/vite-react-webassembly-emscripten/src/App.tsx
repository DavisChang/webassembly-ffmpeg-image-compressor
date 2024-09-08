import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import emscriptenLogo from "./assets/emscripten_logo_full.png";
import "./App.css";

// https://vitejs.dev/guide/features.html#webassembly
import wasmUrl from "./wasm/add_number.wasm?url";
import WebAssemblyLoader from "./library/WebAssemblyLoader";

function App() {
  const [numbers, setNumbers] = useState({ a: 20, b: 10 });
  const [result, setResult] = useState(0);

  const wasmLoader = WebAssemblyLoader.getInstance(wasmUrl);
  console.log("wasmLoader:", wasmLoader);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumbers({
      ...numbers,
      [e.target.name]: parseInt(e.target.value),
    });
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    wasmLoader.loadWasm().then((instance) => {
      const sum = instance.exports.addNumber(numbers.a, numbers.b);
      setResult(sum);
    });
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={emscriptenLogo} className="logo" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + Emscripten(WebAssembly)</h1>
      <div className="card"></div>
      <div className="flex flex-col items-center p-4 space-y-4">
        <input
          type="number"
          name="a"
          value={numbers.a}
          onChange={handleChange}
          className="border p-2 rounded"
          placeholder="Enter number a"
        />
        <input
          type="number"
          name="b"
          value={numbers.b}
          onChange={handleChange}
          className="border p-2 rounded"
          placeholder="Enter number b"
        />
        <button
          onClick={handleClick}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Numbers
        </button>

        <p>Result: {result}</p>
      </div>
    </>
  );
}

export default App;
