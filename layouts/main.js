import Meta from '../components/Meta'
import getConfig from 'next/config';

export default class MainLayout {

  render() {
    return (
      <div>
        <Meta />
        { this.props.children }
      </div>
    );
  }
}