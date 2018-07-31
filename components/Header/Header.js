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
import Navigation from "../Navigation";

class Header extends React.Component {
        
    render() {
        return (
            <div className="root">
                <div className="container">
                    <Head>
                        <link rel="preload" href="/static/styles/Header.css" as="style" />
                        <link rel="stylesheet" href="/static/styles/Header.css" />
                    </Head>
                    <Navigation />
                    <Link className="brand" href="/">
                        <a><span className="brandTxt">MemeMachine</span></a>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Header;
