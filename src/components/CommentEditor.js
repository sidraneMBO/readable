import React, { Component } from 'react';
import * as ReadableDataProvider from '../util/ReadableDataProvider';
import * as GuidUtils from '../util/GuidUtils';
import Button from './Button';
import { updateComment, postComment } from '../actions/CommentActions';
import { connect } from 'react-redux';

class CommentEditor extends Component {
  state: {};

  constructor(props) {
    super(props);

    if (this.props.comment != null) {
      this.state = {
        id: String(this.props.comment.id),
        body: String(this.props.comment.body),
        author: String(this.props.comment.author)
      };
    } else {
      this.state = {
        id: String(GuidUtils.guid()),
        body: String(""),
        author: String(""),
        parentId: this.props.postId
      };
    }
  }

  addComment = () => {
    const commentToAdd = {
      id: this.state.id,
      timestamp: (new Date).getTime(),
      body: this.state.body,
      author: this.state.author,
      parentId: this.state.parentId
    };

    this.props.dispatch(postComment(commentToAdd));
  };

  editComment = () => {
    const commentToAdd = {
      id: this.state.id,
      timestamp: (new Date).getTime(),
      body: this.state.body,
    };

    this.props.dispatch(updateComment(commentToAdd));
  };

  saveComment = () => {
    if (this.props.comment == null) {
      this.addComment();
    } else {
      this.editComment();
    }

    this.props.onSave();
  };

  setBody = (event) => {
    this.setState({
      body: event.target.value
    });
  };

  setAuthor = (event) => {
    this.setState({
      author: event.target.value
    });
  };

  render() {
    return (
      <div className="CommentEditor">
      {
        this.props.comment == null
        ? <div>
            Body: <input type="text" defaultValue={this.state.body} onChange={this.setBody} />
            Author: <input type="text" defaultValue={this.state.author} onChange={this.setAuthor} />
          </div>
        : <div>
            <input type="text" defaultValue={this.state.body} onChange={this.setBody} />
          </div>
      }
      <Button
      text="Save"
      action={this.saveComment}
      />
      </div>
    );
  }
}

export default connect(null)(CommentEditor);
