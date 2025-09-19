
import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { Linkedin, Facebook, Instagram } from 'lucide-react';

const FloatingSocialButtons: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const socialLinks = [
    { icon: <Linkedin size={20} />, name: 'LinkedIn', url: 'https://www.linkedin.com/in/cleybersilva/', color: 'bg-[#0077B5]' },
    { icon: <Facebook size={20} />, name: 'Facebook', url: '#', color: 'bg-[#1877F2]' },
    { icon: <Instagram size={20} />, name: 'Instagram', url: '#', color: 'bg-gradient-to-tr from-[#FFDC80] via-[#F56040] to-[#833AB4]' },
  ];

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end">
      {isOpen && (
        <div className="mb-3 space-y-2 flex flex-col-reverse items-end">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              className={`flex items-center ${link.color} text-white rounded-full p-3 shadow-lg transform transition-transform hover:scale-105`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
            >
              <span className="sr-only">{link.name}</span>
              {link.icon}
            </a>
          ))}
          <a
            href="https://wa.me/5583988329018"
            className="flex items-center bg-green-500 text-white rounded-full p-3 shadow-lg transform transition-transform hover:scale-105"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17.6 6.8A7.8 7.8 0 0 0 12 4.8c-4.2 0-7.8 3.4-8 7.6-.1 1.3.3 2.6.9 3.8l-1 3.5 3.6-.9a8 8 0 0 0 3.8 1h.003c4.3 0 7.9-3.5 8-7.8 0-2-.8-4-2.2-5.4z"></path>
              <path d="M12.7 15a5 5 0 0 1-1.2.3H11a5 5 0 0 1-3.5-1.5 5 5 0 0 1-1.3-2.8 5 5 0 0 1 1-3.2 5.2 5.2 0 0 1 3.3-1.7c1.4-.1 2.7.3 3.8 1.1a5 5 0 0 1 1.6 2.2c.4 1 .5 1.9.2 2.9-.2 1-1 2-2.2 2.5"></path>
              <path d="M14.4 10.6c-.2 0-.4-.1-.6 0h-.3c-.2 0-.4.1-.5.2l-.6.6c-.2.1-.4 0-.5-.1l-1.2-.5c-.4-.2-.8-.5-1.1-.8-.2-.2-.4-.3-.5-.5 0-.1-.1-.3-.1-.4a.7.7 0 0 1 .1-.4l.2-.3.3-.3c.1-.1.1-.2.1-.3 0-.1 0-.3-.1-.4l-.6-1.2c-.1-.3-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.2-.3.1-.5.3-.7.6-.2.6 0 1.3.3 2 .8 1.9 2.4 3.4 4.4 4.1.5.2 1.1.3 1.6.3.3 0 .6-.1.9-.2.2-.1.5-.3.6-.5l.2-.5c0-.2 0-.4-.2-.6l-.9-.4"></path>
            </svg>
          </a>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center p-4 rounded-full shadow-lg transition-all ${
          isOpen ? 'bg-gray-600' : 'bg-orange'
        } text-white`}
        aria-expanded={isOpen}
        aria-label="Toggle social media buttons"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  );
};

export default FloatingSocialButtons;
