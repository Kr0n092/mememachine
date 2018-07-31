import React from "react";

export default class ScrollButtons extends React.Component {

    bodyOrHtml() {
        if ('scrollingElement' in document) {
            return document.scrollingElement;
        }
        if (navigator.userAgent.indexOf('WebKit') != -1) {
            return document.body;
        }
        return document.documentElement;
    }
    componentDidMount() {
        const scrollController = 'scrollingElement' in document ? document.scrollingElement : navigator.userAgent.indexOf('WebKit') != -1 ? document.body : document.documentElement;
        
        window.addEventListener('scroll', event => {
            const totalHeight = scrollController.scrollHeight;
            const clientHeight = scrollController.clientHeight;
            const scrollTop = scrollController.scrollTop;
            if (scrollTop > 20) {
                document.getElementById("topButton").style.display = "block";
            } else {
                document.getElementById("topButton").style.display = "none";
            }
            if (!(totalHeight - 500) <= (scrollTop + clientHeight)) {
                document.getElementById("bottomButton").style.display = "block";
            } else {
                document.getElementById("bottomButton").style.display = "none";
            }
        });
    }
    toTop() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
    toBottom() {
        window.scrollTo(0, document.body.scrollHeight ? document.body.scrollHeight : document.documentElement.scrollHeight);
    }
    render() {
        return(
            <div>
                <button onClick={() => this.toTop()} className="toSide" id="topButton" title="Go to top">Top</button>
                <button onClick={() => this.toBottom()} className="toSide" id="bottomButton" title="Go to next page">Next Page</button>
                <style jsx>
                    {`
                    .toSide {
                        position: fixed; /* Fixed/sticky position */
                        right: 30px; /* Place the button 30px from the right */
                        z-index: 99; /* Make sure it does not overlap */
                        border: none; /* Remove borders */
                        outline: none; /* Remove outline */
                        background-color: purple; /* Set a background color */
                        color: white; /* Text color */
                        cursor: pointer; /* Add a mouse pointer on hover */
                        padding: 15px; /* Some padding */
                        border-radius: 10px; /* Rounded corners */
                        font-size: 18px; /* Increase font size */
                    }
                    #topButton {
                        display: none; /* Hidden by default */
                        top: 50px; /* Place the button at the top of the page */
                    }
                    #topButton:hover {
                        background-color: #555; /* Add a dark-grey background on hover */
                    }
                    #bottomButton {
                        display: none; /* Hidden by default */
                        bottom: 50px; /* Place the button at the bottom of the page */
                    }
                    #bottomButton:hover {
                        background-color: #555; /* Add a dark-grey background on hover */
                    }
                    `}
                </style>
            </div>
        
        )
        
    }
}