import React from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import { authRoutes, publicRoutes } from "../routes";

const Auth = () => {
    const isAuth = false;
    return (
        <Routes>
            {isAuth && authRoutes.map(({path, Component}) =>
            <Route  path='/' element={<Component/>} exact/>
            )}
            {publicRoutes.map(({path, Component}) =>
            <Route  path='/' element={<Component/>} exact/>
            )}
        </Routes>
    )
}
export default Auth;