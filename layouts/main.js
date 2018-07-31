import Meta from '../components/Meta'
import NavBar from '../components/NavBar';

export default ({ children }) => (
  <div>
    <Meta />
    <NavBar />
    { children }
  </div>
)