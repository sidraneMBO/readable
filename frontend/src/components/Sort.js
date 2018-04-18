import React, { Component } from 'react';
import Button from './Button';

class Sort extends Component {

  sortItems = (event) => {
    this.props.sortAction();
  };

  render() {
    return (
      <Button
      text={this.props.text}
      action={this.sortItems}
      />
    );
  }
}

export default Sort;
