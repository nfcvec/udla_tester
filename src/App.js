import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Assign from './components/Assign';
import Stepper from './components/Stepper';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/stepper/:processId" component={Stepper} />
        <Route path="/" component={Assign} />
      </Switch>
    </Router>
  );
};

export default App;
