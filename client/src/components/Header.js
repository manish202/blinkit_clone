import Delivery from "./DeliveryBar";
import SearchBar from "./SearchBar";
import LogCart from "./LogCart";
import {Link} from "react-router-dom";
import "./css/header.css";
function Header(){
    return <section className="d-flex nav-bar">
            <div className="logo">
                <Link to="/">blink<span>it</span></Link>
            </div>
            <Delivery />
            <SearchBar />
            <LogCart />
        </section>
}
export default Header;