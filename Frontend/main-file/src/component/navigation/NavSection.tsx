import { useState } from "react";
import { Link } from "react-router-dom";

type Props = {
  style: string;
};

const NavSection = ({ style }: Props) => {
  return (
    <div className={`rv-1-header__nav ${style}`}>
      <ul className="justify-content-center">
        <li>
          <Link to="/">Home</Link>
        </li>
        
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        
        <li>
          <Link to="/about">About</Link>
        </li>
        
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavSection;
