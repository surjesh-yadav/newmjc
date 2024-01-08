import React from 'react'
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import icon3 from '../image/svg-image-3.svg';
import icon4 from '../image/svg-image-4.svg';
import icon5 from '../image/svg-image-6.svg';

import icon7 from '../image/svg-image-8.svg';
import icon8 from '../image/svg-image-9.svg';
import {
    ConnectWallet,
  
  } from "@thirdweb-dev/react";
import logo from '../image/Vector.svg';

const Navbar = () => {

const storedData = localStorage.getItem('userData');
const userDataLocal = JSON.parse(storedData);
const userIDs = localStorage.getItem('userID');

const [userID, setUserID] = useState(userIDs)
const [previewID, setPreviewID] = useState("");
const [userData, setUserData] = useState(userDataLocal);

    const toggleDropdown = () => {
        const menuDropdown = document.querySelector('.menu_dropdown');
        menuDropdown.classList.toggle('visible');

        const dropdown = document.querySelector('.dropdown');
        dropdown.classList.toggle('visible2');

        const dropd_a = document.querySelector('.dropd_a');
        dropd_a.classList.toggle('dropd_a2');

        const arrow_down = document.querySelector('.arrow_down');
        arrow_down.classList.toggle('arrow_down2');

        const arrow_top = document.querySelector('.arrow_top');
        arrow_top.classList.toggle('arrow_top2');
    };

    // const [isMenuVisible, setMenuVisibility] = useState(false);

    const toggleDropdown2 = () => {
        const menuDropdown = document.querySelector('.sid_menus_all');
        menuDropdown.style.display = menuDropdown.style.display === 'none' ? 'block' : 'none';


        const menuDropdown2 = document.querySelector('.pre_Id');
        menuDropdown2.style.display = menuDropdown2.style.display === 'none' ? 'block' : 'none';

    };



  const handleChange = (event) => {
    setPreviewID(event.target.value);

  };


  const fetchData = async () => {
    console.log("Clicked")
    try {
      const response = await fetch("https://nodes.mjccoin.io/v1/alldetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: previewID }),
      });
      const data = await response.json();
      localStorage.setItem("userData", JSON.stringify(data));
      setUserData(data);
      setUserID(data.data?.user_id)
      window.location.reload();
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };


    return (
        <div>
            <div className="sidebar">
            <img className='main_desktop_logo' src='/logo_main.svg'/>

                <div className="sidebar_menu">
                    <div className='said_icons'>
                        <div className='logo_pri'>
                            <img src={logo} alt='logosicon' className='logosiconNavs' />

                        </div>
                       <div className='metamask_button_right'>  
                       <div className='mobile_connect_button'>
                       <ConnectWallet/>
                       </div>
                       <button onClick={toggleDropdown2} className='bars'><i className="fa fa-bars" aria-hidden="true"></i></button>
                       </div>
                    </div>

                    <div className='sid_menus_all'>

                        <div className='priviewld'>
                                    
                        </div>
                        <Link className="active" to="/"><span className='iconnav'><img className="iconnav" src={icon3} alt='icon' /></span>Dashboard</Link>

                        <div className="dropdown">
                            <Link onClick={toggleDropdown} className='dropd_a' id="tems">
                                <span className='iconnav'><img className="iconnav" src={icon4} alt='icon' /></span>  Team

                                <span className='arrow_down'> <i className="fa fa-angle-down" aria-hidden="true"></i> </span>

                                <span className='arrow_top'> <i className="fa fa-angle-up" aria-hidden="true"></i> </span>
                            </Link>

                            <div className="menu_dropdown">
                                <Link className="dropdown-item" to="/partners"> <span className='iconnav'><img className="iconnav" src={icon5} alt='icon' /></span>Partners</Link>
                                {/* <Link className="dropdown-item" to="/"> <span className='iconnav'><img className="iconnav" src={icon6} alt='icon' /></span>Links</Link> */}
                                <Link className="dropdown-item" to="/stats"> <span className='iconnav'><img className="iconnav" src={icon7} alt='icon' /></span>Stats</Link>
                            </div>
                        </div>

                        <Link to="/Registration"> <span className='iconnav'><img className="iconnav" src={icon8} alt='icon' /></span>Buy Tokens</Link>
            <Link>
         <div className="input_btn mobile_search_field">
              <input
                value={previewID}
                type="number"
                onChange={handleChange}
                className="input_NUmber"
                placeholder="Preview ID"
              />
             <button type="button" onClick={fetchData}>
                Search
              </button>
            </div>
                         </Link>
           
                        {/* <Link to="/Landing"> <span className='iconnav'><img className="iconnav" src={icon8} alt='icon' /></span>Landing</Link> */}

                        {/* <Link to="/"> <span className='iconnav'><img className="iconnav" src={icon9} alt='icon' /></span>Social</Link>
                        <Link to="/"> <span className='iconnav'><img className="iconnav" src={icon10} alt='icon' /></span>NFTs</Link> */}



                        {/* <Link to="/" ><span className='iconnav'><img className="iconnav" src={icon11} alt='icon' /></span>Promo & PDFs</Link> */}

                        <div className='social_media'>
                            {/* Your social media content */}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Navbar
