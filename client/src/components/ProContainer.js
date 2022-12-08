import ProCard from "./ProCard";
function ProContainer({data}){
    if(data.length !== 0){
        return <div className="d-flex">
            {data.map((val,ind) => {
                return <ProCard key={ind} val={val} />
            })}
        </div>
    }else{
        return <div className="d-flex min-vh-90"><h1>no products found</h1></div>
    }
}
export default ProContainer;