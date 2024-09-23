import React from 'react'
import {
    AiFillFacebook,
    AiFillTwitterSquare,
    AiFillInstagram,
  } from "react-icons/ai";
import './footer.css'
const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <p>
          &copy; 2024 Your E-Learning Platform. All rights reserved. <br /> Made
          by  <a href="">Divyanshu Agarwal</a>
        </p>
        <div className="social-links">
          <a href="">
            <AiFillFacebook />
          </a>
          <a href="">
            <AiFillTwitterSquare />
          </a>
          <a href="">
            <AiFillInstagram />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer