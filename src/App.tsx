import React from "react";
import { Route, Switch, Redirect } from "react-router";
import Auth from "./containers/Auth/Auth";
import Quiz from "./containers/Quiz/Quiz";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import QuizList from "./containers/QuizList/QuizList";
import Layout from "./hoc/Layout/Layout";
import { useAuthContext } from "./context/authcontext/Authcontext";
import LogOut from "./components/LogOut/LogOut";

const App: React.FC = () => {
  const { isLoggedIn } = useAuthContext();
  let routes = (
    <Switch>
      <Route path="/auth" component={Auth} />
      <Route path="/quiz/:id" component={Quiz} />
      <Route path="/" component={QuizList} />
      <Redirect to="/" />
    </Switch>
  );

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/quiz-creator" component={QuizCreator} />
        <Route path="/quiz/:id" component={Quiz} />
        <Route path="/logout" exact component={LogOut} />
        <Route path="/" component={QuizList} />
        <Redirect to="/" />
      </Switch>
    );
  }
  return <Layout>{routes}</Layout>;
};
export default App;
