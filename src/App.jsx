import "./App.css";
import CanvasBoard from "./Pages/CanvasBoard";
import Homepage from "./Pages/Homepage";
import { Routes, Route } from "react-router-dom";

function App() {
    console.log("location: ", location.pathname);
    return (
        <Routes location={location}>
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
