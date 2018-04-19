import React, { Component } from 'react';
import { Button as StyledButton } from 'semantic-ui-react';

class Button extends Component {
  onClickCallback = () => {
    this.props.action();
  };

  render() {
    return (
      <StyledButton content={this.props.text} onClick={this.onClickCallback} icon={this.props.icon} primary={this.props.primary} size={this.props.size}>
      </StyledButton>
    );
  }
}

export default Button;
