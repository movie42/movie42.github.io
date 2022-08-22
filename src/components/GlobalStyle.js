import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

html,body,h1,h2,h3,h4,h5,h6,p{
    margin:0;
    padding:0;
}

html,body,form,input,textarea,label,button {
    font-size:10px;
    font-family: 'Noto Sans KR', sans-serif;
}

body {    
    font-size:1.6rem;
    color:${props => props.theme.basicColor}
}



ul, ol, dl, li {
    list-style: none;
}

a {
    text-decoration:none;
    color:${props => props.theme.basicColor}
}
`;

export default GlobalStyle;
