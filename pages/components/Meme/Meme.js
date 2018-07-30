import React from "react";
import PropTypes from "prop-types";

export default class Meme extends React.Component {
    static contextTypes = { fetch: PropTypes.func.isRequired };

    constructor(props) {
        super(props);
        if (!this.props.meme.image) {
            this.state = {
                id: this.props.meme.id,
                title: this.props.meme.title,
                image: `${process.env.PUBLIC_URL}/defaultMeme.png`
            }
        } else {
            this.state = {
                id: this.props.meme.id,
                title: this.props.meme.title,
                image: this.props.meme.image
            }
        }
        
        this.favoriteMeme = this.favoriteMeme.bind(this);
    }

    favoriteMeme() {
        const self = this;
        if (!self.state.id) {
            return;
        }
        const url = `/favorite?id=${self.state.id}`
        self.context.fetch(url, { method: 'GET' });
    }

    render() {
        return (
            <div>
                <img src={this.state.image} alt={this.state.title} />
                <button onClick={this.favoriteMeme}>
                    Mark as favorite
                </button>
            </div>
        )
    }
}