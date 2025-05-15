
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import Testimonials from '@/components/Testimonials';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import FloatingSocialButtons from '@/components/FloatingSocialButtons';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <div id="services">
          <Services />
        </div>
        <div id="portfolio">
          <Portfolio />
        </div>
        <div id="testimonials">
          <Testimonials />
        </div>
        <div id="contact">
          <ContactForm />
        </div>
      </main>
      <Footer />
      <FloatingSocialButtons />
    </div>
  );
};

export default Index;
