import React, { useEffect } from 'react';
import Categorys from './Categorys/Categorys';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Header />
      <Categorys />
      <Footer />
    </>
  );
}
