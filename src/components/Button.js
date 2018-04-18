import React, { Component } from 'react';

class Button extends Component {
  onClickCallback = () => {
    this.props.action();
  };

  render() {
    return (
      <button
      type="button"
      onClick={this.onClickCallback}
      >{this.props.text}
      </button>
    );
  }
}

export default Button;
