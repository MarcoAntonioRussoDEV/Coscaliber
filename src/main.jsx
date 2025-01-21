import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./index.css";
// import "../resources/css/style.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./Redux/store";
import { BrowserRouter as Router } from "react-router";
import { I18nextProvider } from "react-i18next";
import i18n from "/i18n";

const basename = import.meta.env.VITE_BASENAME;

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
            <Router basename={basename}>
                <I18nextProvider
                    i18n={i18n}
                    initialI18nStore={i18n.store}
                >
                    <App />
                </I18nextProvider>
            </Router>
        </Provider>
    </StrictMode>
);
