import ProContainer from "./ProContainer";
import { useParams,Link} from "react-router-dom";
import Error404 from "./Error404";
import { useState,useEffect} from "react";
import {toast} from "react-toastify";
function CategoryPage(){
    let [loading,chloading] = useState(true);
    let initial = {
        subc:[],
        subcpro:[],
        message:undefined
    }
    let [order,chorder] = useState(0);
    let [data,chdata] = useState(initial);
    let {cid,subcid} = useParams();
    function getData(){
        if(cid.trim() !== "" && subcid.trim() !== ""){
            chloading(true);
            console.log("request gone CategoryPage");
            fetch("/api/products",{
                method:"POST",
                body:JSON.stringify({cid:cid,subcid:subcid,order:order}),
                headers:{
                    "Content-Type":"application/json"
                }
            }).then(x => x.json()).then((data2) => {
                if(data2.message === undefined){
                    if(data2.subc.message === undefined){
                        if(data2.subc[0] !== undefined){
                            chdata(data2);
                        }else{
                            chdata({message:"no single subcategory found."});
                        }
                    }else{
                        chdata({message:data2.subc.message});
                    }
                }else{
                    toast.error(data2.message);
                }
                chloading(false);
            }).catch((err) => toast.error(err));
        }
    }
    useEffect(() => {
        getData();
    },[cid,subcid,order]);
    let {subc,subcpro,message} = data;
    function getCatName(){
        if(subc.length > 0){
            let x = subc.find((val) => {
                return val._id === subcid;
            });
            let obj = (x === undefined)? subc[0]:x;
            return obj.sub_cat_name;
        }else{
            return "products";
        }
    }
    if(cid.trim() !== "" && subcid.trim() !== "" && message === undefined){
        return <div className="container d-flex pro-container sub-cat-pro">
            {loading && <div className="d-flex loading"><b></b><b></b><b></b></div>}
            {!loading && <ul className="sub-cat">
                {subc.length > 0 && subc.map((val,ind) => {
                    let active = val._id === subcid ? "active":"";
                    if(subcid === "0" && ind === 0){active = "active"}
                    return <li key={ind} className={active}><Link to={`/category/${cid}/${val._id}`}>{val.sub_cat_name} ({val.total_products})</Link></li>
                })}
            </ul>}
            {!loading && <div className="sub-pro-box">
                <div className="d-flex filters">
                    <h2>buy {getCatName()} online</h2>
                    <select value={order} onChange={(e) => chorder(e.target.value)}>
                        <option value="">relevance</option>
                        <option value="plh">price (low to high)</option>
                        <option value="phl">price (high to low)</option>
                        <option value="naz">name (a to z)</option>
                    </select>
                </div>
                {(subcpro.length > 0) ? <ProContainer data={subcpro} /> : <div className="d-flex min-vh-90"><h1>no products found</h1></div>}
            </div>}
        </div>
    }else{
        return <Error404 />
    }
}
export default CategoryPage;