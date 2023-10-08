import Login from "@Pages/Login";
import Register from "@Pages/Register";
import ConfirmPassword from "@Pages/ConfirmPassword";
import ResetPassword from "@Pages/ResetPassword";

export const routes = [
    { 
        title : "Landing Page",
        layout : "Landing",
        pages : [
            {
                name : "Landing",
                path : "/", 
                element : null
            }
        ] 
    },
    {
        title: "Auth Page",
        layout : "Auth",
        pages : [
            {   
                name: "Login",
                path: "/login",
                element: <Login />
            }, 

            {   
                name: "ConfirmPassword",
                path: "/confirm-password",
                element: <ConfirmPassword />
            }, 

            {   
                name: "ResetPassword",
                path: "/reset-password",
                element: <ResetPassword />
            }, 

            {
                name: "Register",
                path: "/register",
                element : <Register />
            }
        ]
    },
    {
        title: "Dashboard Page",
        layout : "Dashboard",
        pages : [
            {
                title : "Human Resource",
                layout: "Dashboard",
                pages : [
                    {
                        name: "",
                        path: "",
                        element: null
                    },
                    {
                        name: "",
                        path: "",
                        element: null
                    }
                ]
            }, 
            {
                title : "Employee",
                layout: "Dashboard",
                pages : [
                    {
                        name: "",
                        path: "",
                        element: null
                    },
                    {
                        name: "",
                        path: "",
                        element: null
                    }
                ]
            }
        ]
    }
];