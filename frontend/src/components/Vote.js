import React, { Component } from 'react';
import { Button as StyledButton, Icon } from 'semantic-ui-react';

class Vote extends Component {

  upVote = () => {
    this.props.upVote();
  };

  downVote = () => {
    this.props.downVote();
  };

  render() {
    return (
      <div>
        <StyledButton onClick={this.upVote} icon size="mini">
          <Icon name='chevron up'/>
        </StyledButton>

        <StyledButton onClick={this.downVote} icon size="mini">
          <Icon name='chevron down'/>
        </StyledButton>
      </div>
    );
  }
}

export default Vote;
