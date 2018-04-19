import { RECEIVE_POSTS, SORT_POSTS, OrderBy, EDIT_POST, ADD_POST, DELETE_POST, EDIT_POST_VOTE } from '../actions/PostActions';

export function PostReducer(state = {}, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
      {
        return {
          ...state,
          posts: action.posts
        };
      }
    case SORT_POSTS:
      {
        const unsortedPosts = action.posts;
        const sortedPosts = SortPosts(unsortedPosts, action.orderBy, action.ascending);

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
          return entry.id !== action.post.id;
        });

        postsToReturn.push(action.post);

        return {
          ...state,
          posts: postsToReturn
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
function SortPostsByVotesAscending(postA, postB) {
  return postA.voteScore - postB.voteScore;
}

function SortPostsByVotesDescending(postA, postB) {
  return postB.voteScore - postA.voteScore;
}

function SortPostsByTimestampAscending(postA, postB) {
  return postA.timestamp - postB.timestamp;
}

function SortPostsByTimestampDescending(postA, postB) {
  return postB.timestamp - postA.timestamp;
}

function SortPosts(unsortedPosts, orderBy, ascending) {
  const sortedPosts = [...unsortedPosts];

  if (orderBy === OrderBy.VOTE_SCORE) {
    if (ascending) {
      sortedPosts.sort(SortPostsByVotesAscending);
    } else {
      sortedPosts.sort(SortPostsByVotesDescending);
    }
  }

  if (orderBy === OrderBy.TIMESTAMP) {
    if (ascending) {
      sortedPosts.sort(SortPostsByTimestampAscending);
    } else {
      sortedPosts.sort(SortPostsByTimestampDescending);
    }
  }

  return sortedPosts;
}
