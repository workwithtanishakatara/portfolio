// components/CalendlyPopupNative.jsx
'use client'; // If using App Router

import Script from 'next/script';
import { useEffect } from 'react';
import { BsArrowRight, BsPhone, BsTelephone, BsTelephoneFill } from 'react-icons/bs';

const CalendlyPopupNative = ({ url, buttonText }) => {
  // Ensure the Calendly object is available on the window
  useEffect(() => {
    // This function will be called when the button is clicked
    window.openCalendlyPopup = () => {
      if (window.Calendly) {
        window.Calendly.initPopupWidget({ url: url });
      }
      return false;
    };
  }, [url]);

  return (
    <>
      <Script 
        src="https://assets.calendly.com/assets/external/widget.js" 
        type="text/javascript" 
        async 
        strategy="afterInteractive" // Loads script after the page is interactive
      />
      <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />

      <a href="#" onClick={(e) => {
        e.preventDefault();
        window.openCalendlyPopup();
      }}
      className='className="w-fit text-base font-normal tracking-normal z-50 flex flex-row gap-2 justify-center items-center h-fit px-4 py-2 border bg-black text-white hover:bg-white hover:text-black transition-all duration-300 border-black rounded-full'
      >
        {buttonText} <BsTelephone size={18} />
      </a>
    </>
  );
};

export default CalendlyPopupNative;
