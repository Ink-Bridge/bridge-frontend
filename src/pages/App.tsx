import { TxCard } from '@shared';
import { TxStatus } from '@core';
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <TxCard status={ TxStatus.success } requirer="xxx" hash="asdfasd"></TxCard>
    </div>
  );
}

export default App;
