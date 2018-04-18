import { RECEIVE_POSTS, SORT_POSTS, OrderBy, EDIT_POST, ADD_POST, DELETE_POST, EDIT_POST_VOTE } from '../actions/PostActions';

export function PostReducer(state = {}, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        posts: action.posts
      };
    case SORT_POSTS:
      {
        const unsortedPosts = action.posts;
        const sortedPosts = SortPosts(unsortedPosts, action.orderBy);

        return {
          ...state,
          posts: sortedPosts
        };
      }
    case EDIT_POST:
      {
        const postsToReturn = state.posts.map((postEntry) => {
          if (postEntry.id === action.post.id) {
            return action.post;
          } else {
            return postEntry;
          }
        });
        return {
          ...state,
          posts: postsToReturn
        };
      }
    case ADD_POST:
      {
        const postsToReturn = state.posts.concat(action.post);
        return {
          ...state,
          posts: postsToReturn
        };
      }
    case DELETE_POST:
      {
        const postsToReturn = state.posts.filter((entry) => {
          return entry.id !== action.postId;
        });
        return {
          ...state,
          post: postsToReturn
        };
      }
    case EDIT_POST_VOTE:
      {
        const postsToReturn = state.posts.map((postEntry) => {
          if (postEntry.id === action.post.id) {
            return action.post;
          } else {
            return postEntry;
          }
        });
        return {
          ...state,
          posts: postsToReturn
        };
      }
    default:
      if (state.posts == null) {
        return {
          ...state,
          posts: []
        };
      }
      return state;
  }
};

// Move to utility
function SortPostsByVotes(postA, postB) {
  return postB.voteScore - postA.voteScore;
}

function SortPostsByTimestamp(postA, postB) {
  return postB.timestamp - postA.timestamp;
}

function SortPosts(unsortedPosts, orderBy) {
  const sortedPosts = [...unsortedPosts];

  if (orderBy === OrderBy.VOTE_SCORE) {
    sortedPosts.sort(SortPostsByVotes);
  }

  if (orderBy === OrderBy.TIMESTAMP) {
    sortedPosts.sort(SortPostsByTimestamp);
  }

  return sortedPosts;
}
