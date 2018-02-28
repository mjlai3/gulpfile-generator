import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleStrict, toggleEs6 } from '../../actions';
import Section from '../section/Section';
import './App.css';
import Prism from 'prismjs';

class App extends Component {

  refreshPrism() {
    Prism.highlightAll();
  }

  render() {
    console.log(this.props.state.strict);
    return (
      <div>
        <button onClick={this.props.onToggleStrict}>Toggle strict</button>
        <button onClick={this.props.onToggleEs6}>Toggle ES6</button>
        <button onClick={this.refreshPrism}>Prismjs</button>
        <Section strict={this.props.state.strict} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    state: state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onToggleStrict: () => {
      dispatch(toggleStrict())
    },
    onToggleEs6: () => {
      dispatch(toggleEs6())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
