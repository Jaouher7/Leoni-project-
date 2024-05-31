import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react';
import leoni from './leoni.png';

const Logo = () => {
  const isDarkMode = useSelector((state) => state.customizer.isDark);
  const toggleMiniSidebar = useSelector((state) => state.customizer.isMiniSidebar);
  const activeSidebarBg = useSelector((state) => state.customizer.sidebarBg);
  return (
    <Link to="/" className="d-flex align-items-center gap-2">
      {isDarkMode || activeSidebarBg !== 'white' ? (
        <>
          {toggleMiniSidebar ? '' : <img src={leoni} className="d-none d-lg-block" alt='logo-white-text' />}
        </>
      ) : (
        <>
          
          {toggleMiniSidebar ? '' : <img src={leoni} className="d-none d-lg-block" alt='logo-dark-text' />}
        </>
      )}
    </Link>
  );
};

export default Logo;
