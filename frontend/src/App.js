import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Navbarcmp } from "./components";
import { Main, Suggestion, About } from "./pages";

function App() {
  return (
    <Router>
      <Navbarcmp />
      <br />
      <Route path="/" exact component={Main} />
      <Route path="/suggestion" exact component={Suggestion} />
      <Route path="/about" exact component={About} />
      {/* <Route path="/about" render={(props) => <CrawlAbout {...props} background={style.background} />}/>  */}
    </Router>
  );
}

export default App;
