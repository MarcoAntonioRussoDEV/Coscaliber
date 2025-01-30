import "./App.css";
import CanvasBoard from "./Pages/CanvasBoard";
import Homepage from "./Pages/Homepage";
import { Routes, Route } from "react-router-dom";
import Logo from "@/components/custom/Logo";
import "/i18n";

function App() {
    return (
        <Routes>
            <Route
                path="/"
                element={<Homepage />}
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
    );
}

export default App;
