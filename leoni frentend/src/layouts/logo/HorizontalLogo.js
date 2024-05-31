import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react';
import leoni from './logo.jpg';

const HorizontalLogo = () => {
  const isDarkMode = useSelector((state) => state.customizer.isDark);
  const activetopbarBg = useSelector((state) => state.customizer.topbarBg);
  return (
    <Link to="/map/world" className="d-flex align-items-center gap-2">
      {isDarkMode || activetopbarBg !== 'white' ? (
        <>
          {/* <LogoWhiteIcon /> */}
          <img src={leoni} className="d-none d-lg-block" alt='logo-text' />
        </>
      ) : (
        <>
          {/* <LogoDarkIcon /> */}
          <img src={leoni} className="d-none d-lg-block" alt='logo-text' />
        </>
      )}
    </Link>
  );
};

export default HorizontalLogo;
