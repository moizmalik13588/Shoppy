import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo_light from '../assets/logo-black.png';
import logo_dark from '../assets/logo-white.png';
import toggle_light from '../assets/night.png';
import toggle_dark from '../assets/day.png';
import { selectCartItems } from '../redux/cartSlice';

const NavBar = ({ theme, setTheme }) => {
  // State to track the active category
  const [activeCategory, setActiveCategory] = useState('');

  const toggle_mode = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const cartItem = useSelector(selectCartItems);

  const menuToggle = () => {
    const menuItems = document.getElementById("menu-options");
    if (menuItems) {
      menuItems.classList.toggle('open');
    } else {
      console.error('Element with ID "menu-options" not found');
    }
  };

  // Function to handle link click and set the active category
  const handleLinkClick = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className={`navbar sticky-top ${theme}`}>
      <div>
        <Link 
          to="/" 
          className="left" 
          style={{ textDecoration: 'none', color: 'inherit' }}
          onClick={() => setActiveCategory('')}  // Reset active category on "Shoppy" click
        >
          <h3>Shoppy</h3>
        </Link>
      </div>
      <div id="menu-options" className="middle d-flex align-items-center justify-content-center gap-5">
        <Link
          to="/category/apple"
          className="options ms-3"
          style={{
            textDecoration: 'none',
            color: activeCategory === 'apple' ? '#007bff' : 'inherit',
            fontWeight: activeCategory === 'apple' ? 'bold' : 'normal',
          }}
          onClick={() => handleLinkClick('apple')}
        >
          <h5>Apple</h5>
        </Link>
        <Link
          to="/category/samsung"
          className="options ms-3"
          style={{
            textDecoration: 'none',
            color: activeCategory === 'samsung' ? '#007bff' : 'inherit',
            fontWeight: activeCategory === 'samsung' ? 'bold' : 'normal',
          }}
          onClick={() => handleLinkClick('samsung')}
        >
          <h5>Samsung</h5>
        </Link>
        <Link
          to="/category/huawei"
          className="options ms-3"
          style={{
            textDecoration: 'none',
            color: activeCategory === 'huawei' ? '#007bff' : 'inherit',
            fontWeight: activeCategory === 'huawei' ? 'bold' : 'normal',
          }}
          onClick={() => handleLinkClick('huawei')}
        >
          <h5>Huawei</h5>
        </Link>
      </div>

      <div className="right">
        <img
          onClick={toggle_mode}
          src={theme === 'light' ? toggle_light : toggle_dark}
          alt="Toggle Theme"
          className="togglee"
        />

        <Link to="/cart">
          <button type="button" className="btn btn-primary position-relative ms-3">
            <span className="material-symbols-outlined">
              shopping_bag
            </span>
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {cartItem.length}
              <span className="visually-hidden">unread messages</span>
            </span>
          </button>
        </Link>
        <span onClick={menuToggle} className="menu material-symbols-outlined">
          menu
        </span>
      </div>
    </div>
  );
};

export default NavBar;
