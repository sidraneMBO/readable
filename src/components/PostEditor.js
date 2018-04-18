import React, { Component } from 'react';
import * as ReadableDataProvider from '../util/ReadableDataProvider';
import Button from './Button';
import * as GuidUtils from '../util/GuidUtils';
import { updatePost, postPost } from '../actions/PostActions';
import { connect } from 'react-redux';

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
      this.state = {
        id: String(GuidUtils.guid()),
        title: String(""),
        body: String(""),
        author: String(""),
        category: this.props.categories[0].name
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
      category: event.target.value.name
    });
  };

  render() {
    return (
      <div className="PostEditor">
      {
        this.props.post == null
        ? <div>
            <div>
              Category:
                <select value={this.props.categories[0]} onChange={this.setCategory}>
                {this.props.categories.map(category => (
                  <option
                  key={category.name}
                  value={category.name}
                  >{category.name}</option>
                ))}
                <option value="none">None</option>
              </select>
            </div>
            <div>
              Title: <input type="text" defaultValue={this.state.title} onChange={this.setTitle} />
            </div>
            <div>
              Body: <input type="text" defaultValue={this.state.body} onChange={this.setBody} />
            </div>
            <div>
              Author: <input type="text" defaultValue={this.state.author} onChange={this.setAuthor} />
            </div>
          </div>
        : <div>
            <div>
              Title: <input type="text" defaultValue={this.state.title} onChange={this.setTitle} />
            </div>
            <div>
              Body: <input type="text" defaultValue={this.state.body} onChange={this.setBody} />
            </div>
          </div>
      }
      <Button
      text="Save"
      action={this.savePost}
      />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.categories;
}

export default connect(mapStateToProps)(PostEditor);
