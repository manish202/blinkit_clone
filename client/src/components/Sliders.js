import { Swiper, SwiperSlide} from 'swiper/react';
import {Navigation} from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "./css/slider.css";
import ProCard from "./ProCard";
import { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import{toast} from "react-toastify";
import {offer_slide_url} from "../config";
function OfferSlider(){
    let [slides,chslide] = useState([]);
    let [loading,chloading] = useState(true);
    useEffect(() => {
        console.log("request gone OfferSlider");
        fetch("/api/offer_slides").then(res => res.json())
        .then((data) => {
            if(data.message === undefined){
                chslide(data);
            }else{
                toast.error(data.message);
            }
            chloading(false);
        }).catch((err) => {
            toast.error(err);
            chloading(false);
        });
    },[]);
    return <div className="container slider-wrapper">
        {loading && <div className="d-flex loading"><b></b><b></b><b></b></div>}
        {!loading && <Swiper
        slidesPerView={"auto"}
        spaceBetween={30}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
      {slides.map((val,ind) => {
        return <SwiperSlide key={ind}>
                <Link to={`/category/${val.category}/${val.subcategory}/`}><img src={offer_slide_url + val.image} alt="hello" /></Link>
            </SwiperSlide>
  })} 
      </Swiper>}
    </div>;
}
function OfferCodeSlide(){
    let [loading,chloading] = useState(true);
    let [slides,chslide] = useState([]);
    useEffect(() => {
        console.log("request gone OfferCodeSlide");
        fetch("/api/offer_codes").then(res => res.json())
        .then((data) => {
            if(data.message === undefined){
                chslide(data);
            }else{
                toast.error(data.message);
            }
            chloading(false);
        }).catch((err) => {
            toast.error(err);
            chloading(false);
        });
    },[]);
    return <div className="container slider-wrapper pro-slide-box">
    <div className="d-flex"><h1>Bank & Wallet Offers</h1></div>
    {loading && <div className="d-flex loading"><b></b><b></b><b></b></div>}
    {!loading && <Swiper
    slidesPerView={"auto"}
    spaceBetween={30}
    navigation={true}
    modules={[Navigation]}
    className="mySwiper"
  >
  {slides.map((val,ind) => {
        return <SwiperSlide key={ind}>
                <div className="offer-card">
                    <h2>flat {val.per}% off</h2>
                    <small>min txn ₹{val.min_txn}</small>
                    <span>code: {val.code}</span>
                    <button onClick={() => {navigator.clipboard.writeText(val.code); toast.success("copied!")}}>copy code</button>
                </div>
            </SwiperSlide>
  })}
  </Swiper>}
</div>;;
}
function ProductSlider({cid,cname}){
    //product slider based upon cid
    let [loading,chloading] = useState(true);
    let [products,chpro] = useState([]);
    useEffect(() => {
        console.log("request gone ProductSlider");
        fetch("/api/products",{
            method:"POST",
            body:JSON.stringify({cid:cid}),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res => res.json())
        .then((data) => {
            if(data.message === undefined){
                chpro(data);
            }else{
                toast.error(data.message);
            }
            chloading(false);
        }).catch((err) => {
            toast.error(err);
            chloading(false);
        });
    },[]);
    return <div className="container slider-wrapper pro-slide-box">
    {loading && <div className="d-flex loading"><b></b><b></b><b></b></div>}
    <div className="d-flex"><h1>{cname}</h1>
    <Link className="btn-green g-button" to={`/category/${cid}/0`}>view all</Link></div>
    {!loading && <Swiper
    slidesPerView={"auto"}
    spaceBetween={30}
    navigation={true}
    modules={[Navigation]}
    className="mySwiper"
  >
  {products.map((val,ind) => {
      return <SwiperSlide key={ind}>
                <ProCard val={val}/>
            </SwiperSlide>
  })}
  </Swiper>}
</div>;
}
function ProductBox(){
    return(
        <>
            <ProductSlider cid="62e4d08da54a650242e51e78" cname="fruits & vegetables" />
            <ProductSlider cid="62e4d54ddbf79b9774ce095a" cname="breakfast & instant food" />
            <ProductSlider cid="62e4d54ddbf79b9774ce095f" cname="baby care" />
        </>
    )
}
export {OfferCodeSlide,OfferSlider,ProductBox};