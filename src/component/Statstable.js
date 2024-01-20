import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import img1 from "../image/Vector.svg";

import "../page/style.css";
import { Link } from "react-router-dom";
import {
  ConnectWallet,
  useContract,
} from "@thirdweb-dev/react";

const Statstable = () => {

    // Retrieve data from localStorage
    var storedData = localStorage.getItem('userData');
    var userDataReal = JSON.parse(storedData);
    const wallet_address = userDataReal?.data?.wallet_address;  

    const [tableData, setTableData] = useState("");
    const fetchData2 = () => {
      const apiUrl = `http://localhost:3200/get/chain?address=${wallet_address.toLowerCase()}`;
      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setTableData(data.data.details);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }; 
    
    const [previewID, setPreviewID] = useState("");
    const [userData, setUserData] = useState(null);
  
    const handleChange = (event) => {
      setPreviewID(event.target.value);
    };
  
    const fetchData = async () => {
      try {
        const response = await fetch("https://nodes.mjccoin.io/v1/alldetails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: previewID }),
        });
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
  
    const handleSearch = () => {
      fetchData();
      fetchData2();
      toggleDropdown2();
    };
  useEffect(()=>{
    fetchData2();
  },[])

  const toggleDropdown2 = () => {
    const menuDropdown = document.querySelector('.sid_menus_all');
    menuDropdown.style.display = menuDropdown.style.display === 'none' ? 'block' : 'none';


    const menuDropdown2 = document.querySelector('.pre_Id');
    menuDropdown2.style.display = menuDropdown2.style.display === 'none' ? 'block' : 'none';

};
   
    
     
 
  
  return (
    <React.Fragment>
      <div className="container">
        <div className="pre_Id">
        <div className="pri_id_cnct_btn">
          <div className="pri_id_img">
            <img src={img1} alt="logo" className="logoimg_priview" />
            <p>Preview ID</p>
            <div className="input_btn desktop_search_field">
              <input
                value={previewID}
                type="number"
                onChange={handleChange}
                className="input_NUmber"
                placeholder="Preview ID"
              />
              <button type="button" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
          {/* <div className="connect_btn">
            <ConnectWallet />
          </div> */}
        </div>
        </div>
      </div>
      <Navbar />
      <div className="content">
        <div className="container">
          <div className="forsgae1_main">
                <div className="Total_revenue">
                  <p>Total Direct revenue</p>
                  <h5>
                    {/* {box50 ? ((50 - 50 * 0.15) / 2) * box50 : "0.00"} USDT */}
                  </h5>
                  {/* <span><img src={img4} alt='user_icon' className='userd_icon' /></span> */}
                </div>
              </div>
            </div>
            <div className="tabls">
              <table className="table">
                <thead>
                  <tr>
                   <th> </th>
                    <th>Amount</th>
                    <th>Level</th>
                    <th>User Id</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData &&
                    tableData.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <span className="">
                            <img src="/tick.svg"/>
                            </span>
                          </td>
                          <td>{item.amount}</td>
                          <td>
                            <Link className="link_table link_table2">
                             {item.level}
                            </Link>
                          </td>
 
                          <td>
                            {(item.user_id)}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        {/* </div> */}

    </React.Fragment>
  )
}

export default Statstable