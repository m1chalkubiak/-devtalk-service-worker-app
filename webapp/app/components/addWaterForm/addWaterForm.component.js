import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import { reduxForm, Field, getFormValues } from 'redux-form/immutable';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage, injectIntl } from 'react-intl';
import { compose } from 'ramda';

import { ADD_WATER_FORM, QUANTITY_FIELD } from '../../modules/userAuth';
import { Form, AddButton, ResetButton } from './addWaterForm.styles';
import messages from './addWaterForm.messages';
import { WaterPicker } from '../waterPicker';

export class AddWaterFormComponent extends PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    values: PropTypes.instanceOf(Map).isRequired,
  };

  handleSubmit = values => this.props.onSubmit(values.get('quantity', 0));

  renderWaterPicker = ({ input }) => <WaterPicker {...input} />;

  render = () => {
    const { handleSubmit, values, onReset } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.handleSubmit)}>
        <Field
          name={QUANTITY_FIELD}
          component={this.renderWaterPicker}
        />
        <div>
          <AddButton variant="contained" color="primary" type="submit">
            <FormattedMessage
              {...messages.addButton}
              values={{ value: values.get('quantity', 0) }}
            />
          </AddButton>
        </div>
        <div>
          <ResetButton
            type="button"
            size="small"
            onClick={onReset}
          >
            <FormattedMessage {...messages.resetButton} />
          </ResetButton>
        </div>
      </Form>
    );
  };
}

const mapStateToProps = createStructuredSelector( {
  values: getFormValues(ADD_WATER_FORM),
});

export const AddWaterForm = compose(
  injectIntl,
  reduxForm({ form: ADD_WATER_FORM }),
  connect(mapStateToProps),
)(AddWaterFormComponent);
