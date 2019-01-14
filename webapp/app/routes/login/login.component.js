import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import Helmet from 'react-helmet';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';

import { TextField } from '../../theme';
import { NAME_FIELD } from '../../modules/users/';
import { Wrapper, LoginForm, LoginButton } from './login.styles';
import messages from './login.messages';


export class Login extends PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    setupUserData: PropTypes.func.isRequired,
  };

  handleSubmit = (values) => new Promise(() => {
    this.props.setupUserData({
      [NAME_FIELD]: values.get(NAME_FIELD),
    });
  });

  renderTextField = ({ input, type, label }) => (
    <TextField
      type={type}
      label={label}
      {...input}
      autoFocus
      fullWidth
    />
  );

  render = () => (
    <Wrapper>
      <Helmet title="Login" />
      <LoginForm onSubmit={this.props.handleSubmit(this.handleSubmit)}>
        <Typography variant="h5" align="center" gutterBottom>
          <FormattedHTMLMessage {...messages.headline} />
        </Typography>
        <Field
          component={this.renderTextField}
          label="Your name"
          name={NAME_FIELD}
          type="text"
        />
        <LoginButton variant="contained" color="primary" type="submit">
          <FormattedMessage {...messages.start} />
        </LoginButton>
      </LoginForm>
    </Wrapper>
  );
}
