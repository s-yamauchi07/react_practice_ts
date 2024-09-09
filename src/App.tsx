import Header from './Header';
import Home from './Home';
import Post from './Post';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import './App.css'

const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Home />}/>
      <Route path='/posts/:id' element={<Post />}/>
    </>
  )
);


function App() {
  return (
    <>
      <Header />
      <RouterProvider router={routes} />
    </>
  )
}

export default App
