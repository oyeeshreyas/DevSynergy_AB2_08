
import './App.css'
import Login from './auth/Login'
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom"
import Signup from './auth/Signup'
import ForgotPassword from './auth/ForgotPassword.'
import ResetPassword from './auth/ResetPassword'
import VerifyEmail from './auth/VerifyEmail'
import HeroSection from './components/HeroSection'
import MainLayout from './layout/MainLayout'
import Profile from './components/Profile'
import SearchPage from './components/SearchPage'
import Cart from './components/Cart'
import RestaurantDetail from './components/RestaurantDetail'
import Restaurant from './admin/Restaurant'
import AddMenu from './admin/AddMenu'
import Orders from './admin/Order'
import Success from './components/Success'
import { useUserStore } from './store/useUserStore'
import { useEffect } from 'react'
import { useThemeStore } from './store/useThemeStore'
import Chat from './components/Chat'


const ProtectedRoutes = ({children}:{children:React.ReactNode}) => {
  const {isAuthenticated, user} = useUserStore();
  if(!isAuthenticated){
    return <Navigate to="/login" replace/>
  }

  if(!user?.isVerified){
    return <Navigate to="/verify-email" replace/>
  }
  return children;
}

const AuthenticatedUser = ({children}:{children:React.ReactNode}) => {
  const {isAuthenticated, user} = useUserStore();
  if(isAuthenticated && user?.isVerified){
    return <Navigate to="/" replace/>
  }
  return children;
};

const AdminRoute = ({children}:{children:React.ReactNode}) => {
  const {isAuthenticated, user} = useUserStore();
  if(!isAuthenticated){
    return <Navigate to="/login" replace/>
  }
  if(!user?.admin){
    return <Navigate to="/login" replace/>
  }
  return children;
}

const appRouter = createBrowserRouter([
  {
    path: "/",
    element : <ProtectedRoutes><MainLayout/></ProtectedRoutes>,
    children:[
      {
        path: "/",
        element:<HeroSection/>
      },
      {
        path: "/profile",
        element:<Profile/>
      },
      {
        path: "/search",
        element:<SearchPage/>
      },
      {
        path: "/cart",
        element:<Cart/>
      },
      {
        path: "/restaurant/:id",
        element:<RestaurantDetail/>
      },
      {
        path: "/order/status",
        element:<Success/>
      },
      {
        path:"/chat",
        element:<Chat/>
      },
      //ADMIN
      {
        path: "/admin/restaurant",
        element:<AdminRoute><Restaurant/></AdminRoute>,
      },
      {
        path: "/admin/menu",
        element:<AdminRoute><AddMenu/></AdminRoute>,
      },
      {
        path: "/admin/orders",
        element:<AdminRoute><Orders/></AdminRoute>,
      },

      
    ]
  },
  {
    path: "/login",
    element:<AuthenticatedUser><Login/></AuthenticatedUser>,
  },
{
  path: "/signup",
  element:<AuthenticatedUser><Signup/></AuthenticatedUser>,
},
{
  path: "/forgot-password",
  element:<AuthenticatedUser><ForgotPassword/></AuthenticatedUser>,
},
{
  path: "/reset-password",
  element:<ResetPassword/>
},
{
  path: "/verify-email",
  element:<VerifyEmail/>
},
])

function App() {
  const initializeTheme = useThemeStore((state:any) => state.initializeTheme);
const {checkAuthentication , isCheckingAuth} = useUserStore();
//CHECKING AUTH EVERY TIME WHEN PAGE IS LOADED
useEffect(()=> {
  checkAuthentication();
  initializeTheme();
},[checkAuthentication])

  if(isCheckingAuth) return
  return (
    <main>
      <RouterProvider router={appRouter}>

      </RouterProvider>
    </main>
  )
}

export default App
