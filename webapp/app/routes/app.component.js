import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { IntlProvider } from 'react-intl';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from 'styled-components';

import { translationMessages } from '../i18n';
import { theme } from '../theme';
import { DEFAULT_LOCALE } from '../modules/locales/';
import { Loader } from '../components/';


export class App extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    startup: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.startup();
  }

  render() {
    return (
      <Fragment>
        <CssBaseline />
        <Helmet
          titleTemplate="%s - Service Worker App"
          defaultTitle="Devtalk"
          meta={[
            { name: 'description', content: 'Service Worker App' },
          ]}
        />

        <IntlProvider
          locale={DEFAULT_LOCALE}
          messages={translationMessages[DEFAULT_LOCALE]}
          location={this.props.location}
        >
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <MuiThemeProvider theme={theme}>
              <ThemeProvider theme={theme}>
                <Fragment>
                  <Loader />
                  {React.Children.only(this.props.children)}
                </Fragment>
              </ThemeProvider>
            </MuiThemeProvider>
          </MuiPickersUtilsProvider>
        </IntlProvider>
      </Fragment>
    );
  }
}
