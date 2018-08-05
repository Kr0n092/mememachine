import Link from 'next/link';
import getConfig from 'next/config';
import React from 'react';

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
        const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
        this.state = {
            config: publicRuntimeConfig
        };
    }
    render() {
        const favoriteLink = this.state.config.USE_PREFETCH ? <Link href="/favorites" prefetch><a className="nav-item nav-link">Favorites</a></Link> : <Link href="/favorites"><a className="nav-item nav-link">Favorites</a></Link>
        return (
            <div>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark sticky-top mb">
                    <Link href="/"><a className="nav-item nav-link">MemeMachine</a></Link>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#TopNavbar" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="TopNavbar">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                {favoriteLink}
                            </li>
                            <li className="nav-item">
                                <Link href="/upload"><a className="nav-item nav-link">Upload a Meme</a></Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}