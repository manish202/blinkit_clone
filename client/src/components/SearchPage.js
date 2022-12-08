import ProContainer from "./ProContainer";
import { useParams } from "react-router-dom";
import Error404 from "./Error404";
import { useState,useEffect} from "react";
import {toast} from "react-toastify";
function SearchPage(){
    let [loading,chloading] = useState(true);
    let [data,chdata] = useState([]);
    let {q} = useParams();
    useEffect(() => {
        if(q.trim() !== ""){
            console.log("request gone SearchPage");
            fetch("/api/products",{
                method:"POST",
                body:JSON.stringify({search:q}),
                headers:{
                    "Content-Type":"application/json"
                }
            }).then(x => x.json()).then((data2) => {
                if(data2.message === undefined){
                    chdata(data2);
                }else{
                    toast.error(data2.message);
                }
                chloading(false);
            }).catch((err) => toast.error(err));
        }
    },[q]);
    if(q.trim() !== ""){
        return <div className="container pro-container">
        <h2>showing {data.length} Results For : {q.replaceAll("-"," ")}</h2>
        {loading && <div className="d-flex loading"><b></b><b></b><b></b></div>}
        <ProContainer data={data} />
        </div>
    }else{
        return <Error404 />
    }
}
export default SearchPage;