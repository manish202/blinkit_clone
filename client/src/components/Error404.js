import {Link} from "react-router-dom";
function Error404(){
    return <div className="container min-vh-90">
        <Link to="/">go home</Link>
        <h1>Oops! Error 404 Page Note Found</h1>
    </div>
}
export default Error404;