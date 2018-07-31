/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Link from 'next/link';
import Head from "next/head";

//import UploadModal from '../UploadModal';

class Navigation extends React.Component {
  render() {
    return (
      <div className="root">
        <Head>
          <link rel="preload" href="/static/styles/Navigation.css" as="style" />
          <link rel="stylesheet" href="/static/styles/Navigation.css" />
        </Head>
        {/* <Link to="#">
          <UploadModal/>
        </Link> */}
        <Link className="link" href="/favorites" prefetch>
          <a>Favorites</a>
        </Link>
        <Link className="link" href="/upload">
          <a>Upload a meme</a>
        </Link>
      </div>
    );
  }
}

export default Navigation;
