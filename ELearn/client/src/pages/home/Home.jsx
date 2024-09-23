import React from 'react'
import "./home.css"
import {useNavigate} from 'react-router-dom'
import Testmonials from '../../components/testimonials/Testmonials';
const Home = () => {
  const navigate=useNavigate();
  return (
    <div>
      <div className="home">
        <div className="home-content">
          <h1>Welcome to E-learning Platform</h1>
          <p>Learn, Grow, Excel</p>
          <button onClick={()=>navigate("/courses")} className='common-btn'>Get started</button>
        </div>
      </div>
      <Testmonials></Testmonials>
    </div>
  )
}

export default Home