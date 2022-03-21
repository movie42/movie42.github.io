import * as React from "react";
import Nav from "./Nav";
import styled from "styled-components";
import { useState } from "react";
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
  const [menu, setMenu] = useState({
    initial: false,
    clicked: null,
    menuName: "Menu",
  });

  const [disable, setDisable] = useState(false);

  const handleMenu = () => {
    handleDisable();
    if (menu.initial === false) {
      setMenu({
        initial: null,
        clicked: true,
        menuName: "Close",
      });
    } else if (menu.clicked === true) {
      setMenu({
        clicked: !menu.clicked,
        menuName: "Menu",
      });
    } else if (menu.clicked === false) {
      setMenu({
        clicked: !menu.clicked,
        menuName: "Close",
      });
    }
  };

  const handleDisable = () => {
    setDisable(!disable);
    setTimeout(() => {
      setDisable(false);
    }, 1200);
  };

  return (
    <AnimatePresence>
      <Headers>
        <ImgWrapper>
          <Link to="/">
            <Img src={Logo} alt="logo" />
          </Link>
        </ImgWrapper>
        <button disabled={disable} className="navBtn" onClick={handleMenu}>
          메뉴
        </button>
        <Nav isActive={menu} />
      </Headers>
    </AnimatePresence>
  );
};

export default Header;
