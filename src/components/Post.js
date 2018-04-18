import React, { Component } from 'react';
import Comment from './Comment';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { fetchComments } from '../actions/CommentActions';
import Button from './Button';
import * as ReadableDataProvider from '../util/ReadableDataProvider';
import CommentEditor from './CommentEditor';
import { removePost, updateVote } from '../actions/PostActions';
import Vote from './Vote';
import { Link } from 'react-router-dom';

class Post extends Component {
  state = {};

  constructor(props) {
    super(props);

    this.state = {
      addingComment: false
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchComments(this.props.postId));
  }

  editPost = () => {
    this.props.history.push(`/${this.props.post.category}/${this.props.post.id}/Edit`);
  };

  deletePost = () => {
    this.props.dispatch(removePost(this.props.post.id));
    this.props.history.push("/");
  };

  addComment = () => {
    this.setState({
      addingComment: true
    });
  };

  saveComment = () => {
    this.setState({
      addingComment: false
    });
  };

  upVote = () => {
    this.props.dispatch(updateVote(this.props.post.id, "upVote"));
  };

  downVote = () => {
    this.props.dispatch(updateVote(this.props.post.id, "downVote"));
  };

  render() {
    return (
      <div className="Post">
      {
        this.props.post
        ? this.props.post.deleted
          ? <div>404</div>
          : <div>
              <div>
                <Link
                to={"/" + this.props.post.category + "/" + this.props.post.id}
                >
                  <div>{this.props.post.title}</div>
                </Link>
                {
                  this.props.hideDetails
                  ? null
                  : <div>{this.props.post.body}</div>
                }
                <div>Author: {this.props.post.author}</div>
                <div>Comments: {this.props.post.commentCount}</div>
                <div>Votes: {this.props.post.voteScore}</div>
                <Vote
                upVote={this.upVote}
                downVote={this.downVote}
                />
              </div>
              <div>
              {
                this.props.hideDetails
                ? null
                : this.props.comments.map((comment) => (
                  <div key={comment.id}>
                    <Comment
                    comment={comment}
                    postId={this.props.post.id}
                    />
                  </div>
                  ))
              }
              </div>

              <Button
              text="Edit"
              action={this.editPost}
              />
              <Button
              text="Delete"
              action={this.deletePost}
              />
              {
                this.props.hideDetails
                ? null
                : this.state.addingComment
                  ? <div>
                      <CommentEditor
                        postId={this.props.post.id}
                        onSave={this.saveComment}
                      />
                    </div>
                  : <div>
                      <Button
                      text="Add New Comment"
                      action={this.addComment}
                      />
                    </div>
              }
            </div>
        : null
      }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.comments;
}

export default withRouter(connect(mapStateToProps)(Post));
