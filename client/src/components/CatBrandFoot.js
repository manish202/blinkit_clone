import {useState,useEffect} from "react";
import {Link} from "react-router-dom";
function CatBrandFoot(){
    let [data,chdata] = useState([]);
    let [bdata,chbdata] = useState([]);
    const getCategory = async () => {
        console.log("request gone CatBrandFoot category");
        try{
            let res = await fetch("/api/category");
            let jdata = await res.json();
            chdata(jdata);
        }catch(err){
            chdata({message:"category data can't fetched.",status:false});
        }
    }
    const getBrands = async () => {
        console.log("request gone CatBrandFoot brands");
        try{
            let res = await fetch("/api/brands");
            let jdata = await res.json();
            chbdata(jdata);
        }catch(err){
            chbdata({message:"brands can't fetched.",status:false});
        }
    }
    useEffect(() => {
        getCategory();
        getBrands();
    },[]);
    return <div className="container cat-brand-foot">
        <div className="cat">
            <h3>categories</h3>
            <div>
                {data.message === undefined ? data.map((val,ind) => {
        return <Link key={ind} to={`/category/${val._id}/0`}>{`${val.cat_name} (${val.total_products})`}</Link>
    }):<a>{data.message}</a>}
            </div>
        </div>
        <div className="brand">
        <h3>brands</h3>
            <div>
            {bdata.message === undefined ? bdata.map((val,ind) => {
        return <Link key={ind} to={`/brand/${val._id}/${val.brand_name.replaceAll(" ","-")}`}>{`${val.brand_name} (${val.total_products})`}</Link>
    }):<a>{bdata.message}</a>}
            </div>
        </div>
        <div className="foot">
            <h2>cloned by manish prajapati</h2>
        </div>
    </div>;
}
export default CatBrandFoot;