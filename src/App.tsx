import React, { Suspense } from "react";
import { renderRoutes } from "react-router-config";
import router from "./router";
import { History } from "history";
import { ConnectedRouter } from "connected-react-router";
import Spinner from "./components/Spinner";

interface IApp {
  history: History;
}

function App(props: IApp) {
  return (
    <ConnectedRouter history={props.history}>
      <Suspense fallback={<Spinner />}>{renderRoutes(router)}</Suspense>
    </ConnectedRouter>
  );
}

export default App;
