
import Router, {Route, NotFoundRoute, DefaultRoute} from "react-router";

import App from "./App.jsx";
import Login from "./components/account/Login.jsx";
import Home from "./components/Home.jsx";
import Polls from "./components/polls/index.jsx";
import PollView from "./components/polls/View.jsx";
import NotFound from "./components/NotFound.jsx";

const routes = (
  <Route name="root" handler={App} path="/">
    <Route path="/" name="home" handler={Home} />

    <Route path="/login" name="login" handler={Login} />

    <Route path="/polls" name="polls" handler={Polls} />
    <Route path="/polls/:id" name="poll" handler={PollView} />

    <Route path="/notfound" name="notfound" handler={NotFound} />
    <NotFoundRoute handler={NotFound} />
    <DefaultRoute handler={Home}/>
  </Route>
);

window.app.router = Router
/*
  .create({
    routes: routes,
    scrollBehavior: Router.ScrollToTopBehavior
  })
*/
  .run(routes, Router.HistoryLocation, function (Handler) {
    React.render(<Handler/>, document.getElementById("app"));
  });

window.app.handleError = function(code, err){
  if (!window.user){
    window.app.router.transitionTo("login");
    return;
  }

  switch (code){
    case 404:
      window.app.router.transitionTo("notfound");
      break;
    default:
      console.error("Unhandled Error");
      console.dir(err);
      break;
  }
};
