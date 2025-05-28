import { Header } from "./header";
import { Footer } from "./footer";
import { Outlet } from "react-router";
import { Hero } from "./hero";
import { VitriList } from "../../../templates/base/component/vitriList";
export  function BaseTemplates(){

    return (

        <>
            <Header/>
            <Hero/>
            <VitriList/>
            <Outlet/>
           <Footer/>

        </>
    )
}