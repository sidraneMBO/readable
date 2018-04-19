import React, { Component } from 'react';
import * as ReadableDataProvider from '../util/ReadableDataProvider';
import Button from './Button';
import * as GuidUtils from '../util/GuidUtils';
import { updatePost, postPost } from '../actions/PostActions';
import { connect } from 'react-redux';
import { Form, Divider, Segment, Header } from 'semantic-ui-react';

class PostEditor extends Component {
  state: {};

  constructor(props) {
    super(props);

    if (this.props.post != null) {
      this.state = {
        id: String(this.props.post.id),
        title: String(this.props.post.title),
        body: String(this.props.post.body),
        category: this.props.category
      };
    } else {
      const categoryName = this.props.categories[0] ? this.props.categories[0].name : String("");

      this.state = {
        id: String(GuidUtils.guid()),
        title: String(""),
        body: String(""),
        author: String(""),
        category: categoryName
      };
    }
  }

  addPost = () => {
    const postToAdd = {
      id: this.state.id,
      timestamp: (new Date).getTime(),
      title: this.state.title,
      body: this.state.body,
      author: this.state.author,
      category: this.state.category
    };

    this.props.dispatch(postPost(postToAdd));
  };

  editPost = () => {
    const postToAdd = {
      id: this.state.id,
      timestamp: (new Date).getTime(),
      title: this.state.title,
      body: this.state.body,
    };

    this.props.dispatch(updatePost(postToAdd));
  };

  savePost = () => {
    if (this.props.post == null) {
      this.addPost();
    } else {
      this.editPost();
    }

    this.props.onSave(this.props.category, this.state.id);
  };

  setTitle = (event) => {
    this.setState({
      title: event.target.value
    });
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

  setCategory = (event) => {
    this.setState({
      category: event.target.value
    });
  };

  render() {
    return (
      <Segment compact={true}>
      {
        this.props.post == null
        ? <div>
            <Header as='h3'>Add Post</Header>
            <Divider></Divider>
            <Form>
              <Form.Group widths='equal'>
                <div>
                  <Form.Field>
                    Category
                      <select defaultValue={this.props.categories[0]} onChange={this.setCategory}>
                      {this.props.categories.map(category => (
                        <option
                        key={category.name}
                        value={category.name}
                        >{category.name}</option>
                      ))}
                      <option value="none">None</option>
                    </select>
                  </Form.Field>

                  <Form.Field>
                    <Form.Input fluid label='Title' placeholder='Title' defaultValue={this.state.title} onChange={this.setTitle} />
                  </Form.Field>

                  <Form.Field>
                    <Form.TextArea label='Body' placeholder='Body' defaultValue={this.state.body} onChange={this.setBody} />
                  </Form.Field>

                  <Form.Input fluid label='Author' placeholder='Author' defaultValue={this.state.author} onChange={this.setAuthor} />
                </div>
              </Form.Group>
            </Form>
          </div>
        : <Form>
            <Form.Group widths='equal'>
              <Form.Field>
                <Form.Input label='Title' placeholder='Title' defaultValue={this.state.title} onChange={this.setTitle} />
                <Form.TextArea label='Body' placeholder='Body' defaultValue={this.state.body} onChange={this.setBody} />
              </Form.Field>
            </Form.Group>
          </Form>
      }
      <Button
      text="Save"
      action={this.savePost}
      primary={true}
      icon="save"
      />
      </Segment>
    );
  }
}

function mapStateToProps(state) {
  return state.categories;
}

export default connect(mapStateToProps)(PostEditor);
