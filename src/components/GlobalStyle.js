import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@font-face {
	font-family: 'SUIT Variable';
	font-weight: 100 900;
	src: url('https://cdn.jsdelivr.net/gh/sunn-us/SUIT/fonts/variable/woff2/SUIT-Variable.css') format('woff2-variations');
}
html,body,h1,h2,h3,h4,h5,h6,p{
    margin:0;
    padding:0;
}

html,body,form,input,textarea,label,button {
    font-size: 10px;
    font-family: 'SUIT-Medium', sans-serif;
}
p{
    font-size:1.85rem;
}
ul, ol, dl, li {
    font-size:1.85rem;
    list-style: none;
}

a {
    text-decoration:none;
    color:${props => props.theme.basicColor}
}
`;

export default GlobalStyle;
