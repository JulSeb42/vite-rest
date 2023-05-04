/*=============================================== Routes ===============================================*/

// import { Navigate } from "react-router-dom"

import { ProtectedRoute } from "routes/ProtectedRoute"
import { AnonRoute } from "routes/AnonRoute"

import { Homepage } from "pages/Homepage"
import { NotFound } from "pages/NotFound"

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

import { PublicProfile, AllUsers } from "pages/user"

type RouteType = {
    path: string
    element: JSX.Element
    edit?: boolean
}

const redirects: RouteType[] = [
    // {
    //     path: "",
    //     element: <Navigate to="" />
    // },
]

export const routes: RouteType[] = [
    {
        path: "/",
        element: <Homepage />,
    },
    {
        path: "*",
        element: <NotFound />,
    },

    {
        path: "/users",
        element: <AllUsers />,
    },
    {
        path: "/users/:id",
        element: <PublicProfile />,
    },

    {
        path: "/signup",
        element: (
            <AnonRoute>
                <Signup />
            </AnonRoute>
        ),
    },
    {
        path: "/thank-you",
        element: <ThankYou />,
    },
    {
        path: "/verify/:token/:id",
        element: <Verify />,
    },
    {
        path: "/login",
        element: (
            <AnonRoute>
                <Login />
            </AnonRoute>
        ),
    },
    {
        path: "/login/forgot-password",
        element: (
            <AnonRoute>
                <ForgotPassword />
            </AnonRoute>
        ),
    },
    {
        path: "/login/forgot-password/email-sent",
        element: (
            <AnonRoute>
                <ForgotSent />
            </AnonRoute>
        ),
    },
    {
        path: "/reset-password/:token/:id",
        element: (
            <AnonRoute>
                <ResetPassword />
            </AnonRoute>
        ),
    },
    {
        path: "/goodbye",
        element: (
            <AnonRoute>
                <Goodbye />
            </AnonRoute>
        ),
    },

    {
        path: "/my-account",
        element: (
            <ProtectedRoute>
                <MyAccount />
            </ProtectedRoute>
        ),
    },
    {
        path: "/my-account/edit",
        element: (
            <ProtectedRoute>
                <EditAccount />
            </ProtectedRoute>
        ),
    },
    {
        path: "/my-account/edit-password",
        element: (
            <ProtectedRoute>
                <EditPassword />
            </ProtectedRoute>
        ),
    },

    ...redirects,
]
