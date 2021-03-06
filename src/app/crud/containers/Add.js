import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TextField } from 'material-ui';

import VariantButton from '~/shared/VariantButton';

import * as actions from '../actions';

const Add = ({ crud: { addData }, actions }) => {
  const { primary, accent } = addData;

  return (
    <div className="container">
      <TextField
        value={primary}
        onChange={event =>
          actions.setData({
            addData: { ...addData, primary: event.target.value }
          })
        }
      />
      {' - '}
      <TextField
        value={accent}
        onChange={event =>
          actions.setData({
            addData: { ...addData, accent: event.target.value }
          })
        }
      />
      {' '}
      <VariantButton
        raised
        variant="blue"
        text="Add"
        onClick={async () => {
          if (primary && accent) {
            await actions.addItem(primary, accent);
            await actions.setData({ addData: { primary: '', accent: '' } });
          }
        }}
      />

      <style jsx>{`
        .container {
          padding: .5rem 0;
        }
      `}</style>
    </div>
  );
};

export default connect(
  ({ crud }) => ({ crud }),
  dispatch => ({ actions: bindActionCreators(actions, dispatch) })
)(Add);
