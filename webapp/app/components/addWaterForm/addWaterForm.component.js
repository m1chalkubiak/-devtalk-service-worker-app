import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { Field } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';

import { QUANTITY_FIELD } from './addWaterForm.constants';
import { Form, AddButton, ResetButton } from './addWaterForm.styles';
import { WaterPicker } from '../waterPicker';
import messages from './addWaterForm.messages';


export class AddWaterFormComponent extends PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    values: PropTypes.instanceOf(Map).isRequired,
  };

  handleSubmit = values => this.props.onSubmit(values.get('quantity', 0));

  render = () => {
    const { handleSubmit, values, onReset } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.handleSubmit)}>
        <Field
          name={QUANTITY_FIELD}
          component={WaterPicker}
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
