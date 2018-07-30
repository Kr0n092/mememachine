import React from 'react';
import Head from "next/head";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroller";

export default class FavoriteList extends React.Component {
    state = {
        memes: [],
        totalLoaded: 0,
        hasMoreItems: true,
        isLoading: false,
        noMoreMemes: false,
        loader: <div className="loader">Loading ...</div>

    }
    static contextTypes = { fetch: PropTypes.func.isRequired };

    fetchData(page) {
        const self = this;
        self.setState({
            isLoading: true
        });
        
        const url = `favorites?id=${self.state.totalLoaded}`;
        
        this.context.fetch(url, { method: 'GET' })
        .then(res => { 
            if (res.status !== 200) {
                return "";
            } else { 
                return res.blob()
            }
        })
        .then(result => {
            if (!result) {
                self.setState({ isLoading: false, noMoreMemes: true, loader: <div className="loader">No more favorites</div> });
            } else {
                const memeURL = URL.createObjectURL(result);
                const memes = self.state.memes;
                memes.push(memeURL);
                let totalLoaded = self.state.totalLoaded;
                totalLoaded++;
                self.setState({ isLoading: false, hasMoreItems: false, memes: memes, totalLoaded: totalLoaded });
            }
        })
        .catch(error => console.log(`error: ${error}`));

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.hasMoreItems !== this.state.hasMoreItems) {
            this.setState({ hasMoreItems: (!this.state.noMoreMemes)});
        }
    }

    render() {
        const loader = this.state.loader;
        let tiles;
        if(this.state.memes) {
            tiles = this.state.memes.map(memeURL => {
                return (
                    <img src={memeURL} />
                );
            });
        }
        return (
            <div>
                <Head>
                    <link rel="preload" href="/static/styles/FavoriteList.css" as="style" />
                    <link rel="stylesheet" href="/static/styles/FavoriteList.css" />
                </Head>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.fetchData.bind(this)}
                    hasMore={this.state.hasMoreItems}
                    isLoading={this.state.isLoading}
                    loader={loader}>
                    {tiles}
                </InfiniteScroll>           

            </div>
        )
    }
}