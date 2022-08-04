import React from 'react';
import { render } from 'react-dom';

import Feedback from './Feedback';
import './index.css';

render(
  <Feedback />,
  window.document.querySelector('#app-container')
);

if (module.hot) module.hot.accept();
