import { Navigate} from "react-router-dom";

const PrivateRoute = ({children} : any) => {

    if(localStorage.getItem("token") !== null) {

        return children;

    } else {

         return <Navigate to={"/"} />

    }

}

export default PrivateRoute;