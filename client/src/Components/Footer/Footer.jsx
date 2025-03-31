import './Footer.css';
import { Link } from 'react-router';

export default function Footer() {
  return (
    <>
      <footer id="contact" className="contact">
        <div className="container">
          <div className="footer-top">
            <div className="row">
      
              <div className="col-md-4 col-sm-6">
                <div className="single-footer-widget">
                  <div className="footer-logo">
                    <Link to='/'>carvilla</Link>
                  </div>
                  <p>
                    Ased do eiusm tempor incidi ut labore et dolore magnaian aliqua.
                    Ut enim ad minim veniam.
                  </p>
                  <div className="footer-contact">
                    <p>info@themesine.com</p>
                    <p>+1 (885) 2563154554</p>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-sm-6">
                <div className="single-footer-widget">
                  <h2>Quick Links</h2>
                  <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/catalog">Catalog</Link></li>
                    <li><Link to="/search">Search</Link></li>
                    
                  </ul>
                </div>
              </div>

              <div className="col-md-4 col-sm-6">
                <div className="single-footer-widget">
                  <h2>Follow Us</h2>
                  <div className="footer-social">
                    <a href="#"><i className="fa fa-facebook" /></a>
                    <a href="#"><i className="fa fa-instagram" /></a>
                    <a href="#"><i className="fa fa-linkedin" /></a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-copyright">
            <div className="row">
              <div className="col-sm-12 text-center">
                <p>© copyright SoftUni React Exam March 2025</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
