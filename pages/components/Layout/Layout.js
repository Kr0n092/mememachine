/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Head from "next/head";
import Header from '../Header';

class Layout extends React.Component {


  render() {
    return (
      <div>
        <Head>
          <link rel="preload" href="/static/styles/Layout.css" as="style" />
          <link rel="stylesheet" href="/static/styles/Layout.css" />
        </Head>
        <Header />
        {this.props.children}
      </div>
    );
  }
}

export default Layout
