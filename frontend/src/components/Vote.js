import React, { Component } from 'react';

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
        <button
        type="button"
        onClick={this.upVote}
        >UPVOTE
        </button>

        <button
        type="button"
        onClick={this.downVote}
        >DOWNVOTE
        </button>
      </div>
    );
  }
}

export default Vote;
