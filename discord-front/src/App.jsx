import React, { useState } from "react";
import AddForm from "./Components/Form";
import ModalMessage from "./Components/ModalMessage";
import SiteNavbar from "./Components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    return (
        <>
            <SiteNavbar/>
            <AddForm/>
        </>
    );
}

export default App;
