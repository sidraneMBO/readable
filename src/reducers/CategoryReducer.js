import { RECEIVE_CATEGORIES } from '../actions/CategoryActions';

export function CategoryReducer(state = {}, action) {
  switch(action.type) {
    case RECEIVE_CATEGORIES:
      return {
        ...state,
        ...action.categories
      };
    default:
      if (state.categories == null) {
        return {
          ...state,
          categories: []
        };
      }

      return state;
  }
};
