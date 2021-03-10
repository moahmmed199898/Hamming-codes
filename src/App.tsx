import React from 'react';
import Header from './components/Header/Header';
import Options from './components/Options/Options';
import Table from './components/Table/Table';

export default class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Header />
        <Options />
        <Table />
      </div>
    );
  }
}

