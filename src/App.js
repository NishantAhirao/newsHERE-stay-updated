import Navbar from './components/Navbar'
import News from './components/News'
import LoadingBar from 'react-top-loading-bar'
import { useState } from 'react';

import './App.css';

import {BrowserRouter as Router,Switch,Route} from "react-router-dom";

function App() {

  const [progress, setProgress] = useState(0);
  let pageSizeVar = 3;
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
        <Switch>
            <Route exact  path="/"><News setProgress={setProgress} key="home0" pageSize={pageSizeVar} country = {"in"} category={"general"}/></Route>
            <Route exact  path="/science">< News setProgress={setProgress} key="science1" pageSize={pageSizeVar} country = {"in"} category={"science"}/></Route>
            <Route exact  path="/business"><News setProgress={setProgress} key="business2" pageSize={pageSizeVar} country = {"in"} category={"business"}/></Route>
            <Route exact  path="/sports"><News setProgress={setProgress} key="sports3" pageSize={pageSizeVar} country = {"in"} category={"sports"}/></Route>
            <Route exact  path="/entertainment"><News setProgress={setProgress} key="entertainment4" pageSize={pageSizeVar} country = {"in"} category={"entertainment"}/></Route> 
            <Route exact  path="/technology"><News setProgress={setProgress} key="technology5" pageSize={pageSizeVar} country = {"in"} category={"technology"}/></Route>
            <Route exact  path="/health">< News setProgress={setProgress} key="health6" pageSize={pageSizeVar} country = {"in"} category={"health"}/></Route>
            <Route exact  path="/general"><News setProgress={setProgress} key="general7" pageSize={pageSizeVar} country = {"in"} category={"general"}/></Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
