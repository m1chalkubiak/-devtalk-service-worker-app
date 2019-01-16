import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose, merge } from 'ramda';
import validate from 'validate.js';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Map } from 'immutable';
import { Field, reduxForm, getFormValues } from 'redux-form/immutable';
import InputAdornment from '@material-ui/core/InputAdornment';
import Switch from '@material-ui/core/Switch';

import { getFormFieldHelperText, getDailyWaterRequirements } from '../../../utils/rendering';
import { AlarmList } from './alarmList';
import {
  PROFILE_FORM,
  PROFILE_NAME_FIELD,
  PROFILE_AGE_FIELD,
  PROFILE_WEIGHT_FIELD,
  PROFILE_NOTIFICATIONS_FIELD,
} from './profileForm.constants';
import messages from './profileForm.messages';
import { Form, InputField, SwitchWrapper, Submit } from './profileForm.styles';


export class ProfileFormComponent extends PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
    values: PropTypes.instanceOf(Map).isRequired,
  };

  handleSubmit = values =>
    this.props.onSubmit(values.set('dailyWaterRequirements', getDailyWaterRequirements(values.toJS())));

  renderSwitchField = ({ input, label }) => {
    const handleChange = (e, checked) => {
      if (checked) {
        Notification.requestPermission().then((permission) => input.onChange(permission === 'granted'));
      } else {
        input.onChange(checked);
      }
    };

    return (
      <SwitchWrapper
        control={<Switch checked={input.value} onChange={handleChange} color="primary" />}
        label={label}
        labelPlacement="start"
      />
    );
  };

  renderTextField = ({ meta, input, type = 'text', label, InputProps, disabled }) => (
    <InputField
      error={meta.invalid && meta.touched}
      value={input.value}
      type={type}
      label={label}
      helperText={getFormFieldHelperText(this.props.intl, messages, meta)}
      InputProps={merge(input, InputProps)}
      disabled={disabled}
      variant="outlined"
    />
  );

  render() {
    const { intl, handleSubmit, values } = this.props;
    return (
      <Form onSubmit={handleSubmit(this.handleSubmit)} noValidate>
        <Field
          component={this.renderTextField}
          name={PROFILE_NAME_FIELD}
          label={intl.formatMessage(messages.nameField)}
        />
        <Field
          component={this.renderTextField}
          name={PROFILE_AGE_FIELD}
          label={intl.formatMessage(messages.ageField)}
          type="number"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <FormattedMessage {...messages.ageFieldEndAdornment} />
              </InputAdornment>
            ),
          }}
        />
        <Field
          component={this.renderTextField}
          name={PROFILE_WEIGHT_FIELD}
          label={intl.formatMessage(messages.weightField)}
          type="number"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <FormattedMessage {...messages.weightFieldEndAdornment} />
              </InputAdornment>
            ),
          }}
        />
        <Field
          component={this.renderSwitchField}
          name={PROFILE_NOTIFICATIONS_FIELD}
          label={intl.formatMessage(messages.notificationField)}
        />
        <AlarmList
          show={values.get(PROFILE_NOTIFICATIONS_FIELD, false)}
        />
        <Submit variant="contained" color="primary" type="submit">
          <FormattedMessage {...messages.submit} />
        </Submit>
      </Form>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  values: getFormValues(PROFILE_FORM),
});

export const ProfileForm = compose(
  injectIntl,
  reduxForm({
    form: PROFILE_FORM,
    enableReinitialize: true,
    validate: (values) => validate(values.toJS(), {
      [PROFILE_NAME_FIELD]: {
        presence: {
          allowEmpty: false,
          message: '^namePresenceError',
        },
      },
      [PROFILE_AGE_FIELD]: {
        numericality: {
          notValid: '^agePresenceError',
          onlyInteger: true,
          lessThanOrEqualTo: 120,
          greaterThanOrEqualTo: 0,
          notInteger: '^ageOnlyIntegerError',
          notLessThanOrEqualTo: '^ageToOldError',
          notGreaterThanOrEqualTo: '^ageToYoungError',
        },
      },
      [PROFILE_WEIGHT_FIELD]: {
        numericality: {
          notValid: '^weightPresenceError',
          onlyInteger: true,
          lessThanOrEqualTo: 300,
          greaterThanOrEqualTo: 1,
          notInteger: '^weightOnlyIntegerError',
          notLessThanOrEqualTo: '^weightToLargeError',
          notGreaterThanOrEqualTo: '^weightToSmallError',
        },
      },
    }),
  }),
  connect(mapStateToProps),
)(ProfileFormComponent);
