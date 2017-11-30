import React, { Component } from 'react';

import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      stuff: 'nothing here',
    };
    // this.asyncAction();
    // axios.get('/api/user').then((response) => {
    //   console.log(response);
    //   this.setState({
    //     stuff: JSON.stringify(response.data),
    //   });
    // });

    axios.post('/api/post/lalalalala').then((response) => {
      console.log(response);
      this.setState({
        stuff: JSON.stringify(response.data),
      });
    });
  }

  // asyncAction() {
  //   axios.get('/api').then((data) => {
  //     console.log(data);
  //     // this.setState({
  //     //   stuff: data,
  //     // });
  //   });
  // }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <h1 className="App-intro">
          <span>DATA WE GOT: {this.state.stuff}</span><br />
          To get started, edit <code>src/App.js</code> and save to reload.
        </h1>
      </div>
    );
  }
}

export default App;
