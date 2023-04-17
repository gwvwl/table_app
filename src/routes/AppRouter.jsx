import React from "react";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes";
import { LOGIN_ROUTE } from "./constRout";
import { useAuth } from "../useHook/useAuth";

const AppRouter = () => {
    const { isAuth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth) {
            return navigate(LOGIN_ROUTE);
        }
    }, [isAuth]);

    return isAuth ? (
        <Routes>
            {privateRoutes.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
            ))}
        </Routes>
    ) : (
        <Routes>
            {publicRoutes.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
            ))}
        </Routes>
    );
};

export default AppRouter;
