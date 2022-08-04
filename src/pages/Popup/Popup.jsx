import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import 'react-loading-skeleton/dist/skeleton.css';
import './Popup.css';
import '../../assets/css/bootstrap.min.css';
import Home from './screens/Home';
import ImageDetail from './screens/ImageDetail';
import { ROUTER_NAME } from '../../constants';

const Popup = () => {
  return (
    <div className='main'>
      <Router>
        <Switch>
          <Route path={ROUTER_NAME.IMAGE_DETAIL} component={ImageDetail} />
          <Route path={ROUTER_NAME.HOME} component={Home} />
        </Switch>
      </Router>
    </div>
  );
};


export default Popup;
