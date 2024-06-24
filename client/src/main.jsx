import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistore } from "./redux/store.js";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import React from "react";

import App from "./App.jsx";
import "./index.css";

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
