import React from 'react';
import Header from './components/Header/Header';
import Options from './components/Options/Options';

export default class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Header />
        <Options />
      </div>
    );
  }
}

