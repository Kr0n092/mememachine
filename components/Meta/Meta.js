import React from 'react';
import Head from "next/head";
import NavBar from '../NavBar';


export default class Meta extends React.Component {
  render() {
    return (
      <div>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          {/* Bootstrap */}
          <link rel="preload" href="https://code.jquery.com/jquery-3.3.1.slim.min.js" as="script" />
          <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
          <link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" as="script"/>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>

          <link rel="preload" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" as="style" crossorigin="anonymous" />
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous" />
          <link rel="preload" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" as="script" crossorigin="anonymous" />
          <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
          <link rel="stylesheet" href="/static/styles/Layout.css" />
          {/* Google font */}
          <link rel="preload" href="https://fonts.gstatic.com/s/hanaleifill/v6/fC1mPYtObGbfyQznIaQzPQi8UAjA.woff2" as="font" crossorigin="anonymous"/> 
          <link rel="stylesheet" href="https://fonts.gstatic.com/s/hanaleifill/v6/fC1mPYtObGbfyQznIaQzPQi8UAjA.woff2" type="font/woff2" /> 
        </Head>
        <NavBar />
      </div>
    );
  }
}