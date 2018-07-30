import React from "react";
import Home from "./components/Home";
import axios from "axios";
export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    static async getInitialProps({ req }) {
        const res = await axios.get("http://localhost:3000/memes/", {
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
    
    render() {
        return (
            <div>
                <Home {...this.props} />
            </div>
        )
    }
}