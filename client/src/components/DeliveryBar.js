import {useState,useEffect} from "react";
import {getCookie,setCookie} from "./cookieTask";
import {toast} from "react-toastify";
function Suggestion(obj){
    let [citydata,chcitydata] = useState(null);
    let [inp,chinp] = useState("");
    const setaddr = () => {
        setCookie("user_cur_loc",citydata);
        obj.cha(citydata);
        obj.hide(false);
    }
    const getAddress = () => {
        inp = inp.trim();
        let url = `https://api.geoapify.com/v1/geocode/search?text=${inp},india&apiKey=5c0ddf3ccd9f4d34b23df19c578a6ec5`;
        if(inp !== ""){
            console.log("request gone Suggestion");
            fetch(url).then(res => res.json()).then((res) => {
                if(res.features !== undefined){
                    let {address_line1,address_line2,city,country_code,formatted,housenumber,postcode,state,state_code} = res.features[0].properties;
                    let locdata = {address_line1,address_line2,city,country_code,formatted,housenumber,postcode,state,state_code};
                    chcitydata(locdata);
                }else{
                    chcitydata(null);
                }
            }).catch(err => toast.error(err));
        }
    }
    useEffect(() => {
        let x = setTimeout(() => {
            getAddress();
        },500);
        return () => clearTimeout(x);
    },[inp]);
    return <div className="search-loc">
    <input type="text" value={inp} onChange={(e) => chinp(e.target.value)} className="my-input" placeholder="village/city name" />
    {citydata && <ul>
        <li onClick={setaddr}>{citydata.formatted}</li>
    </ul>}
</div>
}
function Delivery(){
    let [loading,chloading] = useState(false);
    let [current_loc,updateLoc] = useState(null);
    let [show,chshow] = useState(false);
    const load_cur_loc = () => {
        let loc_data = getCookie("user_cur_loc");
        if(loc_data !== undefined){
            updateLoc(loc_data);
        }
    }
    useEffect(() => {
        //when component render first time we check user current location data in cookie
        load_cur_loc();
    },[]);
    
    const getLocation = () => {
        if(navigator.geolocation){
            chloading(true);
            navigator.geolocation.getCurrentPosition((position) => {
                let lat = position.coords.latitude;
                let long = position.coords.longitude;
                let url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&apiKey=5c0ddf3ccd9f4d34b23df19c578a6ec5`;
                console.log("request gone Delivery");
                fetch(url).then(res => res.json()).then((res) => {
                    if(res.features !== undefined){
                        let {address_line1,address_line2,city,country_code,formatted,housenumber,postcode,state,state_code} = res.features[0].properties;
                        let locdata = {address_line1,address_line2,city,country_code,formatted,housenumber,postcode,state,state_code};
                        setCookie("user_cur_loc",locdata);
                        updateLoc({address_line1,address_line2});
                        chshow(false);
                    }else{
                        toast.error(res);
                    }
                    chloading(false);
                }).catch(err => toast.error(err));
            },(err) => {
                //do nothing because user denied location permission.
                chloading(false);
                toast.error("please enable location permission from settings.");
            });
        }else{
            toast.error("your browser does not support geolocation or you denied location permission");
        }
    }
    return(
        <>
            <div className="location" onClick={() => chshow(true)}>
                <h4>delivery in 8 minutes</h4>
                <p>{current_loc === null ? "manish prajapati, post off..":`${current_loc.address_line1},${current_loc.address_line2}`.substr(0,25)+".."} <i className="fa-solid fa-caret-down"></i></p>
            </div>
            {show && <div className="location-card">
                <div className="relative">
                    <div className="inline">
                        <span>change location</span>
                        <span onClick={() => chshow(false)}><i className="fa-solid fa-xmark"></i></span>
                    </div>
                    <div className="detect-loc d-flex">
                        <button className="btn-green g-button" onClick={getLocation}>detect my location</button>
                        <span>OR</span>
                        <Suggestion hide={chshow} cha={updateLoc} />
                    </div>
                    {loading && <div className="d-flex loading"><b></b><b></b><b></b></div>}
                </div>
            </div>}
            {show && <div className="popup-shadow" onClick={() => chshow(false)}></div>}
        </>
    )
}
export default Delivery;