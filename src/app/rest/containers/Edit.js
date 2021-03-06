import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Dialog, TextField, Button } from 'material-ui';
import { DialogTitle, DialogContent, DialogContentText, DialogActions } from 'material-ui/Dialog';

import * as actions from '../actions';

const Edit = ({ rest: { editData }, actions }) => {
  const { _id, text, dialog } = editData;

  const onDialogClose = () =>
    actions.setData({
      editData: { ...editData, dialog: false }
    });

  return (
    <Dialog open={dialog} onRequestClose={onDialogClose}>
      <DialogTitle></DialogTitle>
      <DialogContent>
        <DialogContentText>
          <TextField
            value={text}
            onChange={event =>
              actions.setData({
                editData: { ...editData, text: event.target.value }
              })
            }
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onDialogClose}>Cancel</Button>
        <Button onClick={async () => {
          if (text) {
            await onDialogClose();
            await actions.setData({ loading: true });
            await actions.editItem(_id, text);
          }
        }}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default connect(
  ({ rest }) => ({ rest }),
  dispatch => ({ actions: bindActionCreators(actions, dispatch) })
)(Edit);
