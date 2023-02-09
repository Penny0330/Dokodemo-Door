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

// redux
import { configureStore } from "@reduxjs/toolkit";
import allReducers from "./reducers";
import { Provider } from "react-redux";

function App(){
    const { alreadyLogin, user } = useAuthContext();

    const store = configureStore({ reducer: allReducers });

    return(
        <>
            {alreadyLogin && (
                <Provider store={store}>
                    <Routes>
                        <Route path="/" element={ !user ? <Home /> : <Navigate to="/admin" replace />} />
                        <Route path="/login" element={ !user ? <Login /> : <Navigate to="/admin" replace /> } />
                        <Route path="/signup" element={ !user ? <Signup /> : <Navigate to="/admin" replace /> } />
                        <Route path="/admin" element={ user ? <Admin /> : <Navigate to="/" replace /> } />
                        <Route path="/member" element={ user ? <Member /> : <Navigate to="/" replace /> } />
                        
                        <Route path="/:user" element={ <Publish /> } />
                    </Routes>
                </Provider>

            )}
        </>
    )
}

export default App