import Home from './Home';
import Post from './Post';
import Contact from './Contact';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import './App.css'
import Layout from './Layout';

const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />}/>
        <Route path='/posts/:id' element={<Post />}/>
        <Route path='/contact' element={<Contact />} />
      </Route>
    </>
  )
);


function App() {
  return (
    <RouterProvider router={routes} />
  );
}

export default App
