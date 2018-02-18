import * as React from 'react';
import '../App.css';

class SmallBoard extends React.Component {

  render() {
    return (
      <div className="tictactoeBoard">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => <div className="cell" key={i} />)}
      </div>
    );
  }
}

export default SmallBoard;
