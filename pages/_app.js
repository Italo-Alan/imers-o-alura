import React from "react";
import { CSSReset } from "../src/components/CSSReset";
import {ThemeProvider} from "styled-components"
import ColorModeProvider, {ColorModeContext} from "../src/components/Menu/ColorMode"
import  RegisterVideo  from "../src/components/RegisterVideo/index";

const theme = {
    light: {
        backgroundBase: "#f9f9f9",
        backgroundLevel1: "#ffffff",
        backgroundLevel2: "#f0f0f0",
        borderBase: "#e5e5e5",
        textColorBase: "#222222",
    },
    dark: {
        backgroundBase: "#181818",
        backgroundLevel1: "#202020",
        backgroundLevel2: "#313131",
        borderBase: "#383838",
        textColorBase: "#FFFFFF",
    }
};

function ProviderWrapper(props){
    return (
        <ColorModeProvider initialMode={"light"}>
            {props.children}
        </ColorModeProvider>
    )
}

function MyApp({ Component, pageProps }) {
    
    const contexto = React.useContext(ColorModeContext)
    console.log(contexto);
    return(
        //Estrutura global que serve para amarrar a aplicação
        <ThemeProvider theme={theme[contexto.mode]}>
            <CSSReset />
            <Component{...pageProps}/>
            <RegisterVideo /> 
        </ThemeProvider>      
    )
    
}

export default function _App(props){
    return(
        <ProviderWrapper>
            <MyApp {...props}/>
        </ProviderWrapper>
    )
};