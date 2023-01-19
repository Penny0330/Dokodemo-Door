import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";

function App(){
    return(

        <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="/Login" element={ <Login /> } />
            <Route path="/Signup" element={ <Signup /> } />
            {/* <Route path="/ListPage" element={user ? <ListPage /> : <Navigate to="/" replace />} /> */}
        </Routes>

    )
}

export default App