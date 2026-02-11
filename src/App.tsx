import './App.css'
import HomePage from "./pages/HomePage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import {Route, Routes} from "react-router-dom";
import MainLayout from "./componetns/layouts/MainLayout";
import RegisterPage from "./pages/RegisterPage.tsx";
import TestPage from "./pages/TestPage.tsx";
<<<<<<< HEAD
import ProfilePage from "./pages/ProfilePage.tsx";

=======
>>>>>>> 2890e8572b2f5c2160006dafa022b3d70a68ae1f


function App() {

  return (
    <>
        <Routes>
            <Route path={"/"} element={<MainLayout/>}>
                <Route index element={<HomePage/>}/>
                <Route path={"login"} element={<LoginPage/>}/>
                <Route path={"register"} element={<RegisterPage/>}/>
<<<<<<< HEAD
                <Route path={"profile"} element={<ProfilePage/>}/>
=======
>>>>>>> 2890e8572b2f5c2160006dafa022b3d70a68ae1f
               <Route path={"test"} element={<TestPage/>}/>
            </Route>
        </Routes>
    </>
  )
}

export default App
