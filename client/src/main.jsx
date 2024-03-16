import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
// import store, { persistConfig } from "./redux/store.js";
import { store, persistore } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <PersistGate loading={null} persistor={persistore}>
        <Provider store={store}>
          <App />
        </Provider>
      </PersistGate>
    </QueryClientProvider>
  </React.StrictMode>
);
