
import React from 'react';
import '../style/Footer.css';

export default function Footer() {
  return (
    <footer>
      <div className="footerfirst">
        <img src="/logo_sb.png" alt="logo" />
        <br />
        <p className="copyright">
          Copyright © 2025 - All rights reserved.
        </p>
      </div>
      <div className="footersecond">
        <h3>Contact Us</h3>
        <p>Email: instruments@sajhabajha.com</p>
        <p>Phone: +977-9841123463</p>
        <p>Address: Baneswor, Kathmandu, Nepal</p>
      </div>
      <div className="footerthird">
        <h3>Follow us</h3>
        <a href="/"><img src="/instalogo.png" alt="Instagram" /></a>
        <a href="/"><img src="/twitterlogo.png" alt="Twitter" /></a>
        <a href="/"><img src="/facebook.png" alt="Facebook" /></a>
        <a href="/"><img src="/githublogo.png" alt="GitHub" /></a>
      </div>
    </footer>
  );
}
