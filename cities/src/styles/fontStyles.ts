import { createGlobalStyle } from "styled-components";
import regular from "../assets/fonts/Nunito-Regular.ttf";

const FontStyles = createGlobalStyle`

@font-face {
  font-family: 'Regular';
  src: url(${regular}) format('TrueType'),

}
`;

export default FontStyles;
