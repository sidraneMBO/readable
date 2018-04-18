import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts, fetchPostsForCategory } from '../actions/PostActions';
import { Link } from 'react-router-dom';
import Post from './Post';

class PostContainer extends Component {

  componentDidMount() {
    // If empty category, show all posts.
    const category = this.props.category;
    if (category === "") {
      this.props.dispatch(fetchPosts());
    } else {
      this.props.dispatch(fetchPostsForCategory(category));
    }
  }

  render() {
    return (
      <div className="PostContainer">
      {
        this.props.posts.map((post) => (
          <div key={post.id}>
            <Post
            postId={post.id}
            post={post}
            hideDetails={true}
            />
          </div>
        ))
      }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const posts = state.posts.posts.filter((post) => {
    return !post.deleted;
  });

  return {
    posts: posts
  };
}

export default connect(mapStateToProps)(PostContainer);
