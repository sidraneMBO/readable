import React, { Component } from 'react';
import * as ReadableDataProvider from '../util/ReadableDataProvider';
import * as GuidUtils from '../util/GuidUtils';
import Button from './Button';
import { updateComment, postComment } from '../actions/CommentActions';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';

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
      <div>
      {
        this.props.comment == null
        ? <Form>
            <Form.Field>
              <Form.TextArea label='Body' placeholder='Body' defaultValue={this.state.body} onChange={this.setBody} />
            </Form.Field>
            <Form.Field>
              <Form.Input fluid label='Author' placeholder='Author' defaultValue={this.state.author} onChange={this.setAuthor} />
            </Form.Field>
          </Form>
        : <Form>
            <Form.TextArea label='Body' placeholder='Body' defaultValue={this.state.body} onChange={this.setBody} />
          </Form>
      }
      <Button
      text="Save"
      action={this.saveComment}
      primary={true}
      icon="save"
      />
      </div>
    );
  }
}

export default connect(null)(CommentEditor);
