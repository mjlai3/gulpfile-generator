import React, { Component } from 'react';
import './App.css';
import prism from 'prismjs';
import 'prismjs/themes/prism.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      strict: true,
      es6: false
    }
  }

  renderStrict() {
    return this.state.strict ? `'use strict';` : '';
  }

  renderImports() {
    return this.state.es6 ? `import gulp from 'gulp';` : `var gulp = require('gulp');`;
  }

  render() {
    return (
      <div className="App">
        <span>gulpfile.js</span>
        <pre>
          <code className="language-javascript">
            {this.renderStrict()}
            {'\n\n'}
            {this.renderImports()}
          </code>
        </pre>
      </div>
    );
  }
}

export default App;
