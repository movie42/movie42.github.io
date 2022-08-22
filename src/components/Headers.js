import React, { useState } from "react";
import Nav from "./Nav";
import styled from "styled-components";
import { Link } from "gatsby";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "../images/logo.png";

const Headers = styled.header`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-content: center;
  position: fixed;
  top: 0;
  left: 0;
  height: 9rem;
  z-index: 99;
  .navBtn {
    z-index: 1;
    font-size: 1.8rem;
    background-color: unset;
    border: 0;
    padding: 1rem 2rem;
    cursor: pointer;
    &:hover {
      font-weight: 900;
      color: ${props => props.theme.hlColor_light};
    }
  }
`;

const ImgWrapper = styled(motion.div)`
  position: relative;
  cursor: pointer;
  width: 6rem;
  height: 6rem;
  overflow: hidden;
  border-radius: 100%;
  background-color: ${props => props.theme.hlColor_dark};
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: ${props => props.theme.whiteColor};
    transition: all 0.3s ease-in-out;
  }
`;

const Img = styled.img`
  position: absolute;
  width: 6rem;
  filter: grayscale(100%);
  mix-blend-mode: screen;
  width: 8rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  &:hover {
    filter: unset;
    mix-blend-mode: unset;
  }
`;

const Header = () => {
  const [menu, setMenu] = useState(false);

  const handleMenu = () => {
    setMenu(menu => !menu);
  };

  return (
    <AnimatePresence>
      <Headers>
        <ImgWrapper>
          <Link to="/resume">
            <Img src={Logo} alt="logo" />
          </Link>
        </ImgWrapper>
        <button className="navBtn" onClick={handleMenu}>
          메뉴
        </button>
        <Nav isActive={menu} />
      </Headers>
    </AnimatePresence>
  );
};

export default Header;
