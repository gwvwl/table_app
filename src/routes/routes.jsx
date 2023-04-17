import SignIn from "../Components/PublicRoutes/SignIn/SignIn";
import Main from "../Components/PrivateRoutes/Main";

import { LOGIN_ROUTE, MAIN_ROUTE } from "./constRout";

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        element: <SignIn />,
    },
];

export const privateRoutes = [
    {
        path: MAIN_ROUTE,
        element: <Main />,
    },
];
