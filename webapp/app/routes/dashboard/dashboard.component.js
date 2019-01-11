import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import { AvatarImage } from '../../theme';
import { Progress, Summary, AddWaterForm } from '../../components';
import messages from './dashboard.messages';
import { Container, ContentContainer, UserStatus } from './dashboard.styles';


export class Dashboard extends PureComponent {
  static propTypes = {
    currentUser: PropTypes.object.isRequired,
    userData: PropTypes.object.isRequired,
    isOnline: PropTypes.bool.isRequired,
    isSyncing: PropTypes.bool.isRequired,
    waterConsumption: PropTypes.number.isRequired,
    drinkWater: PropTypes.func.isRequired,
    resetWaterConsumption: PropTypes.func.isRequired,
  };

  get userData() {
    const { currentUser, userData } = this.props;
    return currentUser.merge(userData);
  }

  render() {
    const { isSyncing, resetWaterConsumption, drinkWater } = this.props;

    return (
      <Container>
        <Helmet title="Dashboard" />
        <Progress active={isSyncing} />
        <Summary
          userData={this.userData}
          onResetWaterConsumption={resetWaterConsumption}
        />

        <AvatarImage
          src={this.props.currentUser.get('avatarURL', '')}
          alt={this.props.currentUser.get('name', '')}
        />
        <ContentContainer>
          <UserStatus white={this.white} component="div" variant="caption">
            <FormattedMessage
              {...messages.consumption}
              values={{ value: this.props.waterConsumption }}
            />
          </UserStatus>

          <AddWaterForm initialValues={{ quantity: 250 }} onSubmit={drinkWater} onReset={resetWaterConsumption} />


        </ContentContainer>
      </Container>
    );
  }
}
