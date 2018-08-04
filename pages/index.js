import React from "react";
import Home from "../components/Home";
import axios from "axios";
import Head from "next/head";
import MainLayout from "../layouts/main";
import ScrollButtons from "../components/ScrollButtons";
import NoSSR from "react-no-ssr";
import getConfig from "next/config";

export default class extends React.Component {
    constructor(props) {
        super(props);
        const {serverRuntimeConfig, publicRuntimeConfig} = getConfig();
        this.state = {
            config: publicRuntimeConfig
        };
    }

    static async getInitialProps({ req }) {
        const {serverRuntimeConfig, publicRuntimeConfig} = getConfig();
        let memes = undefined
        let loadFrom = 1;
        let loadUpTo = 11;
        if (publicRuntimeConfig.USE_PRELOAD_IMAGES) {
            const scheme = publicRuntimeConfig.USE_HTTP ? "http" : "https";
            const res = await axios.get(`${scheme}://localhost:${publicRuntimeConfig.PORT}/memes/`, {
                params: {
                    from: loadFrom,
                    to: loadUpTo
                }
            });
            loadFrom = 11;
            loadUpTo = 21;
            memes = res ? res.data : undefined;
        }
        return { memes, loadFrom, loadUpTo };
    }
    

    componentDidMount() {
        if (this.state.config.USE_SW && "serviceWorker" in navigator) {
            navigator.serviceWorker.register('/service-worker.js')
            .then(() => console.log("[SW INSTALLED]") )
            .catch((err) => console.error("[SW ERROR]", err) );
        } else {
            console.log("[SW NOT SUPPORTED]");
        }
    }
    
    render() {
        let body = 
        <NoSSR>
            <MainLayout>
                <ScrollButtons />
                <Home {...this.props} />
            </MainLayout>
        </NoSSR>
        if (this.state.config.USE_SSR) {
            body = 
            <MainLayout>
                <ScrollButtons />
                <Home {...this.props} />
            </MainLayout>
        }
        return (
            <div>
                <Head>
                    <link rel="stylesheet" href="/static/styles/index.css" />
                </Head>
                {body}
            </div>
        )
    }
}