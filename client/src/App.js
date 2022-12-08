import Header from "./components/Header";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {OfferCodeSlide,OfferSlider,ProductBox} from "./components/Sliders";
import Category from "./components/Category";
import BigSlider from "./components/BigSlider";
import CatBrandFoot from "./components/CatBrandFoot";
import SearchPage from "./components/SearchPage";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Error404 from "./components/Error404";
import CategoryPage from "./components/CategoryPage";
import BrandPage from "./components/BrandPage";
import SinglePage from "./components/SinglePage";
import {getCookie,setCookie} from "./components/cookieTask";
import {useReducer, createContext} from "react";
export let MainContext = createContext();
function Home(){
    return(
        <>
            <OfferSlider />
            <Category />
            <OfferCodeSlide />
            <BigSlider />
            <ProductBox />
        </>
    )
}
function App(){
    const reducer = (state,action) => {
        switch(action.type){
            case "CART_UPDATE":
                return {...state,cart_data:action.data};
            default:
                return state;
        }
    }
    //first time when application load we set user_cart cookie
    let cart_data = getCookie("user_cart");
    if(cart_data === undefined){
        setCookie("user_cart",{items:[],modify:Date.now(),count:0,unique:0,total_mrp:0,total_price:0});
    }
    cart_data = getCookie("user_cart");
    let [state,dispatch] = useReducer(reducer,{cart_data,});
    const updateCookie = (data) => {
        setCookie("user_cart",data);
        dispatch({type:"CART_UPDATE",data});
    }
    return <BrowserRouter>
        <MainContext.Provider value={{...state,updateCookie}}>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search/:q" element={<SearchPage />} />
                <Route path="/pro/:pid" element={<SinglePage />} />
                <Route path="/category/:cid/:subcid" element={<CategoryPage />} />
                <Route path="/brand/:bid/:bname" element={<BrandPage />} />
                <Route path="*" element={<Error404 />} />
            </Routes>
            <ToastContainer position="top-center"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover />
            <CatBrandFoot />
        </MainContext.Provider>
    </BrowserRouter>
}
export default App;