import {Link} from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import {MainContext} from "../App";
import {pro_url} from "../config";
function ProBtn({obj,unit}){
  let {cart_data,updateCookie} = useContext(MainContext);
  let {items} = cart_data;
  let {_id,image,name,weight,mrp,price} = obj;
  function cartwork(dir){
    let curobj = items.find((val) => val.id === _id);
    if(curobj === undefined){
      //means id not exists in cookie;
      items.push({id:_id,name,image,weight,unit:1,price,mrp});
    }else{
      //means id exists in cookie;
      if(dir === "INC"){
        curobj.unit += 1;
      }else{
        curobj.unit -= 1;
        if(curobj.unit === 0){
          items = items.filter((val) => val.id !== _id);
        }
      }
    }
    let count = 0;
    let total_price = 0;
    let total_mrp = 0;
    items.forEach((val,ind) => {
      count += val.unit;
      total_price += (val.price * val.unit);
      total_mrp += (val.mrp * val.unit);
    });
    updateCookie({items,modify:Date.now(),count,unique:items.length,total_price,total_mrp});
  }
  return <div className="pro-btn">
  {unit > 0 && <><button onClick={() => cartwork("DEC")}><i className="fa-solid fa-minus"></i></button>
  <span>{unit}</span>
  <button onClick={() => cartwork("INC")}><i className="fa-solid fa-plus"></i></button></>}
  {unit === 0 && <button className="add" onClick={() => cartwork("INC")}>ADD</button>}
</div>
}
function ProCard({val}){
  let {cart_data} = useContext(MainContext);
  let {items} = cart_data;
  const [unit,chunit] = useState(0);
  let {image,mrp,name,price,weight,_id} = val;
  useEffect(() => {
    let curobj = items.find((val) => val.id === _id);
    if(curobj !== undefined){
      chunit(curobj.unit);
    }else{
      chunit(0);
    }
  },[cart_data]);
  let per = (mrp - price)*100 / mrp;
    return <div className="pro-card">
    <span className="badge">{per.toFixed(2)}% OFF</span>
    <Link to={`/pro/${_id}`}><img src={pro_url + image} alt={name} /><span>{name.substr(0,45)+"..."}</span><span>{weight}</span></Link>
    <div className="d-flex"><div><b>₹{price}</b><span>₹{mrp}</span></div>
    <ProBtn obj={val} unit={unit} />
    </div>
  </div>
}
export default ProCard;
export {ProBtn};