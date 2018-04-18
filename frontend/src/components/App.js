import React, { Component } from 'react';
import logo from '../logo.svg';
import '../styles/App.css';
import { Route } from 'react-router-dom';
import PostsContainer from './PostsContainer';
import PostEditor from './PostEditor';
import Post from './Post';
import { fetchCategories } from '../actions/CategoryActions';
import CategoryList from './CategoryList';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import Button from './Button';
import Sort from './Sort';
import { sortPosts, OrderBy } from '../actions/PostActions';
import { fetchPosts } from '../actions/PostActions';

class App extends Component {

  // TODO: Figure out the categories
  componentDidMount() {
    this.props.dispatch(fetchPosts());
    this.props.dispatch(fetchCategories());
  }

  sortPostsByVotes = () => {
    this.props.dispatch(sortPosts(this.props.posts, OrderBy.VOTE_SCORE));
  };

  sortPostsByTimestamp = () => {
    this.props.dispatch(sortPosts(this.props.posts, OrderBy.TIMESTAMP));
  };

  getPostDetails = (postId: string) => {
    return this.props.posts.find((post) => {
      return post.id === postId;
    });
  };

  savePost = (category, postId) => {
    this.props.history.push(`/${category}/${postId}`);
  };

  saveNewPost = () => {
    this.props.history.push(`/`);
  };

  addPost = () => {
    this.props.history.push("/post/Add");
  };

  render() {
    return (
      <div className="App">
        <CategoryList
        />
        <Route exact path="/" render={() => (
          <div>
            <Sort text="Order by Vote Score"
            sortAction={this.sortPostsByVotes}
            />
            <Sort text="Order by Timestamp"
            sortAction={this.sortPostsByTimestamp}
            />
            <PostsContainer category=""
            />
            <Button
            text="Add New Post"
            action={this.addPost}
            />
          </div>
        )}
        />

        <Route exact path="/:category" render={({match}) => (
          <PostsContainer
          category={match.params.category}
          />
        )}
        />

        <Route exact path="/:category/:post" render={({match}) => (
          <Post
          postId={match.params.post}
          post={this.getPostDetails(match.params.post)}
          />
        )}
        />

        <Route exact path="/:category/:post/Edit" render={({match}) => (
          <PostEditor
          post={this.getPostDetails(match.params.post)}
          category={match.params.category}
          onSave={this.savePost}
          />
        )}
        />

        <Route exact path="/post/Add" render={({match}) => (
          <PostEditor
          onSave={this.saveNewPost}
          />
        )}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const posts = state.posts.posts;

  const comments = state.comments.comments.filter((comment) => {
    return !comment.deleted;
  });

  return {
    categories: state.categories,
    posts,
    comments
  };
}

export default withRouter(connect(mapStateToProps)(App));
