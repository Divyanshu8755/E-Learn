import React from 'react'
import "./App.css"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './pages/home/Home'
import Header from './components/header/Header'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Verify from './pages/auth/Verify'
import Footer from './components/footer/Footer'
import About from './pages/about/About'
import Account from './pages/account/Account'
import { UserData } from './context/UserContext'
import Loading from './components/loading/Loading'
import Courses from './pages/courses/Courses'
import CourseDescription from './pages/coursedescription/CourseDescription'
import Dashboard from './pages/dashboard/Dashboard'
import CourseStudy from './pages/coursestudy/CourseStudy'
import Lecture from './pages/lecture/Lecture'

const App = () => {
  const {isAuth,user,loading}=UserData()
  return <>
    {loading ? <Loading/>:<BrowserRouter>
      <Header isAuth={isAuth}></Header>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path='/courses' element={<Courses/>}></Route>
        <Route path="/account" element={isAuth ? <Account user={user}/> : <Login/>}></Route>
        <Route path="/login" element={isAuth ? <Home/>:<Login/> }></Route>
        <Route path="/register" element={isAuth ? <Home/>:<Register/>}></Route>
        <Route path="/verify" element={isAuth ? <Home/>:<Verify/>}></Route>
        <Route path="/course/:id" element={isAuth?<CourseDescription user={user}></CourseDescription>:<Login></Login>}/>
        <Route path="/:id/dashboard" element={isAuth?<Dashboard user={user}></Dashboard>:<Login></Login>}/>
        <Route path="course/study/:id" element={isAuth?<CourseStudy user={user}></CourseStudy>:<Login></Login>}/>
        <Route path="lectures/:id" element={isAuth?<Lecture user={user}></Lecture>:<Login></Login>}/>
      </Routes>
      <Footer></Footer>
    </BrowserRouter>}
  </>
}

export default App