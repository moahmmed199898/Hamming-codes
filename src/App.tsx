import React from 'react';
import "./State";
import Header from './components/Header/Header';
import Options from './components/Options/Options';
import Stats from './components/Stats/Stats';
import Table from './components/Table/Table';
import TableKey from './components/TableKey/TableKey';

export default class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Header />
        <Options />
        <Table />
        <TableKey />
        <Stats />
      </div>
    );
  }
}

