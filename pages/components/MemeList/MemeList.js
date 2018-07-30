import React from 'react';
import Meme from "../Meme";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroller";


export default class MemeList extends React.Component {
    state = {
        memes: [],
        loadFrom: 1,
        loadUpTo: 11,
        hasMoreItems: true,
        isLoading: false

    }
    static contextTypes = { fetch: PropTypes.func.isRequired };

    fetchData(page) {
        const self = this;
        self.setState({
            isLoading: true
        });
        if (self.state.loadUpTo+10 >= 820) {
            self.setState({
                loadUpTo: 820,
                hasMoreItems: false
            });
        }
        const url = `/memes/?from=${this.state.loadFrom}&to=${this.state.loadUpTo}`;
        self.setState({
            loadFrom: this.state.loadUpTo,
            loadUpTo: this.state.loadUpTo + 10
        });

        this.context.fetch(url, {method: 'GET'} )
        .then(res => res.json())
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
        .catch(error => console.log(`error: ${error}`));

    }
    componentDidMount() {
        this.fetchData();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.hasMoreItems !== this.state.hasMoreItems) {
            this.setState({ hasMoreItems: (this.state.memes.length < 820) });
        }
    }

    render() {
        const loader = <div className="loader">Loading ...</div>;
        let tiles;
        if(this.state.memes) {
            tiles = this.state.memes.map(meme => {
                return (
                    <Meme meme={meme} />
                );
            });
        }
        return (
            <div className="MemeList">    
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