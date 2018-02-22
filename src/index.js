import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import UltimateTTT from './App';
import Game from './game'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<UltimateTTT />, document.getElementById('root'));
registerServiceWorker();

export {
  Game,
  UltimateTTT,
}