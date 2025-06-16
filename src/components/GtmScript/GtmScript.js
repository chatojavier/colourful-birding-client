import React from 'react';
import Script from 'next/script';

const GtmScript = () =>
  isGtmProduction ? (
    <Script
      id="gtm"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id=${process.env.NEXT_PUBLIC_GTM_ID}'+dl;
      f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
    `,
      }}
    />
  ) : null;

export default GtmScript;

export const GtmNoscript = () =>
  isGtmProduction ? (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      ></iframe>
    </noscript>
  ) : null;

export const GtmId = process.env.NEXT_PUBLIC_GTM_ID || '';
export const isGtmEnabled = !!GtmId;
export const isGtmProduction = process.env.NODE_ENV === 'production' && isGtmEnabled;
