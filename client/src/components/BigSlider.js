import { Swiper, SwiperSlide} from 'swiper/react';
import {Navigation} from "swiper";
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import {toast} from "react-toastify";
import {adv_slide_url} from "../config";
function BigSlider(){
    let [slides,chslide] = useState([]);
    let [loading,chloading] = useState(true);
    useEffect(() => {
        console.log("request gone BigSlider");
        fetch("/api/adv_slides").then(res => res.json())
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
    return <div className="container big-slider">
    {loading && <div className="d-flex loading"><b></b><b></b><b></b></div>}
    {!loading && <Swiper
    navigation={true}
    modules={[Navigation]}
    className="mySwiper"
  >
  {slides.map((val,ind) => {
        return <SwiperSlide key={ind}>
                <Link to={`/category/${val.category}/${val.subcategory}/`}><img src={adv_slide_url + val.image} alt="hello" /></Link>
            </SwiperSlide>
  })}
  </Swiper>}
</div>;
}
export default BigSlider;