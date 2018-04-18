import { RECEIVE_COMMENTS, EDIT_COMMENT, ADD_COMMENT, DELETE_COMMENT, EDIT_COMMENT_VOTE } from '../actions/CommentActions';

export function CommentReducer(state = {}, action) {
  switch (action.type) {
    case RECEIVE_COMMENTS:
      return {
        ...state,
        comments: action.comments
      };
    case EDIT_COMMENT:
      {
        const commentsToReturn = state.comments.map((commentEntry) => {
          if (commentEntry.id === action.comment.id) {
            return action.comment;
          } else {
            return commentEntry;
          }
        });
          return {
            ...state,
            comments: commentsToReturn
          };
      }
    case ADD_COMMENT:
      {
        const commentsToReturn = state.comments.concat(action.comment);
        return {
          ...state,
          comments: commentsToReturn
        };
      }
    case DELETE_COMMENT:
      {
        const commentsToReturn = state.comments.filter((entry) => {
          return entry.id !== action.comment.id;
        });
        return {
          ...state,
          comments: commentsToReturn
        };
      }
    case EDIT_COMMENT_VOTE:
      {
        const commentsToReturn = state.comments.map((commentEntry) => {
          if (commentEntry.id === action.comment.id) {
            return action.comment;
          } else {
            return commentEntry;
          }
        });
        return {
          ...state,
          comments: commentsToReturn
        };
      }
    default:
      if (state.comments == null) {
        return {
          ...state,
          comments: []
        };
      }

      return state;
  }
};
