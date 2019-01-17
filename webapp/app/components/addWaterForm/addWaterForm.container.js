import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'ramda';
import { injectIntl } from 'react-intl';
import { getFormValues, reduxForm } from 'redux-form/immutable';

import { ADD_WATER_FORM } from './addWaterForm.constants';
import { AddWaterFormComponent } from './addWaterForm.component';


const mapStateToProps = createStructuredSelector({
  values: getFormValues(ADD_WATER_FORM),
});

export const AddWaterForm = compose(
  injectIntl,
  reduxForm({ form: ADD_WATER_FORM }),
  connect(mapStateToProps),
)(AddWaterFormComponent);
