import React, { useEffect, useState } from "react";
import img6 from "../image/svg-image-6.svg";
import img8 from "../image/svg-image-8.svg";
import img4 from "../image/svg-image-4.svg";
import tiffanysedo from "../image/blue-blur.png";
import Navbar from "../component/Navbar";
import img1 from "../image/Vector.svg";
import PriviewId from "../component/PriviewId";
import "./style.css";
import { ethers } from "ethers";

import { Link } from "react-router-dom";
import {
  ConnectWallet,
  useSDK,
  useTokenBalance,
  useContract,
  useAddress,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";

const Forsage1 = () => {


  var storedData = localStorage.getItem('userData');
  var userDataReal = JSON.parse(storedData);
  const wallet_address = userDataReal?.data?.wallet_address;

 
  const [tableData, setTableData] = useState("");
  const fetchData2 = () => {
   
    const apiUrl = `http://localhost:3200/v1/filtering?address=${wallet_address}&amount=1000`;
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setTableData(data.data);
        
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
      const response = await fetch("http://localhost:3200/v1/alldetails", {
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
    // fetchData();
    fetchData2();
  };

  
useEffect(()=>{
  fetchData2();
}, [])
 
  
   
  // Retrieve data from localStorage


  const { contract } = useContract(
    "0x5E19d78968baD32Fd9DA4B8ea55716068b1EC82a"
  );
  const { contract: USDTContract } = useContract(
    "0x0ECBBF0D46E13cC4fffdf14AbC39D8332c89Ad8b"
  );

  const numberOfElements = 10; // Change this to the desired number of elements
  const { data: getThePlansCount, isLoading: isPlanCountLoading } =
    useContractRead(contract, "getThePlanCount", [wallet_address, ethers.utils.parseEther("1000")]);

  const result1000 = getThePlansCount;
  
  const box1000 = Number(result1000 && result1000?._hex);

  const blueElements1000 = Array.from({ length: 10 }).map((_, index) => (
    <h3
      key={index}
      className={
        index < box1000 ? "forsage_detail_box" : "forsage_blue other_box"
      }
    >
      {index < tableData.length ? tableData[index].user_id : null} {/* Assuming TableData contains the data you want to display */}
    </h3>
  ));

  
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedtableData = tableData?.slice(startIndex, endIndex);

  const [activeTab, setActiveTab] = useState(1);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 3; // You can adjust this number based on your preference

    if (10 <= maxPagesToShow) {
      // If there are fewer pages than the max to show, display all pages
      for (let i = 1; i <= 10; i++) {
        pageNumbers.push(
          <span
            key={i}
            onClick={() => handlePageChange(i)}
            className={currentPage === i ? "active" : ""}
          >
            {i}
          </span>
        );
      }
    } else {
      // Display ellipsis and a range of pages around the current page
      const startPage = Math.max(
        1,
        currentPage - Math.floor(maxPagesToShow / 2)
      );
      const endPage = Math.min(10, startPage + maxPagesToShow - 1);

      if (startPage > 1) {
        pageNumbers.push(<span key="startEllipsis">...</span>);
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <span
            key={i}
            onClick={() => handlePageChange(i)}
            className={currentPage === i ? "active" : ""}
          >
            {i}
          </span>
        );
      }

      if (endPage < 10) {
        pageNumbers.push(<span key="endEllipsis">...</span>);
        // Display the last two digits
        pageNumbers.push(
          <span
            key={10}
            onClick={() => handlePageChange(10)}
            className={currentPage === 10 ? "active" : ""}
          >
            {10}
          </span>
        );
      }
    }

    return pageNumbers;
  };

  return (
    <React.Fragment>
      <div className="container">
        <div className="pre_Id">
          <div className="pri_id_img">
            <img src={img1} alt="logo" className="logoimg_priview" />
            <p>Preview ID</p>
            <div className="input_btn desktop_search_field">
              <input
                value={previewID}
                type="number"
                onChange={handleChange}
                className="input_NUmber"
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
      <Navbar />
      <div className="content">
        <div className="container">
          <div className="forsgae1_main">
            {/* <div className='forsage_title2'>
            <h1>MJC</h1>
            <h3>174 209.8 BUSD</h3>
          </div> */}

            <div
              className="forsgae_level_card"
              // style={{
              //   backgroundImage: `url(${tiffanysedo})`,
              //   backgroundSize: "cover",
              // }}
            >
              {/* <div className='bg_imes_forsgae'>
              <img src={tiffanysedo} alt='blue_color' className='greenBg2' />
            </div> */}
              <div className="level_title">
                <h4></h4>
                <h1>$1000 Plan</h1>
                <h4></h4>
              </div>
              <div className="levels_card_chain">
                <div className="card_chain2">{blueElements1000}</div>
              </div>

              <div className="cycle_name">
                <div className="cycle_name_left">
                  <div className="partners">
                    <p>Partners</p>
                    <h5>
                      <span>
                        <img
                          src={img6}
                          alt="user_icon"
                          className="userd_icon"
                        />
                      </span>
                      {Number(result1000)}
                    </h5>
                  </div>
                </div>

                <div className="Total_revenue">
                  <p>Total Direct revenue</p>
                  <h5>
                    {box1000 ? ((1000 - 1000 * 0.15) / 2) * box1000 : "0.00"} USDT
                  </h5>
                  {/* <span><img src={img4} alt='user_icon' className='userd_icon' /></span> */}
                </div>
              </div>
            </div>
            <div className="tabls">
              <table className="table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Date</th>
                    <th>ID</th>
                    <th>Wallet</th>
                    <th>USDT</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedtableData.length > 0 ? 
                    displayedtableData.map((item, index) => {
                      return (
                        <>
                        <tr key={index}>
                          <td>
                            <span className="">
                            <img src="/tick.svg"/>
                            </span>
                          </td>
                          <td>{item.createdAt}</td>
                          <td>
                            <Link className="link_table link_table2">
                             {item.user_id}
                            </Link>
                          </td>
                          <td>
                            <div className="link_icon">
                              <p>
                                <a href="#" className="link_table">
                                  {item.user_wallet}{" "}
                                  {/* Replace with actual data */}
                                  <span className="files">
                                    <i
                                      className="fa fa-files-o"
                                      aria-hidden="true"
                                    ></i>
                                  </span>
                                  <span className="linkIcon">
                                    <i
                                      className="fa fa-link"
                                      aria-hidden="true"
                                    ></i>
                                  </span>
                                </a>
                              </p>
                            </div>
                          </td>
                          <td>
                            {((item.buyed_plan[0].amount -
                              item.buyed_plan[0].amount * 0.15) /
                              2).toFixed(2)}
                          </td>
                        </tr>
                        </>
                      );
                    }) : <h1 className="nodata_h">No data found!</h1>}
                </tbody>
              </table>
              {tableData.length > 10 &&
          <div className="flex pagination_postion justify-end ">
            <div className="pagination-container flex space-between space-x-5">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              <div className="page-numbers  flex space-x-2">
                {renderPageNumbers()}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === 10}
              >
                Next
              </button>
            </div>
          </div>
          }
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Forsage1;
