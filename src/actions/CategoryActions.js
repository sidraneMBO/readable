import * as ReadableDataProvider from '../util/ReadableDataProvider';

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

export const receiveCategories = (categories) => ({
  type: RECEIVE_CATEGORIES,
  categories
});

export const fetchCategories = () => dispatch => (
  ReadableDataProvider
      .getCategories()
      .then(categories => dispatch(receiveCategories(categories)))
);
