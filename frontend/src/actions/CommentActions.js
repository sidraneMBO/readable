import * as ReadableDataProvider from '../util/ReadableDataProvider';
import { fetchPosts } from './PostActions';

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const EDIT_COMMENT_VOTE = 'EDIT_COMMENT_VOTE';

export const receiveComments = (comments) => ({
  type: RECEIVE_COMMENTS,
  comments
});

export const editComment = (comment) => ({
  type: EDIT_COMMENT,
  comment
});

export const addComment = (comment) => ({
  type: ADD_COMMENT,
  comment
});

export const deleteComment = (comment) => ({
  type: DELETE_COMMENT,
  comment
});

export const editCommentVote = (comment) => ({
  type: EDIT_COMMENT_VOTE,
  comment
});

export const fetchComments = (postId) => dispatch => (
  ReadableDataProvider
      .getComments(postId)
      .then(comments => dispatch(receiveComments(comments)))
);

export const updateComment = (comment) => dispatch => (
  ReadableDataProvider
      .editComment(comment.id, comment.timestamp, comment.body)
      .then(updatedComment => dispatch(editComment(updatedComment)))
);

export const postComment = (comment) => dispatch => (
  ReadableDataProvider
      .addComment(
       comment.id,
       comment.timestamp,
       comment.body,
       comment.author,
       comment.parentId)
      .then(updatedComment => dispatch(addComment(updatedComment)))
      .then(dispatch(fetchPosts()))
);

export const removeComment = (comment) => dispatch => (
  ReadableDataProvider
      .deleteComment(comment.id)
      .then(comment => dispatch(deleteComment(comment)))
      .then(dispatch(fetchPosts()))
);

export const updateVote = (commentId, option) => dispatch => (
  ReadableDataProvider
    .voteComment(commentId, option)
    .then(comment => dispatch(editCommentVote(comment)))
);
