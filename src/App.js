import Home from "./screens/Home";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Message from "./screens/Message";
import NoInternet from "./components/common/NoInternet";

function App() {
  return (
    <BrowserRouter>
      <NoInternet />
      <Switch>
        <Route exact path="/">
          <Home />
          {/* <Suspense fallback={<Loader />}>
                  <Home />
                </Suspense> */}
        </Route>
        <Route exact path="/message">
          <Message />
          {/* <Suspense fallback={<Loader />}>
                  <Home />
                </Suspense> */}
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
