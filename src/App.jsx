import "./App.css";
import CanvasBoard from "./Pages/CanvasBoard";
import Homepage from "./Pages/Homepage";
import { Routes, Route } from "react-router-dom";
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
        </Routes>
    );
}

export default App;
