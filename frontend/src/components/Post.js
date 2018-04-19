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
import { Message, Comment as StyledComment, Header, Divider, Segment } from 'semantic-ui-react';

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
              <Message>
                <Message.List>
                  <Message.Header>
                    <Link
                    to={"/" + this.props.post.category + "/" + this.props.post.id}
                    >
                      <Message.Item>{this.props.post.title}</Message.Item>
                    </Link>
                    <Button
                    text="Edit"
                    action={this.editPost}
                    primary={true}
                    icon="edit"
                    size="mini"
                    />
                    <Button
                    text="Delete"
                    action={this.deletePost}
                    icon="delete"
                    size="mini"
                    />
                  </Message.Header>
                  {
                    this.props.hideDetails
                    ? null
                    : <Message.Item>{this.props.post.body}</Message.Item>
                  }
                  <Message.Item>Author: {this.props.post.author}</Message.Item>
                  <Message.Item>Comments: {this.props.post.commentCount}</Message.Item>
                  <Message.Item>Votes: {this.props.post.voteScore}</Message.Item>
                  <Vote
                  upVote={this.upVote}
                  downVote={this.downVote}
                  />
                </Message.List>
              </Message>
              <div>
                <StyledComment.Group>
                  {
                    this.props.hideDetails
                    ? null
                    : <div>
                        <Header as='h3' dividing>Comments</Header>
                        {
                          this.props.comments.map((comment) => (
                              <Segment key={comment.id}>
                                <StyledComment.Avatar as='a' src={require('../assets/avatar.png')}/>
                                <Comment
                                comment={comment}
                                postId={this.props.post.id}
                                />
                              </Segment>
                            ))
                        }
                      </div>
                  }
                </StyledComment.Group>
                <div>
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
                        primary={true}
                        icon="edit"
                        />
                      </div>
                }
                </div>
              </div>
            </div>
        : <div>404</div>
      }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.comments;
}

export default withRouter(connect(mapStateToProps)(Post));
