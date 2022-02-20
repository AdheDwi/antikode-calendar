import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store";
import RoutesApp from "./Routes";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <RoutesApp />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
