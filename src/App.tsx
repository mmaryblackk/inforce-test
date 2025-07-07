import { Provider } from "react-redux";
import { Router } from "./router/router";
import { store } from "./app/store";

function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;
