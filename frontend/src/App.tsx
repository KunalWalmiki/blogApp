import './App.css'
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Blog from './pages/Blog'
import SingleBlog from './components/SingleBlog'
import CreateBlog from './pages/CreateBlog'
import PrivateRoute from './components/PrivateRoute'

function App() {

  return (
    <>

        <Routes>
                <Route path="/" element={<Signup/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route element={
                <PrivateRoute>
                  <Blog/>
                </PrivateRoute>  
                }> <Route  path="/blogs" element={<Blog/>}/></Route>
                <Route  element={
                <PrivateRoute>
                  <SingleBlog/>
                </PrivateRoute>  
               }> <Route path="/blog/:id" element={<SingleBlog/>}/></Route>
                <Route element={
                <PrivateRoute>
                  <CreateBlog/>
                </PrivateRoute>  
                }> <Route path={"/createBlog"} element={<CreateBlog/>}/> </Route>
        </Routes>
    </>
  )
}

export default App
