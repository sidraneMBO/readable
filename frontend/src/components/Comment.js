import React, { Component } from 'react';
import Button from './Button';
import CommentEditor from './CommentEditor';
import * as ReadableDataProvider from '../util/ReadableDataProvider';
import { removeComment, updateVote } from '../actions/CommentActions';
import { connect } from 'react-redux';
import Vote from './Vote';

class Comment extends Component {
  state: {};

  constructor(props) {
    super(props);

    this.state = {
      editing: false
    };
  }

  editComment = () => {
    this.setState({
      editing: true
    });
  };

  deleteComment = () => {
    this.props.dispatch(removeComment(this.props.comment));
  };

  hideEditor = () => {
    this.setState({
      editing: false
    });
  };

  upVote = () => {
    this.props.dispatch(updateVote(this.props.comment.id, "upVote"));
  };

  downVote = () => {
    this.props.dispatch(updateVote(this.props.comment.id, "downVote"));
  };

  render() {
    return (
      <div className="Comment">
      {
        this.state.editing
        ? <div>
            <CommentEditor
            comment={this.props.comment}
            onSave={this.hideEditor}
            postId={this.props.postId}
            />
          </div>
        : <div>
            <div>{this.props.comment.body}</div>
            <div>Author: {this.props.comment.author}</div>
            <div>Current Score: {this.props.comment.voteScore}</div>
            <Vote
            upVote={this.upVote}
            downVote={this.downVote}
            />
            <Button
            text="Edit"
            action={this.editComment}
            />
            <Button
            text="Delete"
            action={this.deleteComment}
            />
          </div>

      }
      </div>
    );
  }
}

export default connect(null)(Comment);
