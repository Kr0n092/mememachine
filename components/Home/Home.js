import React from 'react';
import axios from "axios";
import InfiniteScroll from 'react-infinite-scroller';
import getConfig from "next/config";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        const { serverConfig, publicRuntimeConfig } = getConfig();
        this.state = {
            memes: [],
            hasMoreItems: true,
            isLoading: false,
            config: publicRuntimeConfig,
            propsUsed: false
        };

        this.displayItems = this.displayItems.bind(this);
        this.favoriteMeme = this.favoriteMeme.bind(this);
        this.getLimits = this.getLimits.bind(this);
    }

    getLimits(page) {
        let lowerLimit = 1;
        let upperLimit = 11;
        if (!this.state.config.USE_PRELOAD_IMAGES) {
            page -= 1;
        }
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
        let loadFrom = limits.lower;
        let loadUpTo = limits.upper;
        const scheme = !self.state.config.USE_HTTPS || !self.state.config.USE_HTTP2 ? "http": "https";
        const url = `${scheme}://localhost:${self.state.config.PORT}/memes`;
        let params = {
            from: loadFrom,
            to: loadUpTo
        };
        if (!self.state.config.USE_LAZY_LOAD) {
            loadFrom = self.state.config.USE_PRELOAD_IMAGES ? 11 : 1;
            loadUpTo = 810;
            params = {
                from: loadFrom
            };
        }
        if (loadUpTo+10 >= 810) {
            self.setState({
                hasMoreItems: false
            });
        }

        axios.get(url, {
            params: params
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
        const self = this;
        if (this.state.config.USE_PRELOAD_IMAGES) {
            this.setState({
                memes: this.props.memes,
                propsUsed: true
            });
        } else {
            console.log("preload not used, fetch data for first page");
            self.fetchData(0);
        }
    }

    displayItems(memes) {
        const memeList = [];
        if (memes) {
            memes.map(meme => {
                if (meme) {
                    memeList.push(
                        <tr>
                        <div key={meme.id}>
                            <td><img src={meme.image} alt={meme.title} /></td>
                            <td><button onClick={() => this.favoriteMeme(meme.id)}>
                                Mark as favorite
                            </button>
                            </td>
                        </div>
                        </tr>
                    );
                }
            });
        } else if (!memes && this.state.memes.length === 0) {
            this.fetchData(0);
        }
        return memeList;
    }

    favoriteMeme(id) {
        const self = this;
        if (!id) {
            return;
        }
        const scheme = !self.state.config.USE_HTTPS || !self.state.config.USE_HTTP2 ? "http": "https";
        axios.get(`${scheme}://localhost:${self.state.config.PORT}/favorite`, {
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
            this.setState({ hasMoreItems: (this.state.memes.length < 810) });
        }
    }

    render() {
        let memes = this.state.config.USE_PRELOAD_IMAGES ? this.displayItems(this.props.memes) : this.displayItems(this.state.memes);
        const loader = <div className="loader" key={0}>Loading ...</div>;
        return (
            <div>
                <h1>Memes</h1>
                <table id="wrapper">
                    <InfiniteScroll
                        loadMore={this.fetchData.bind(this)}
                        hasMore={this.state.hasMoreItems}
                        isLoading={this.state.isLoading}
                        loader={loader}>
                        {memes}
                    </InfiniteScroll>
                </table>
            </div>
        )
    }
}