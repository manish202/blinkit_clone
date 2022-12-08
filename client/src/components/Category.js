import {useState,useEffect} from "react";
import {Link} from "react-router-dom";
import {cat_url} from "../config";
function Category(){
    let [loading,chloading] = useState(true);
    let [data,chdata] = useState([]);
    const getCategory = async () => {
        console.log("request gone Category");
        try{
            let res = await fetch("/api/category");
            let jdata = await res.json();
            chdata(jdata);
            chloading(false);
        }catch(err){
            chdata({message:"category data can't fetched.",status:false});
            chloading(false);
        }
    }
    useEffect(() => {
        getCategory();
    },[]);
    return <div className="container d-flex category">
    {loading && <div className="d-flex loading"><b></b><b></b><b></b></div>}
    {!loading && data.message === undefined ? data.map((val,ind) => {
        return <Link to={`/category/${val._id}/0`} key={ind}><img src={cat_url + val.cat_image} alt={val.cat_name} /></Link>
    }):<a>{data.message}</a>}
    </div>;
}
export default Category;