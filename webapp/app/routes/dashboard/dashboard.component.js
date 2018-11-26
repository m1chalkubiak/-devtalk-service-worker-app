import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import { AvatarImage } from '../../theme';
import { Progress, Summary } from '../../components';
import messages from './dashboard.messages';
import { Container, Header, AddButton } from './dashboard.styles';


export class Dashboard extends PureComponent {
  static propTypes = {
    currentUser: PropTypes.object.isRequired,
    userData: PropTypes.object.isRequired,
    isOnline: PropTypes.bool.isRequired,
    isSyncing: PropTypes.bool.isRequired,
    waterConsumption: PropTypes.number.isRequired,
    drinkWater: PropTypes.func.isRequired,
  };

  get userData() {
    const { currentUser, userData } = this.props;
    return currentUser.merge(userData);
  }

  render() {
    const { isSyncing } = this.props;

    return (
      <Container>
        <Helmet title="Dashboard" />
        <Progress active={isSyncing} />
        <Summary userData={this.userData} />

        <AvatarImage
          src={this.props.currentUser.get('avatarURL', '')}
          alt={this.props.currentUser.get('name', '')}
        />
        <Header>
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

          <AddButton
            variant="contained"
            color="primary"
            type="button"
            fullWidth
            onClick={() => this.props.drinkWater(250)}
          >
            Drink 250ml of watter
          </AddButton>
        </Header>
      </Container>
    );
  }
}
