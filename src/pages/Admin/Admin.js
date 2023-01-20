//Component
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

// Style
import "./Admin.module.css"

function Admin() {
    return(
        <div className="wrapper">
            <Navbar />
            
            <Footer />
        </div>
    )
}

export default Admin;