import "./App.css";
import CanvasBoard from "./Pages/CanvasBoard";
import Homepage from "./Pages/Homepage";
import { Routes, Route } from "react-router-dom";
import Logo from "@/components/custom/Logo";
import "/i18n";
import Intro from "./Pages/Intro";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./components/custom/LanguageSelector";

function App() {
    const { i18n } = useTranslation();

    useEffect(() => {
        // Aggiorna l'attributo lang dell'HTML quando cambia la lingua
        document.documentElement.lang = i18n.language;
    }, [i18n.language]);

    return (
        <>
            <LanguageSelector />
            <Routes>
                <Route
                    path="/"
                    element={<Homepage />}
                    // element={<Intro />}
                />
                <Route
                    path="/editor"
                    element={<CanvasBoard />}
                />
                <Route
                    path="/animation"
                    element={<Logo />}
                />
            </Routes>
        </>
    );
}

export default App;
