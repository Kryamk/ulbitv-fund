import React, { useState } from 'react';
import Counter from './components/Counter';
import CounterClass from './components/CounterClass';
import './styles/App.css';


function App() {

  return (
    <div className="App">
      <Counter />
      <CounterClass />
    </div>
  );
}

export default App;
