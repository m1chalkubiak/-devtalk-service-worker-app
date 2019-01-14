import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Map } from 'immutable';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu/Menu';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';

import { SyncNotifier, ConnectionNotifier, Indicator } from '../';
import { Container, Bar, Header, Toolbar, MoreIcon, DataContainer } from './summary.styles';
import messages from './summary.messages';


export class Summary extends PureComponent {
  static propTypes = {
    userData: PropTypes.instanceOf(Map).isRequired,
    onResetWaterConsumption: PropTypes.func.isRequired,
  };

  static defaultProps = {
    maxValue: 100,
  };

  state = {
    anchorEl: null,
  };

  get open() {
    return !!this.state.anchorEl;
  }

  handleCloseMenu = () => this.setState({ anchorEl: null });

  handleOpenMenu = ({ currentTarget: anchorEl }) => this.setState({ anchorEl });

  handleResetWaterConsumption = () => {
    this.props.onResetWaterConsumption();
    this.handleCloseMenu();
  };

  get waterConsumption() {
    return this.props.userData.get('waterConsumption', 0);
  }

  get name() {
    return this.props.userData.get('name', '');
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
          <Header color="inherit" variant="subtitle1" align="left">
            <FormattedMessage
              {...messages.headline}
              values={{ name: this.name }}
            />
          </Header>
          <IconButton
            color="inherit"
            onClick={this.handleOpenMenu}
          >
            <MoreIcon />
          </IconButton>
        </Toolbar>
        <Menu
          anchorEl={this.state.anchorEl}
          open={this.open}
          onClose={this.handleCloseMenu}
        >
          <MenuItem onClick={this.handleResetWaterConsumption}>
            <FormattedMessage {...messages.resetWaterConsumption} />
          </MenuItem>
        </Menu>
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
