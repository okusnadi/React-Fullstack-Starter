import gql from 'graphql-tag';

import { CLIENT, SUCCESS, FAILURE, SET_DATA } from './constants';

export const success = data => ({ type: SUCCESS, data });
export const failure = error => ({ type: FAILURE, error });

export const searchItem = () =>
  dispatch =>
    CLIENT.query({
        query: gql`
          {
            list {
              _id
              text
            }
          }
        `
      })
      .then(response => dispatch(success(response.data)));

export const setData = data => ({ type: SET_DATA, data });