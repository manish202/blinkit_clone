import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
function SearchBar(){
    let [show,chshow] = useState(false);
    let [inp,chinp] = useState("");
    let initial = {cat:[],subcat:[],brand:[],message:undefined}
    let [catbrand,chcatbrand] = useState(initial);
    let navigate = useNavigate();
    const getData = async () => {
        inp = inp.trim();
        if(inp !== ""){
            try{
                console.log("request gone SearchBar");
                let res = await fetch("/api/catbrand",{
                    method:"POST",
                    body:JSON.stringify({catbrand:inp}),
                    headers:{
                        "Content-Type":"application/json"
                    }
                });
                let jdata = await res.json();
                chcatbrand(jdata);
            }catch(err){
                chcatbrand(initial);
            }
        }else{
            chcatbrand(initial);
        }
    }
    useEffect(() => {
        let x = setTimeout(() => {
            getData();
        },500);
        return () => clearTimeout(x);
    },[inp]);
    const searchwork = () => {
        chshow(false);
        chcatbrand(initial);
        if(inp.trim() === ""){
            toast.warn("please search something.");
        }else{
            inp = inp.trim();
            navigate(`/search/${inp.replaceAll(' ','-')}`);
        }
    }
    let {cat,subcat,brand,message} = catbrand;
    return(
        <>
            <div className={`search ${show && "active"}`}>
            {window.innerWidth < 900 && <span onClick={() => chshow(false)}><i className="fa-solid fa-xmark"></i></span>}
            <div className="search-box d-flex">
                <button onClick={searchwork}><i className="fa-solid fa-magnifying-glass"></i></button>
                <input type="text" value={inp} onChange={(e) => chinp(e.target.value)} onFocus={() => chshow(true)} className="my-input" placeholder="search for products" />
                {(show && !message && (cat.length > 0 || subcat.length > 0) || brand.length > 0)? <ul onClick={() => chshow(false)}>
                    {cat.map((val,ind) => {
                        return <li onClick={() => chcatbrand(initial)} key={ind}><Link to={`/category/${val._id}/0`}>{val.cat_name} ({val.total_products})</Link></li>
                    })}
                    {subcat.map((val,ind) => {
                        return <li onClick={() => chcatbrand(initial)} key={ind}><Link to={`/category/${val.parent_cat}/${val._id}`}>{val.sub_cat_name} ({val.total_products})</Link></li>
                    })}
                    {brand.map((val,ind) => {
                        return <li onClick={() => chcatbrand(initial)} key={ind}><Link to={`/brand/${val._id}/${val.brand_name.replaceAll(" ","-")}`}>{val.brand_name} ({val.total_products})</Link></li>
                    })}
                </ul>:""}
            </div>
        </div>
        {show && <div className="popup-shadow" onClick={() => chshow(false)}></div>}
        </>
    )
}
export default SearchBar;