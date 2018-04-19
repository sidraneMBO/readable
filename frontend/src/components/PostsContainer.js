import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts, fetchPostsForCategory } from '../actions/PostActions';
import { Link } from 'react-router-dom';
import Post from './Post';
import { withRouter } from 'react-router-dom';

class PostContainer extends Component {

  componentDidMount() {
    // If empty category, show all posts.
    this.props.dispatch(fetchPosts());
  }

  render() {
    return (
      <div className="PostContainer">
      {
        this.props.posts.map((post) => (
          (post.category === this.props.category || this.props.category === "")
          ? <div key={post.id}>
              <Post
              postId={post.id}
              post={post}
              hideDetails={true}
              />
            </div>
          : null
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

export default withRouter(connect(mapStateToProps)(PostContainer));
