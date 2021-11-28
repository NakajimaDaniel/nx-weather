import '../styles/global.scss';
import '../styles/css/weather-icons.min.css';
import '../styles/css/weather-icons-wind.min.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { useState, useEffect } from 'react'

import Router from 'next/router'

import NProgress from 'nprogress';
import "nprogress/nprogress.css";

NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 800,
  showSpinner: false,
});


function MyApp({ Component, pageProps }) {

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = () => {
      NProgress.start();
      setLoading(true);
    };
    const end = () => {
      NProgress.done();
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);


  return (
    <>
     { loading ? (<div></div>) : (
       <Component {...pageProps} />
     )}
    </>
  )
}

export default MyApp
