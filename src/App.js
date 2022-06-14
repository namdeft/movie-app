import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import 'swiper/css'

import Header from './components/header/Header'
import Footer from './components/footer/Footer'

import Home from './pages/Home'
import Catalog from './pages/Catalog'
import Detail from './pages/detail/Detail'

function App() {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route path='/:category' element={<Catalog />} />
                    <Route path='/:category/:id' element={<Detail />} />
                    <Route path='/:category/search/:keyword' element={<Catalog />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </>
    )
}

export default App
