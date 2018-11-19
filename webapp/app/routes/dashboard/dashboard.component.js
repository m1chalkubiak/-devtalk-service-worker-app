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
    isOnline: PropTypes.bool.isRequired,
    isSyncing: PropTypes.bool.isRequired,
    waterConsumption: PropTypes.number.isRequired,
    drinkWater: PropTypes.func.isRequired,
  };

  render() {
    return (
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

          <FormattedMessage
            {...messages.onlineStatus}
            values={{ value: this.props.isOnline ? 'True' : 'False' }}
          />

          <FormattedMessage
            {...messages.syncStatus}
            values={{ value: this.props.isSyncing ? 'True' : 'False' }}
          />

          <FormattedMessage
            {...messages.consumption}
            values={{ value: this.props.waterConsumption }}
          />

          <button onClick={() => this.props.drinkWater(1)}>
            Drink 1l of watter
          </button>
        </Header>
      </Container>
    );
  }
}
