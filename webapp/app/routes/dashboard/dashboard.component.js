import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import { AvatarImage } from '../../theme';
import messages from './dashboard.messages';
import { Container, Header } from './dashboard.styles';


export class Dashboard extends PureComponent {
  static propTypes = {
    users: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired,
  };

  render = () => (
    <Container>
      <Helmet title="Dashboard" />
      <Header>
        <AvatarImage
          src={this.props.currentUser.get('avatarURL', '')}
          alt={this.props.currentUser.get('name', '')}
        />
        <FormattedMessage
          {...messages.headline}
          values={{ name: this.props.currentUser.get('name', '') }}
        />
      </Header>
    </Container>
  );
}
