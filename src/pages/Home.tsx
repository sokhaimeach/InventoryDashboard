import { Link } from "react-router-dom";
import CountNumber from "../components/CountNumber";

const Home = () => {
  return (
    <div>
        <p className="text-rose-400">Home page</p>
        <Link to="/">Home</Link>
        <Link to="/products">Product</Link>
        <CountNumber />
    </div>
  )
}

export default Home;