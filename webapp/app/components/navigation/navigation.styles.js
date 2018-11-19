import styled from 'styled-components';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIconMaterial from '@material-ui/icons/Home';
import GroupIconMaterial from '@material-ui/icons/Group';
import SettingsIconMaterial from '@material-ui/icons/Settings';


export const Container = styled(BottomNavigation)`
  position: absolute;
  width: 100%;
  bottom: 0;
`;

export const NavigationItem = styled(BottomNavigationAction)``;

export const HomeIcon = styled(HomeIconMaterial)``;

export const ScoreboardIcon = styled(GroupIconMaterial)``;

export const SettingsIcon = styled(SettingsIconMaterial)``;
