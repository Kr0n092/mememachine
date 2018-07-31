import React from 'react';
import axios from "axios";
import InfiniteScroll from "react-infinite-scroller";

export default class FavoriteList extends React.Component {
    state = {
        memes: [],
        totalLoaded: 0,
        hasMoreItems: true,
        isLoading: false,
        noMoreMemes: false,
        loader: <div key={0} className="loader">Loading ...</div>

    }

    fetchData(page) {
        const self = this;
        self.setState({
            isLoading: true
        });
        
        axios.get('https://localhost:3000/favorites/', {
            params: {
                id: self.state.totalLoaded
            },
            responseType: 'blob'
        })
        .then(res => { 
            if (res.status !== 200) {
                return undefined;
            } else { 
                return res.data
            }
        })
        .then(result => {
            if (!result) {
                self.setState({ isLoading: false, noMoreMemes: true, hasMoreItems: false, loader: <div keuy={0} className="loader">No more favorites</div> });
            } else {
                const memeURL = URL.createObjectURL(result);
                const memes = self.state.memes;
                memes.push(memeURL);
                let totalLoaded = self.state.totalLoaded;
                totalLoaded++;
                self.setState({ isLoading: false, hasMoreItems: false, memes: memes, totalLoaded: totalLoaded });
            }
        })
        .catch(error => {
            console.log(`error: ${error}`);
            self.setState({
                isLoading: false, noMoreMemes: true, hasMoreItems: false, loader: <div key={0} className="loader">No more favorites</div>
            });
            console.log(this.state.hasMoreItems);
        });

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.hasMoreItems !== this.state.hasMoreItems) {
            this.setState({ hasMoreItems: (!this.state.noMoreMemes)});
        }
    }

    render() {
        const loader = this.state.loader;
        const tiles = [];
        if(this.state.memes) {
            this.state.memes.map(memeURL => {
                tiles.push(
                    <div key={memeURL}>
                        <img src={memeURL} />
                    </div>
                );
            });
        }
        return (
            <div>
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