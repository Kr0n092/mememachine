import App, {Container} from 'next/app';
import React from 'react';
import Layout from "./components/Layout";
import Head from "next/head";

export default class MyApp extends App {
  
  render () {
    const {Component, pageProps} = this.props
    return (
      <div>
        
        <Container>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Container>
      </div>
    )
  }
}