/*=============================================== Routes ===============================================*/

// import { Navigate } from "react-router-dom"
import { ProtectedRoute, AnonRoute, PATHS } from "routes"
import { Homepage } from "pages/Homepage"
import { NotFound } from "pages/NotFound"
import { AllUsers, PublicProfile } from "pages/user"
import {
    Signup,
    ThankYou,
    Verify,
    Login,
    ForgotPassword,
    ForgotSent,
    ResetPassword,
    Goodbye,
} from "pages/auth"
import { MyAccount, EditAccount, EditPassword } from "pages/account"
// prependImport

type Route = {
    path: string
    element: JSX.Element
}

const redirects: Array<Route> = [
    // {
    //     path: "",
    //     element: <Navigate to="" />,
    // },
]

export const routes: Array<Route> = [
    { path: PATHS.ROOT, element: <Homepage /> },
    { path: "*", element: <NotFound /> },

    { path: PATHS.USERS, element: <AllUsers /> },
    { path: PATHS.USER(), element: <PublicProfile /> },

    {
        path: PATHS.SIGNUP,
        element: (
            <AnonRoute>
                <Signup />
            </AnonRoute>
        ),
    },
    { path: PATHS.THANK_YOU, element: <ThankYou /> },
    { path: PATHS.VERIFY, element: <Verify /> },
    {
        path: PATHS.LOGIN,
        element: (
            <AnonRoute>
                <Login />
            </AnonRoute>
        ),
    },
    {
        path: PATHS.FORGOT_PASSWORD,
        element: (
            <AnonRoute>
                <ForgotPassword />
            </AnonRoute>
        ),
    },
    {
        path: PATHS.FORGOT_PASSWORD_SENT,
        element: (
            <AnonRoute>
                <ForgotSent />
            </AnonRoute>
        ),
    },
    {
        path: PATHS.RESET_PASSWORD,
        element: (
            <AnonRoute>
                <ResetPassword />
            </AnonRoute>
        ),
    },
    {
        path: PATHS.GOODBYE,
        element: (
            <AnonRoute>
                <Goodbye />
            </AnonRoute>
        ),
    },

    {
        path: PATHS.MY_ACCOUNT,
        element: (
            <ProtectedRoute>
                <MyAccount />
            </ProtectedRoute>
        ),
    },
    {
        path: PATHS.EDIT_ACCOUNT,
        element: (
            <ProtectedRoute>
                <EditAccount />
            </ProtectedRoute>
        ),
    },
    {
        path: PATHS.EDIT_PASSWORD,
        element: (
            <ProtectedRoute>
                <EditPassword />
            </ProtectedRoute>
        ),
    },

    // prependRoute

    ...redirects,
]
