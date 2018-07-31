import React from "react";
import FavoriteList from "../components/FavoriteList";
import Head from "next/head";
import MainLayout from "../layouts/main";
import ScrollButtons from "../components/ScrollButtons/ScrollButtons";

export default class extends React.Component {

    render() {
        return (
            <div>
                <Head>
                    <link rel="preload" href="/static/styles/FavoriteList.css" as="style" />
                    <link rel="stylesheet" href="/static/styles/FavoriteList.css" />
                </Head>
                <MainLayout>
                    <ScrollButtons />
                    <FavoriteList />
                </MainLayout>
            </div>
        )
    }
}