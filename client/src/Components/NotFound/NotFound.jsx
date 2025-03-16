import './NotFound.css'
import { Link } from "react-router";

export default function NotFound() {
   return (
    <>
    <div className="notfound-container">
    <h1>404 - Page Not Found</h1>
    <p>Sorry, the page you're looking for doesn't exist.</p>
    <Link to="/">Go back to Home</Link>
  </div>
  </>
   );
}