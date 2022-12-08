import {useEffect, useState, useContext} from "react";
import {ProBtn} from "./ProCard";
import {MainContext} from "../App";
import {toast} from "react-toastify";
import {pro_url} from "../config";
function EmptyCart({obj}){
    return(
        <>
            <img src={pro_url + "empty-cart.jpg"} alt="empty cart" className="cart-empty" />
            <h2>you don't have any items in your cart</h2>
            <button className="btn-green g-button" onClick={() => obj(false)}>start shopping</button>
        </>
    )
}
function CartCard({obj}){
    let {cart_data} = useContext(MainContext);
    let {items} = cart_data;
    let {image,mrp,name,price,weight,id,unit} = obj;
    obj._id = id;
    const [unit2,chunit] = useState(unit);
    useEffect(() => {
        let curobj = items.find((val) => val.id === id);
        if(curobj !== undefined){
        chunit(curobj.unit);
        }else{
        chunit(0);
        }
    },[cart_data]);
    return <div className="cart-card d-flex">
    <img src={pro_url + image} alt={name} />
    <div className="pro-data">
        <p>{name.substr(0,35)}...</p>
        <small>{weight}</small><br/>
        <b>₹{price}</b><span>₹{mrp}</span>
    </div>
    <ProBtn obj={obj} unit={unit2} />
</div>
}
function CartContent(){
    let [loading,chloading] = useState(true);
    let {cart_data,updateCookie} = useContext(MainContext);
    let {items,count,total_price,total_mrp} = cart_data;
    const getData = () => {
        //here we sending cookie data and get those data without validation
        console.log("request gone CartContent");
        fetch("/api/cart_data",{
            method:"POST",
            body:JSON.stringify({cart_data}),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(x => x.json()).then((data2) => {
            if(data2.message === undefined){
                updateCookie({...data2,modify:Date.now()});
                chloading(false);
            }else{
                toast.error(data2.message);
            }
        }).catch((err) => toast.error(err));
    }
    useEffect(() => {
        getData();
    },[]);
    return(
        <>  {loading && <div className="d-flex loading"><b></b><b></b><b></b></div>}
            {!loading && <>
                <div className="inline d-flex">
                <div className="clock"><i className="fa-solid fa-clock"></i></div>
                <div><small>{count} items</small><br/><h3>delivery in 8 minutes</h3></div>
            </div>
            <div className="cart-card-box">
                {items.map((val,ind) => {
                    return <CartCard key={ind} obj={val} />
                })}
            </div>
            <div className="bill-details">
                <h4>bill details</h4>
                <table>
                    <tbody>
                        <tr>
                            <td>MRP</td>
                            <td>₹{total_mrp}</td>
                        </tr>
                        <tr>
                            <td>Product Discount</td>
                            <td>-₹{total_mrp - total_price}</td>
                        </tr>
                        <tr>
                            <td>Delivery Charge</td>
                            <td>free</td>
                        </tr>
                        <tr>
                            <td colSpan="2">Hooray! You saved ₹15 on delivery charge</td>
                        </tr>
                        <tr>
                            <td>Bill Total</td>
                            <td>₹{total_price}</td>
                        </tr>
                        <tr>
                            <td colSpan="2">Promo code can be applied on payments screen</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <button onClick={() => toast.error("proceed functionality not developed yet!")} className="btn-green g-button">{count} items ₹{total_price} <del>₹{total_mrp}</del> proceed <i className="fa-solid fa-arrow-right"></i></button>
            </>}
        </>
    )
}
function LogCart(){
    let [login_popup,chloginpopup] = useState(false);
    let [cart_popup,chcartpopup] = useState(false);
    let {cart_data} = useContext(MainContext);
    let {count,total_price} = cart_data;
    let cart_val = (count > 0) ? `${count} items ₹${total_price}`:"my cart";
    return(
        <>
            <div className="d-flex log-cart">
                <button onClick={() => chloginpopup(true)}>{window.innerWidth > 900 ? "login":<i className="fa-solid fa-user"></i>}</button>
                {(window.innerWidth > 900) && <button onClick={() => chcartpopup(true)} className="btn-green"><i className="fa-solid fa-cart-shopping"></i><span id="cart_icon">{cart_val}</span></button>}
                {(count > 0 && window.innerWidth < 900) && <button onClick={() => chcartpopup(true)} className="btn-green"><i className="fa-solid fa-cart-shopping"></i><span id="cart_icon">{cart_val}</span></button>}
            </div>
            {login_popup && <div className="login-popup d-flex">
            <div className="respo-box">
                <span onClick={() => chloginpopup(false)}><i className="fa-solid fa-xmark"></i></span>
                <h2>phone number verification</h2>
                <h3>enter your phone number to login/signup</h3>
                <div className="search-box">
                    <button><i className="fa-solid fa-mobile"></i> +91-</button>
                    <input type="text" className="my-input" placeholder="Enter Phone Number" />
                </div>
                <button className="btn-green g-button" onClick={() => toast.error("auth functionality not developed yet!")}>next</button>
            </div>
            </div>}
            {cart_popup && <aside className="cart-sidbar">
            <div className="d-flex m-cart"><h1>my cart</h1><span onClick={() => chcartpopup(false)}><i className="fa-solid fa-xmark"></i></span></div>
            {cart_data.count > 0 ? <CartContent /> : <EmptyCart obj={chcartpopup} />}
            </aside>}
            {login_popup && <div className="popup-shadow" onClick={() => chloginpopup(false)}></div>}
            {cart_popup && <div className="popup-shadow" onClick={() => chcartpopup(false)}></div>}
        </>
    )
}
export default LogCart;