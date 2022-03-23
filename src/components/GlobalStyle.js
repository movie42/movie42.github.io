import { createGlobalStyle } from "styled-components";
import "@fontsource/noto-sans-kr";
import "@fontsource/noto-sans-kr/100.css";
import "@fontsource/noto-sans-kr/300.css";
import "@fontsource/noto-sans-kr/500.css";
import "@fontsource/noto-sans-kr/700.css";
import "@fontsource/noto-sans-kr/900.css";

const GlobalStyle = createGlobalStyle`

html,body,h1,h2,h3,h4,h5,h6,p{
    margin:0;
    padding:0;
}

html {
    font-size:10px;
}

body {
    font-size:1.6rem;
    font-family: 'Noto Sans KR', sans-serif;
    color:${props => props.theme.basicColor}
}


ul, ol, dl, li {
    list-style: none;
}

a{
    text-decoration:none;
    color:${props => props.theme.basicColor}
}
`;

export default GlobalStyle;
