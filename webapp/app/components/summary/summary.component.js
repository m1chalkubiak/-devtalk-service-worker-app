import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Map } from 'immutable';
import IconButton from '@material-ui/core/IconButton';

import { SyncNotifier, ConnectionNotifier, Indicator } from '../';
import { Container, Bar, Header, Toolbar, MoreIcon, DataContainer } from './summary.styles';
import messages from './summary.messages';


export class Summary extends PureComponent {
  static propTypes = {
    userData: PropTypes.instanceOf(Map).isRequired,
  };

  static defaultProps = {
    maxValue: 100,
  };

  get waterConsumption() {
    return this.props.userData.get('waterConsumption', 0);
  }

  get name() {
    return this.props.userData.get('name', 0);
  }

  get isOnline() {
    return this.props.userData.get('isOnline', false);
  }

  get isSyncing() {
    return this.props.userData.get('isSyncing', false);
  }


  render = () => (
    <Container square>
      <Bar position="static">
        <Toolbar disableGutters>
          <Header color="inherit" variant="subheading" align="left">
            <FormattedMessage
              {...messages.headline}
              values={{ name: this.name }}
            />
          </Header>
          <IconButton color="inherit">
            <MoreIcon />
          </IconButton>
        </Toolbar>
      </Bar>
      <DataContainer>
        <SyncNotifier syncOn={this.isSyncing} />
        <Indicator
          white
          value={this.waterConsumption}
          maxValue={2500}
        />
        <ConnectionNotifier online={this.isOnline} />
      </DataContainer>
    </Container>
  );
}
