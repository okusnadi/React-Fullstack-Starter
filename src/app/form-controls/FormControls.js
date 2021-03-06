import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Paper, Select, Input, Radio, Checkbox, Switch } from 'material-ui';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormGroup, FormControlLabel, FormLabel } from 'material-ui/Form';
import { RadioGroup } from 'material-ui/Radio';

import Navigation from '~/shared/Navigation';

import * as actions from './actions';
import { listOfVariety } from './selectors';

const FormControls = ({ formControls, actions, listOfVariety }) => {
  const {
    age, listOfage,
    countries, listOfCountries,
    category, variety, animals,
    frameworks,
    gender,
    autoplay
  } = formControls;

  return (
    <div className="container">
      <Navigation />

      <p>TODO: RESTful API</p>

      <Paper>
        <form className="container">
          <div className="row">
            {/* select */}
            <FormControl>
              <InputLabel htmlFor="age">Age</InputLabel>
              <Select
                value={age}
                onChange={event => actions.setData({ age: event.target.value })}
                input={<Input id="age" style={{ width: '7rem' }} />}
              >
                <MenuItem value=""><em>None</em></MenuItem>
                {
                  listOfage.map(({ value, label }, index) => (
                    <MenuItem key={index} value={value}>{label}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </div>

          <div className="row">
            {/* multiple select */}
            <FormControl>
              <InputLabel htmlFor="countries">Countries</InputLabel>
              <Select
                multiple
                value={countries}
                onChange={event => actions.setData({ countries: event.target.value, category: '' })}
                input={<Input id="countries" style={{ width: '15rem' }} />}
              >
                {
                  listOfCountries.map((item, index) => (
                    <MenuItem key={index} value={item}>{item}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </div>

          <div className="row">
            {/* nested select */}
            <FormControl component="fieldset">
              <FormLabel component="legend">Animals</FormLabel>
            <FormGroup row>
              <FormControl>
                <InputLabel htmlFor="category">Category</InputLabel>
                <Select
                  value={category}
                  onChange={event => actions.setData({ category: event.target.value, variety: '' })}
                  input={<Input id="category" style={{ width: '7rem' }} />}
                >
                  <MenuItem value=""><em>None</em></MenuItem>
                  {
                    animals.map(({ category }, index) => (
                      <MenuItem key={index} value={category}>{category}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>

              <FormControl style={{ marginLeft: '1rem' }} disabled={!category}>
                <InputLabel htmlFor="variety">Variety</InputLabel>
                <Select
                  value={variety}
                  onChange={event => actions.setData({ variety: event.target.value })}
                  input={<Input id="variety" style={{ width: '7rem' }} />}
                >
                  <MenuItem value=""><em>None</em></MenuItem>
                  {
                    listOfVariety.length
                      ? listOfVariety[0]['variety'].map((item, index) => (
                          <MenuItem key={index} value={item}>{item}</MenuItem>
                        ))
                      : void 0
                  }
                </Select>
              </FormControl>
            </FormGroup>
          </FormControl>
          </div>

          <div className="row">
            {/* checkboxes */}
            <FormControl component="fieldset">
              <FormLabel component="legend">Frameworks</FormLabel>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={frameworks.angular}
                      onChange={(event, checked) => actions.setData({ frameworks: { ...frameworks, angular: checked } })}
                      value="angular"
                    />
                  }
                  label="Angular"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={frameworks.react}
                      onChange={(event, checked) => actions.setData({ frameworks: { ...frameworks, react: checked } })}
                      value="react"
                    />
                  }
                  label="React"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={frameworks.vue}
                      onChange={(event, checked) => actions.setData({ frameworks: { ...frameworks, vue: checked } })}
                      value="vue"
                    />
                  }
                  label="Vue"
                />
              </FormGroup>
            </FormControl>
          </div>

          <div className="row">
            {/* radio buttons */}
            <FormControl component="fieldset">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                style={{ display: 'flex', flexDirection: 'row' }}
                aria-label="gender"
                name="gender"
                value={gender}
                onChange={(event, value) => actions.setData({ gender: value })}
              >
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
              </RadioGroup>
            </FormControl>
          </div>

          <div className="row">
            {/* switch */}
            <FormControl component="fieldset">
              <FormGroup row>
                <FormLabel component="legend" style={{ alignSelf: 'center' }}>Autoplay</FormLabel>
                <Switch
                  checked={autoplay}
                  onChange={(event, checked) => actions.setData({ autoplay: checked })}
                  aria-label="Autoplay"
                />
              </FormGroup>
            </FormControl>
          </div>
        </form>
      </Paper>

      <style jsx>{`
        .container {
          padding: .5rem 1rem;
        }

        .row {
          padding: .66rem;
          display: flex;
          flex-direction: row;
        }
      `}</style>
    </div>
  );
};

export default connect(
  ({ formControls }) => ({ formControls, listOfVariety: listOfVariety(formControls) }),
  dispatch => ({ actions: bindActionCreators(actions, dispatch) })
)(FormControls);
