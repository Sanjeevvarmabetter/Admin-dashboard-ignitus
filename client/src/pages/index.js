import Dashboard from "./admin/dashboard";
import { useRouter } from "next/router";
import "../styles/app.module.css";

const IndexPage = () => {

    const router = useRouter();

    
    return <Dashboard />;




};

export default IndexPage;
