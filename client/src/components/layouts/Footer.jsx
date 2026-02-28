import React from 'react'
import { useLocation } from 'react-router-dom';
import './Footer.css'

export default function Footer() {
  const location = useLocation();

  if (location.pathname.startsWith('/admin')) {
      return null;
  }

  return (
    <footer className="footer relative pt-5">
      {/* Newsletter Section */}
      <section className="newsletter-section w-full">
        <div className="container px-4 py-5">
          <div className="row align-items-center">
            <div className="col-12 col-md-6 mb-4 mb-md-0">
              <h2 className="newsletter-title">
                STAY UPTO DATE ABOUT<br />
                OUR LATEST OFFERS
              </h2>
            </div>
            <div className="col-12 col-md-6">
              <div className="newsletter-form">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="newsletter-input"
                />
                <button className="newsletter-btn">Subscribe to Newsletter</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Footer Content */}
      <section className="footer-content">
        <div className="container px-4">
          <div className="row mb-5">
            {/* Shop.co Column */}
            <div className="col-12 col-md-3 mb-4 mb-md-0">
              <h5 className="footer-brand">SHOP.CO</h5>
              <p className="footer-description">
                We have clothes that suits your style and which you're proud to wear. From women to men.
              </p>
              <div className="social-icons">
                <a href="/" className="social-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M18 2h-3V0h-2v2h-4V0H7v2H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 16H4V7h14v11z"/>
                  </svg>
                </a>
                <a href="/" className="social-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 0C4.5 0 0 4.5 0 10s4.5 10 10 10 10-4.5 10-10S15.5 0 10 0zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S14.33 6 13.5 6 12 6.67 12 7.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S7.33 6 6.5 6 5 6.67 5 7.5 5.67 9 6.5 9zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H4.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
                  </svg>
                </a>
                <a href="/" className="social-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.6 6.3c.1.7.1 1.5.1 2.2 0 6.8-5.2 14.7-14.7 14.7-2.9 0-5.6-.8-7.9-2.3.4.1.8.1 1.2.1 2.4 0 4.6-.8 6.4-2.3-2.3 0-4.2-1.5-4.8-3.6.3 0 .7.1 1 .1.5 0 .9 0 1.4-.1-2.5-.5-4.3-2.7-4.3-5.3v-.1c.7.4 1.6.6 2.5.7-1.5-1-2.4-2.7-2.4-4.6 0-1 .3-2 .8-2.9 2.7 3.3 6.7 5.5 11.2 5.8-.1-.4-.1-.8-.1-1.2 0-3 2.4-5.4 5.4-5.4 1.6 0 3 .6 4 1.7 1.2-.2 2.4-.7 3.4-1.3-.4 1.2-1.2 2.2-2.3 2.9 1.1-.1 2.1-.4 3.1-.9-.7 1.1-1.6 2-2.6 2.8z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Company Column */}
            <div className="col-6 col-md-2 mb-4 mb-md-0">
              <h5 className="footer-column-title">COMPANY</h5>
              <ul className="footer-links">
                <li><a href="/">About</a></li>
                <li><a href="/">Features</a></li>
                <li><a href="/">Works</a></li>
                <li><a href="/">Career</a></li>
              </ul>
            </div>

            {/* Help Column */}
            <div className="col-6 col-md-2 mb-4 mb-md-0">
              <h5 className="footer-column-title">HELP</h5>
              <ul className="footer-links">
                <li><a href="/">Customer Support</a></li>
                <li><a href="/">Delivery Details</a></li>
                <li><a href="/">Terms & Conditions</a></li>
                <li><a href="/">Privacy Policy</a></li>
              </ul>
            </div>

            {/* FAQ Column */}
            <div className="col-6 col-md-2 mb-4 mb-md-0">
              <h5 className="footer-column-title">FAQ</h5>
              <ul className="footer-links">
                <li><a href="/">Account</a></li>
                <li><a href="/">Manage Deliveries</a></li>
                <li><a href="/">Orders</a></li>
                <li><a href="/">Payments</a></li>
              </ul>
            </div>

            {/* Resources Column */}
            <div className="col-6 col-md-2">
              <h5 className="footer-column-title">RESOURCES</h5>
              <ul className="footer-links">
                <li><a href="/">Free eBooks</a></li>
                <li><a href="/">Development Tutorial</a></li>
                <li><a href="/">How to - Blog</a></li>
                <li><a href="/">Youtube Playlist</a></li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom">
            <div className="row align-items-center">
              <div className="col-12 col-md-6">
                <p className="footer-copyright">
                  Shop.co © 2000-2023. All Rights Reserved
                </p>
              </div>
              <div className="col-12 col-md-6">
                <div className="payment-icons">
                  <img src="/images/footer/payment-visa.png" alt="Visa" className="payment-icon" style={{width: "auto", height: "50px"}}/>
                  <img src="/images/footer/payment-mastercard.png" alt="Mastercard" className="payment-icon" style={{width: "auto", height: "50px"}}/>
                  <img src="/images/footer/payment-paypal.png" alt="PayPal" className="payment-icon" style={{width: "auto", height: "50px"}}/>
                  <img src="/images/footer/payment-apple.png" alt="Apple Pay" className="payment-icon" style={{width: "auto", height: "50px"}}/>
                  <img src="/images/footer/payment-google.png" alt="Google Pay" className="payment-icon" style={{width: "auto", height: "50px"}}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
  )
}
