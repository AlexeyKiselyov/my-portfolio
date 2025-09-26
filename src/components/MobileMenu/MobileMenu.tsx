import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import DevConfig from '../../developer.json';

const MobileMenu = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const config = DevConfig;

  const toggleMobileMenu = (): void => {
    const menu = document.getElementById('menu');
    if (menu) {
      menu.classList.toggle('hidden');
    }

    const page = document.getElementsByTagName('main')[0];
    if (page) {
      page.classList.toggle('hideMain');
    }

    setMenuOpen(!menuOpen);
  };

  return (
    <div id="mobile-menu" className="w-full z-10 lg:hidden">
      {/* header */}
      <div
        id="mobile-header"
        className="border-bot w-full h-16 flex justify-between items-center"
      >
        <Link
          to="/"
          className="text-menu-text font-fira_retina flex h-full items-center mx-5 hover:text-white"
          onClick={() => {
            if (menuOpen) toggleMobileMenu();
          }}
        >
          <img
            className="rounded-[50%] mr-3 8"
            src="/images/avatar/avatar_logo.jpg"
            alt="avatar"
            width="24px"
          />
          {config.logo_name}
        </Link>

        {!menuOpen ? (
          <img
            src="/icons/burger.svg"
            alt="Open menu"
            onClick={toggleMobileMenu}
            className="w-5 h-5 mx-5 my-auto cursor-pointer hover-svg"
          />
        ) : (
          <img
            src="/icons/burger-close.svg"
            alt="Close menu"
            onClick={toggleMobileMenu}
            className="w-5 h-5 mx-5 my-auto cursor-pointer hover-svg"
          />
        )}
      </div>

      {/* mobile menu */}
      <div id="menu" className="hidden">
        <NavLink to="/" className="nav-link-mobile" onClick={toggleMobileMenu}>
          _hello
        </NavLink>

        <NavLink
          to="/about-me"
          className="nav-link-mobile"
          onClick={toggleMobileMenu}
        >
          _about-me
        </NavLink>

        <NavLink
          to="/projects"
          className="nav-link-mobile"
          onClick={toggleMobileMenu}
        >
          _projects
        </NavLink>

        <NavLink
          to="/contact-me"
          className="nav-link-mobile"
          onClick={toggleMobileMenu}
        >
          _contact-me
        </NavLink>
      </div>
    </div>
  );
};

export default MobileMenu;
