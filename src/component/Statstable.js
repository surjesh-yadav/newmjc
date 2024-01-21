import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import img1 from "../image/Vector.svg";

import "../page/style.css";
import { Link } from "react-router-dom";
import { ConnectWallet, useContract } from "@thirdweb-dev/react";

const Statstable = () => {
  // Retrieve data from localStorage
  var storedData = localStorage.getItem("userData");
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

  console.log(tableData)

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
      console.log(data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleSearch = () => {
    fetchData();
    fetchData2();
    
  };
  useEffect(() => {
    fetchData2();
  }, []);

  const toggleDropdown2 = () => {
    const menuDropdown = document.querySelector(".sid_menus_all");
    menuDropdown.style.display =
      menuDropdown.style.display === "none" ? "block" : "none";

    const menuDropdown2 = document.querySelector(".pre_Id");
    menuDropdown2.style.display =
      menuDropdown2.style.display === "none" ? "block" : "none";
  };

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
                <th>Type</th>
                <th>Amount</th>
                <th>User ID</th>
                <th>Level</th>
              </tr>
            </thead>
            <tbody>
              {displayedtableData.length > 0 ? 
                displayedtableData.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <span className="">
                          <img src="/tick.svg" />
                        </span>
                      </td>
                      <td>{item.amount.toFixed(2)} USDT</td>
                      <td>
                        <Link className="link_table link_table2">
                          {item.user_id}
                        </Link>
                      </td>

                      <td>{item.level}</td>
                    </tr>
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
      {/* </div> */}
    </React.Fragment>
  );
};

export default Statstable;
