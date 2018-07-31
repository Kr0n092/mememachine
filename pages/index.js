import React from "react";
import Home from "../components/Home";
import axios from "axios";
import Head from "next/head";
import MainLayout from "../layouts/main";
import ScrollButtons from "../components/ScrollButtons";

export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    static async getInitialProps({ req }) {
        const res = await axios.get("https://localhost:3000/memes/", {
            params: {
                from: 1,
                to: 11
            }
        });
        const loadFrom = 11;
        const loadUpTo = 21;
        const memes = res ? res.data : "undefined";
        return { memes, loadFrom, loadUpTo }
    }

    componentDidMount() {
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register('/service-worker.js')
            .then(() => console.log("[SW INSTALLED]") )
            .catch((err) => console.error("[SW ERROR]", err) );
        } else {
            console.log("[SW NOT SUPPORTED]");
        }
    }
    
    render() {
        return (
            <div>
                <Head>
                    <link rel="preload" href="/static/styles/index.css" as="style" />
                    <link rel="stylesheet" href="/static/styles/index.css" />
                </Head>
                <MainLayout>
                    <ScrollButtons />
                    <Home {...this.props} />
                </MainLayout>
            </div>
        )
    }
}