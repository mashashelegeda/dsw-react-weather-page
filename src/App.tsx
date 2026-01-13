import { Routes, Route } from 'react-router-dom'
import { Header } from './pages/shared/header/Header'
import { Home } from './pages/Home/Home'
import { Popup } from './pages/shared/Popup/Popup'

function App() {
  return (
    <div className='global-container'>
      {/* <Popup /> */}
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<div>About page</div>} />
        </Routes>
      </div>
    </div>
  );
}

export default App
