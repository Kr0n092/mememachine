import Link from 'next/link';

const NavBar = () => (
    <div>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark sticky-top mb">
            <Link href="/"><a className="nav-item nav-link">MemeMachine</a></Link>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#TopNavbar" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="TopNavbar">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link href="/favorites" prefetch><a className="nav-item nav-link">Favorites</a></Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/upload"><a className="nav-item nav-link">Upload a Meme</a></Link>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
);

export default NavBar;