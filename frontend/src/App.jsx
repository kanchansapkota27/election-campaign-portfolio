
import './App.css'
import AppLayout from './layouts/AppLayout'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Manifesto from './pages/Manifesto'
import Events from './pages/Events'
import Media from './pages/Media'
import Support from './pages/Support'
import About from './pages/About'
import Contact from './pages/Contact'
import Documents from './pages/Documents'

function App() {


  return (
    <Routes>
      <Route path='/' element={<AppLayout/>}>
        <Route index element={<Home />} />
        <Route path='manifesto' element={<Manifesto/>} />
        <Route path='news' element={<Media/>} />
        <Route path='support' element={<Support/>} />
        <Route path='about' element={<About/>} />
        <Route path='contact' element={<Contact/>} />
        <Route path='docs' element={<Documents/>}/>
      </Route>
    </Routes>
  )
}

export default App
