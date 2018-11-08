import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { IntlProvider } from 'react-intl';

import { translationMessages } from '../i18n';
import { DEFAULT_LOCALE } from '../modules/locales/locales.redux';
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
          <Fragment>
            <Loader />
            {React.Children.only(this.props.children)}
          </Fragment>
        </IntlProvider>
      </Fragment>
    );
  }
}
