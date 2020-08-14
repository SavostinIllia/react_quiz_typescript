import React from "react";
import Layout from "./hoc/Layout/Layout";
import Quiz from "./containers/Quiz/Quiz";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <Layout>
      <Quiz />
    </Layout>
  );
};
export default App;
