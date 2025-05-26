import { Header } from "./header";
import { Footer } from "./footer";
import { Outlet } from "react-router";
export  function BaseTemplates(){

    return (

        <>
            <Header/>
            <Outlet/>


            <Footer/>

        </>
    )
}