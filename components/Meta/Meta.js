import React from 'react';
import NavBar from '../NavBar';

export default class Meta extends React.Component {

  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
        {this.props.head}
        <NavBar />
      </div>
    );
  }
}