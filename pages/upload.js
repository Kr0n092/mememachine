import React from "react";
import UploadMeme from "../components/UploadMeme";
import Head from "next/head";
import MainLayout from "../layouts/main";
import ScrollButtons from "../components/ScrollButtons/ScrollButtons";

export default class extends React.Component {

    render() {
        return (
            <div>
                <Head>
                    <link rel="preload" href="/static/styles/UploadMeme.css" as="style" />
                    <link rel="stylesheet" href="/static/styles/UploadMeme.css" />
                </Head>
                <MainLayout>
                    <ScrollButtons />
                    <UploadMeme />
                </MainLayout>
            </div>
        )
    }
}