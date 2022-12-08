import { useParams,Link} from "react-router-dom";
import Error404 from "./Error404";
import { useState,useEffect,useContext} from "react";
import {ProBtn} from "./ProCard";
import {MainContext} from "../App";
import {toast} from "react-toastify";
function SinglePage(){
    let [loading,chloading] = useState(true);
    let [data,chdata] = useState({});
    let {pid} = useParams();
    let {cart_data} = useContext(MainContext);
    let {items} = cart_data;
    const [unit,chunit] = useState(0);
    useEffect(() => {
        if(pid.trim() !== ""){
            chloading(true);
            console.log("request gone SinglePage");
            fetch("/api/products",{
                method:"POST",
                body:JSON.stringify({pid:pid}),
                headers:{
                    "Content-Type":"application/json"
                }
            }).then(x => x.json()).then((data2) => {
                chdata(data2);
                chloading(false);
            }).catch((err) => toast.error(err));
        }
    },[pid]);
    useEffect(() => {
        let curobj = items.find((val) => val.id === pid);
        if(curobj !== undefined){
          chunit(curobj.unit);
        }else{
          chunit(0);
        }
      },[cart_data]);
    if(pid.trim() !== ""){
        let {single,c,sc,b} = data;
        return <div className="container d-flex">
            {loading && <div className="d-flex loading"><b></b><b></b><b></b></div>}
            {!loading && data.message === undefined && <div className="single-product">
                <div className="breadcrumb">
                    <Link to="/">home</Link>
                    <Link to={`/category/${single.category}/0`}>{c.cat_name}</Link>
                    <Link to={`/category/${single.category}/${single.subcategory}`}>{sc.sub_cat_name}</Link>
                    <span>{single.name}</span>
                </div>
                <h2>{single.name}</h2>
                <img src={`../../images/pro/${single.image}`} alt={single.name} />
                <table>
                    <tbody>
                        <tr>
                            <td>weight</td>
                            <td>{single.weight}</td>
                        </tr>
                        <tr>
                            <td>brand</td>
                            <td>{b.brand_name}</td>
                        </tr>
                        <tr>
                            <td>product view</td>
                            <td>{single.click_count}</td>
                        </tr>
                        <tr>
                            <td>price</td>
                            <td><b>₹{single.price}</b><del>₹{single.mrp}</del></td>
                        </tr>
                        <tr><td colSpan="2">
                        <ProBtn obj={single} unit={unit} />
                        </td></tr>
                    </tbody>
                </table>
            </div>}
            {!loading && data.message !== undefined && <Error404 />}
        </div>
    }else{
        return <Error404 />;
    }
}
export default SinglePage;