import * as React from "react";
import { Link } from "react-router-dom";
import logo from "../../logo.svg";
import "../../App.css";

export function Home() {
  return (
    <div className="App">
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="w-full mx-auto">
          <div className="grid grid-cols-6 gap-6">
            <div className="flex flex-col">
              <Link to="/read">Read</Link>
            </div>
            <div className="flex flex-col">
              <Link to="/practice">Practice</Link>
            </div>
            <div className="flex flex-col">
              <Link to="/quiz">Quiz</Link>
            </div>
            <div className="flex flex-col">
              <Link to="/flashcard">Flashcard</Link>
            </div>
          </div>
        </div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Welcome</p>
        </header>
      </div>
    </div>
  );
}
