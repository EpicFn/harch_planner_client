import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  #root {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
    width: 100%;
  }
  body {
    position: relative;
    margin: 0 auto;
    height: 100vh;
    min-height: 99vh;
    display: flex;
    flex-direction: column;
    max-width: 100vw;
    background-color: #E1E1E1;
    border-color: black;
    align-items: center;
  }
`

export default GlobalStyle
