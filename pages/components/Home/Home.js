import React from 'react';
import axios from "axios";
import InfiniteScroll from "react-infinite-scroller";
import Head from 'next/head';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            memes: [],
            hasMoreItems: true,
            isLoading: false
        };

        this.displayItems = this.displayItems.bind(this);
        this.favoriteMeme = this.favoriteMeme.bind(this);
        this.getLimits = this.getLimits.bind(this);
    }

    getLimits(page) {
        let lowerLimit = 1;
        let upperLimit = 11;
        for (let index = 0; index < page; index++) {
            lowerLimit = upperLimit;
            upperLimit += 10;
        }
        return {lower: lowerLimit, upper: upperLimit};
    }

    fetchData(page) {
        if (!page) return;
        const self = this;

        self.setState({
            isLoading: true
        });
        const limits = this.getLimits(page);
        const loadFrom = limits.lower;
        const loadUpTo = limits.upper;
        if (loadUpTo+10 >= 820) {
            self.setState({
                hasMoreItems: false
            });
        }
        axios.get("https://localhost:3000/memes/", {
            params: {
                from: loadFrom,
                to: loadUpTo
            }
        })
        .then(res => res.data)
        .then(memes => {
            const list = self.state.memes;
            memes.map(meme => {
                list.push(meme);
            });
            self.setState({
                memes: list
            });
            
            self.setState({
                hasMoreItems: false,
                isLoading: false
            });       
        })
        .catch(error => console.log(`error while fetching meme data`));
    }

    componentDidMount() {
        if (this.state.memes && this.props.memes) {
            this.setState({
                memes: this.props.memes
            });
        }
    }

    displayItems(memes) {
        const memeList = [];
        memes.map(meme => {
            if (meme) {
                memeList.push(
                    <div key={meme.id}>
                        <img className="img" src={meme.image} alt={meme.title} />
                        <button onClick={() => this.favoriteMeme(meme.id)}>
                            Mark as favorite
                        </button>
                    </div>
                )
            }
        });
        return memeList;
    }

    favoriteMeme(id) {
        if (!id) {
            return;
        }
        axios.get('https://localhost:3000/favorite', {
            params: {
                id: id
            }
        })
        .then(res => {
            console.log(`Status is ${res.status} ${res.statusText}`); //TODO display popup
        })
        .catch(error => `error while favoriting meme`);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.hasMoreItems !== this.state.hasMoreItems) {
            this.setState({ hasMoreItems: (this.state.memes.length < 820) });
        }
    }

    render() {
        let memes = this.state.memes.length === 0 ? this.displayItems(this.props.memes) : this.displayItems(this.state.memes);
        const loader = <div className="loader" key={0}>Loading ...</div>;
        return (
            <div>
                <Head>
                    <link rel="preload" href="/static/styles/index.css" as="style" />
                    <link rel="stylesheet" href="/static/styles/index.css" />
                </Head>
                <h1>Memes</h1>
                <InfiniteScroll
                    loadMore={this.fetchData.bind(this)}
                    hasMore={this.state.hasMoreItems}
                    isLoading={this.state.isLoading}
                    loader={loader}>
                    {memes}
                </InfiniteScroll>
            </div>
        )
    }
}