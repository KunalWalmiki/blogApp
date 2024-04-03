import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";


const useBlogs = () => {

    const [loading, setLoading] = useState(false);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {

        const fetchBlogs = async() => {

            setLoading(true);
            const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                headers : {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log(response);
            setBlogs(response?.data?.data);
            setLoading(false);
        }

        fetchBlogs();

    }, []);

    return {
        loading,
        blogs,
    }
}

export default useBlogs;