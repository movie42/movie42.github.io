import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import styled from "styled-components";
import { Link } from "gatsby";
import Logo from "../images/logo.png";
import { AnimatePresence, motion } from "framer-motion";

const Headers = styled.header`
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 9rem;
  z-index: 99;
  flex-direction: row-reverse;
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
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  margin-top: 1rem;
  margin-left: 2rem;
  width: 6rem;
  height: 6rem;
  border-radius: 6rem;
  overflow: hidden;
  background-color: ${props => props.theme.hlColor_dark};
  transition: all 0.3s ease-in-out;
  &:hover {
    img {
      filter: unset;
      mix-blend-mode: unset;
    }
    background-color: ${props => props.theme.whiteColor};
    transition: all 0.3s ease-in-out;
  }
`;

const Img = styled(motion.img)`
  filter: grayscale(100%);
  mix-blend-mode: screen;
  margin: 50% 0 0 50%;
  transform: translate(-50%, -50%);
  width: 8rem;
  height: 8rem;
`;

const Header = ({ location }) => {
<<<<<<< HEAD
  const [menu, setMenu] = useState(false);
=======
  const [menu, setMenu] = useState({
    initial: false,
    clicked: null,
    menuName: "Menu",
  });

  useEffect(() => {
    setMenu({
      initial: null,
      clicked: true,
      menuName: "Close",
    });
  }, [location.pathname]);

  const [disable, setDisable] = useState(false);
>>>>>>> 7fe2f870cb2f07f44f0c2e104c94360a5cef831b

  const handleMenu = () => {
    setMenu(menu => !menu);
  };

  useEffect(() => {
    return () => setMenu(false);
  }, [location.pathname]);

  return (
    <AnimatePresence>
      <Headers>
        <ImgWrapper>
          <Link to="/">
            <Img src={Logo} alt="logo" />
          </Link>
        </ImgWrapper>
        <button className="navBtn" onClick={handleMenu}>
          메뉴
        </button>
        <Nav location={location} isActive={menu} />
      </Headers>
    </AnimatePresence>
  );
};

export default Header;
