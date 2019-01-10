import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import { reduxForm, Field, getFormValues } from 'redux-form/immutable';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';
import { compose } from 'ramda';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { ADD_WATER_FORM, QUANTITY_FIELD } from '../../modules/userAuth';
import { Form, AddButton } from './addWaterForm.styles';

export class AddWaterFormComponent extends PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    values: PropTypes.instanceOf(Map).isRequired,
  };

  handleSubmit = values => this.props.onSubmit(values.get('quantity', 0));

  renderSelectField = ({ input, children }) => {
    return (
      <FormControl>
        <Select
          {...input}
          onChange={(event) => input.onChange(event.target.value)}
        >
          {children}
        </Select>
      </FormControl>
    );
  };

  render = () => {
    const { handleSubmit, values } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.handleSubmit)}>

        <Field
          name={QUANTITY_FIELD}
          component={this.renderSelectField}
        >
          <MenuItem value={100}>100ml</MenuItem>
          <MenuItem value={250}>250ml</MenuItem>
          <MenuItem value={500}>500ml</MenuItem>
        </Field>
        <AddButton variant="contained" color="primary" type="submit">
          Drink {values.get('quantity', 0)}ml of water
        </AddButton>
      </Form>
    );
  };
}

const mapStateToProps = createStructuredSelector({
  values: getFormValues(ADD_WATER_FORM),
});

export const AddWaterForm = compose(
  injectIntl,
  reduxForm({ form: ADD_WATER_FORM }),
  connect(mapStateToProps),
)(AddWaterFormComponent);
