import * as ReadableDataProvider from '../util/ReadableDataProvider';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SORT_POSTS = 'SORT_POSTS';
export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';
export const EDIT_POST_VOTE = 'EDIT_VOTE';

export const sortPosts = (posts, orderBy) => ({
  type: SORT_POSTS,
  posts,
  orderBy
});

export const receivePosts = (posts) => ({
  type: RECEIVE_POSTS,
  posts
});

export const addPost = (post) => ({
  type: ADD_POST,
  post
});

export const editPost = (post) => ({
    type: EDIT_POST,
    post
});

export const deletePost = (postId) => ({
  type: DELETE_POST,
  postId
});

export const editPostVote = (post) => ({
  type: EDIT_POST_VOTE,
  post
});

export const OrderBy = {
  VOTE_SCORE: 'VOTE_SCORE',
  TIMESTAMP: 'TIMESTAMP'
}

export const fetchPosts = () => dispatch => (
  ReadableDataProvider
    .getPosts()
    .then(posts => dispatch(receivePosts(posts)))
);

export const fetchPostsForCategory = (category) => dispatch => (
  ReadableDataProvider
    .getPostsForCategory(category)
    .then(posts => dispatch(receivePosts(posts)))
);

export const updatePost = (post) => dispatch => (
  ReadableDataProvider
    .editPost(post.id, post.title, post.body)
    .then(post => dispatch(editPost(post)))
);

export const postPost = (post) => dispatch => (
  ReadableDataProvider
    .addPost(post.id, post.timestamp, post.title, post.body, post.author, post.category)
    .then(post => dispatch(addPost(post)))
);

export const removePost = (postId) => dispatch => (
  ReadableDataProvider
    .deletePost(postId)
    .then(post => dispatch(deletePost(post.id)))
);

export const updateVote = (postId, option) => dispatch => (
  ReadableDataProvider
    .votePost(postId, option)
    .then(post => dispatch(editPostVote(post)))
);
