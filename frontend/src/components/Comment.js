import React, { Component } from 'react';
import Button from './Button';
import CommentEditor from './CommentEditor';
import * as ReadableDataProvider from '../util/ReadableDataProvider';
import { removeComment, updateVote } from '../actions/CommentActions';
import { connect } from 'react-redux';
import Vote from './Vote';
import { Comment as StyledComment, Form, Header, Icon } from 'semantic-ui-react';

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
      <StyledComment>
        <StyledComment.Content>
          <StyledComment.Author as='a'>{this.props.comment.author}</StyledComment.Author>
          <StyledComment.Metadata>
            <div>
              <Icon name='star' />
              {this.props.comment.voteScore}
            </div>
          </StyledComment.Metadata>
          {
            this.state.editing
            ? <CommentEditor
              comment={this.props.comment}
              onSave={this.hideEditor}
              postId={this.props.postId}
              />
            : <StyledComment.Text>{this.props.comment.body}</StyledComment.Text>
          }
            <StyledComment.Actions>
              <Vote
              upVote={this.upVote}
              downVote={this.downVote}
              />
              <Button
              text="Edit"
              action={this.editComment}
              primary={true}
              icon="edit"
              />
              <Button
              text="Delete"
              action={this.deleteComment}
              icon="delete"
              />
            </StyledComment.Actions>
          </StyledComment.Content>
        </StyledComment>
    );
  }
}

export default connect(null)(Comment);
