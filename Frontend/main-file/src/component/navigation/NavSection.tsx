import { useState } from "react";
import { Link } from "react-router-dom";
type Props = {
  style: string;
};
type DropdownState = {
  home: boolean;
  pages: boolean;
  shop: boolean;
  blog: boolean;
};
const NavSection = ({ style }: Props) => {
  const [dropdown, setDropdown] = useState<DropdownState>({
    home: false,
    pages: false,
    shop: false,
    blog: false,
  });

  const handleToggleDropdown = (dropdownName: keyof DropdownState) => {
    if (window.innerWidth < 992) {
      setDropdown((prevState) => ({
        ...prevState,
        [dropdownName]: !prevState[dropdownName],
      }));
    }
  };

  return (
    <div className={`rv-1-header__nav ${style}`}>
      <ul className="justify-content-center">
        <li className={dropdown.home ? "rv-dropdown-active" : ""}>
          <a role="button" onClick={() => handleToggleDropdown("home")}>
            Home
          </a>

          <ul className="sub-menu">
            <li>
              <Link to="/">Gardening</Link>
            </li>
            <li>
              <Link to="/home-2">Herbal Tea</Link>
            </li>
            <li>
              <Link to="/home-3">ECO</Link>
            </li>
          </ul>
        </li>

        <li className={dropdown.pages ? "rv-dropdown-active" : ""}>
          <a role="button" onClick={() => handleToggleDropdown("pages")}>
            Services
          </a>
          <ul className="sub-menu">
            <li>
              <Link to="/services">EV Manufacturer</Link>
            </li>
            <li>
              <Link to="/services/web-solution">Battery Manufacturer</Link>
            </li>
            <li>
              <Link to="/projects">EV Consumer</Link>
            </li>
            <li>
              <Link to="/projects/sustainable-planting-drive">
                Recycler
              </Link>
            </li>
          </ul>
        </li>

        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/contact">About</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavSection;
