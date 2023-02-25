import { Routes, Route, Navigate } from "react-router-dom";

// Hook
import { useAuthContext } from "./hooks/useAuthContext";

// Pages
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Admin from "./pages/Admin/Admin";
import Publish from "./pages/Publish/Publish";
import Member from "./pages/Member/Member";

function App(){
    const { alreadyLogin, user } = useAuthContext();

    return(
        <>
            {alreadyLogin && (
                <Routes>
                    <Route path="/" element={ !user ? <Home /> : <Navigate to="/admin" replace />} />
                    <Route path="/login" element={ !user ? <Login /> : <Navigate to="/admin" replace /> } />
                    <Route path="/signup" element={ !user ? <Signup /> : <Navigate to="/admin" replace /> } />
                    <Route path="/admin" element={ user ? <Admin /> : <Navigate to="/" replace /> } />
                    <Route path="/member" element={ user ? <Member /> : <Navigate to="/" replace /> } />
                    <Route path="/:user" element={ <Publish /> } />
                </Routes>
            )}
        </>
    )
}

export default App