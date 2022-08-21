import React, { useState } from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import useMousePosition from "../hooks/useMousePosition";
import { StaticImage } from "gatsby-plugin-image";

const Wrapper = styled(motion.nav)`
  @media (max-width: 450px) {
    padding: 0;
  }
  display: none;
  overflow-x: hidden;
  overflow-y: auto;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.hlColor};
  padding-left: 4rem;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const List = styled.ul`
  padding: 0;
  margin: 0;
`;

const ListItem = styled(motion.li)`
  position: relative;
  overflow: hidden;
  width: 40rem;
  height: 17rem;
`;

const Item = styled(motion.div).attrs(() => {
  return {
    variants: itemVariants,
    initial: "hidden",
    animate: "animation",
    exit: "exit",
  };
})`
  text-align: center;
`;

const Path = styled(Link)`
  @media (max-width: 450px) {
    font-size: 11.5rem;
  }
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: 0 auto;
  display: block;
  font-size: 13rem;
  font-weight: 300;
  font-variant: 10;
  box-sizing: border-box;
  &:hover {
    font-weight: 900;
    color: ${props => props.theme.whiteColor};
  }
  &:active {
    color: ${props => props.theme.whiteColor};
  }
`;

const ImgWrapper = styled(motion.div)`
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  margin-top: 1rem;
  margin-left: 2rem;
  width: 13rem;
  height: 13rem;
  border-radius: 6rem;
  overflow: hidden;
  background-color: ${props => props.theme.hlColor_dark};
  .gatsby-image-wrapper {
    width: 16rem;
    width: 16rem;
    overflow: hidden;
  }
  .gatsby-image-wrapper img {
    filter: grayscale(100%);
    width: 16rem;
    top: 50%;
    left: 50%;
    transform: translate(-55%, -50%);
    &:hover {
      filter: unset;
      mix-blend-mode: unset;
    }
  }
`;

const activeStyle = {
  color: "white",
  fontWeight: 900,
};

const navVariant = {
  hidden: {
    display: "none",
  },
  animation: {
    display: "flex",
    height: "100vh",
    transition: {
      when: "beforeChildren",
      type: "tween",
    },
  },
  exit: {
    display: "flex",
    height: 0,
    transition: {
      when: "afterChildren",
      type: "tween",
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 150,
  },
  animation: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2,
      type: "tween",
    },
  },
  exit: {
    opacity: 0,
    y: 150,
    transition: {
      delay: 0.2,
      type: "tween",
    },
  },
};

const Nav = ({ isActive }) => {
  const { x, y } = useMousePosition();
  const [hoverState, setHoverState] = useState(false);

  return (
    <AnimatePresence>
      {isActive && (
        <Wrapper
          variants={navVariant}
          initial="hidden"
          animate="animation"
          exit="exit"
        >
          <ImgWrapper
            initial={{ opacity: 0 }}
            animate={{
              zIndex: 1,
              opacity: hoverState ? 1 : 0,
              x,
              y,
            }}
          >
            <StaticImage src="../images/logo.png" alt="logo" />
          </ImgWrapper>
          <List>
            <ListItem>
              <Item>
                <Path activeStyle={activeStyle} to="/">
                  블로그
                </Path>
              </Item>
            </ListItem>
            <ListItem
              onHoverStart={() => setHoverState(true)}
              onHoverEnd={() => setHoverState(false)}
            >
              <Item>
                <Path activeStyle={activeStyle} to="/resume">
                  이력서
                </Path>
              </Item>
            </ListItem>
          </List>
        </Wrapper>
      )}
    </AnimatePresence>
  );
};

export default Nav;
