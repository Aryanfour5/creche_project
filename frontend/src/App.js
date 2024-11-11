// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import SignUp from './pages/SignUp'; 
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MyProfile from './pages/MyProfile'; 
import BabySitter from './pages/BabySitter';
import PurchasedNannies from './pages/PurchasedNannies';
import ChatBot from './pages/ChatBot';
import Feedback from './pages/FeedbackForm';
import PrivacyPolicy from './pages/PrivacyPolicy'; 
import TermsAndConditions from './pages/TermsAndConditions';
import OurServices from './pages/OurServices';

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/babysitter' element={<BabySitter />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/babysitter/:id' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/our-services' element={<OurServices />} /> {/* Route for Our Services */}
        <Route path='/signup' element={<SignUp />} />
        <Route path='/profile' element={<MyProfile />} />
        <Route path='/purchased' element={<PurchasedNannies />} />
        <Route path='/chatbot' element={<ChatBot />} /> {/* ChatBot route */}
        <Route path='/feedback' element={<Feedback />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} /> {/* PrivacyPolicy route */}
        <Route path='/terms-and-conditions' element={<TermsAndConditions />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;








