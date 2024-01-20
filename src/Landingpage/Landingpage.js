import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import roadmap1 from "../image/social.png";
import roadmap2 from "../image/achievements.png";
// import roadmap3 from '../image/bigRefferalСontest.png';
import roadmap4 from "../image/games.png";
import roadmap5 from "../image/customInvitePdf.png";
import roadmap6 from "../image/maxqore.png";
import roadmap7 from "../image/token.png";
import img26tick from "../image/greentick.svg";
import info27 from "../image/svg-image-27.svg";
import svg31viewicon from "../image/svg-image-31.svg";
import bluecircle from "../image/blue-blur.webp";
import icon1 from "../image/icon3.svg";
import icon2 from "../image/icon1.svg";
import icon3 from "../image/icon2.svg";
import logo from "../image/Vector.svg";
import frx from "../image/bg.webp";
import frx3 from "../image/bg33.webp";
import frx2 from "../image/bg2.webp";
import poket_img from "../image/kisspng.svg";

import bluesedo from "../image/gold-blur.png";
import plashtfiny from "../image/tiffany-blur.png";
import { Link } from "react-router-dom";
import {useLogin } from "@thirdweb-dev/react";
import {
  ConnectWallet,
  useSDK,
  useTokenBalance,
  useContract,
  useAddress,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Landingpage = () => {
  const [showButton, setShowButton] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const walletElement = document.querySelector(".tw-connect-wallet");
    if (walletElement) {
      // If .tw-connect-wallet is present, hide the button
      setShowButton(false);
    }
  }, [showButton]);

  const [previewID, setPreviewID] = useState("");
  const [userData, setUserData] = useState(null);
  const [userstakeData, setStakeData] = useState(null);
  let  [ stakwallet , setStakeWallet ] = useState()

  const handleChange = (event) => {
    setPreviewID(event.target.value);
  };
  const { contract } = useContract(
    "0xc81f6530Ec56C226817Bfa297B9B0cc7DFCD7dD1"
  );
  

  const fetchData = async (UserID) => {
    try {
      const response = await fetch("https://nodes.mjccoin.io/v1/alldetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: UserID }),
      });
      const data = await response.json();
      localStorage.setItem("userData", JSON.stringify(data));
      try {
      
      } catch (error) {
        console.log(error)
      }
      setStakeData(data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };
 



  const handleSearch = () => {
    fetchData(previewID);
   // getstekeTokens();
  };

  function scrollFunction() {
    var scrollToTopBtn = document.getElementById("scrollToTopBtn");
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      scrollToTopBtn.style.display = "block";
    } else {
      scrollToTopBtn.style.display = "none";
    }
  }

  console.log(userData);
 

  const wallet_address = useAddress()


  const { data: Parent, isLoading: isParentLoading } = useContractRead(
    contract,
    "Parent",
    [wallet_address]
  );


const [userID, setUserId] = useState("")

  const getDetails = async (wallet_address) => {
    console.log(wallet_address)
    try {
      let dumy = await fetch("https://nodes.mjccoin.io/v1/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address: wallet_address.toLowerCase() }),
      });
      let response = await dumy.json();
      localStorage.setItem("userID", JSON.stringify(response.data.user_id));
      setUserId(response.data.user_id)

    } catch (error) {
      console.log(error);
    }
  };
useEffect(()=>{
  getDetails(wallet_address)
}, [wallet_address])


const handleSearchDashboard = ()=>{
  fetchData(userID);
}



  return (
    <div id="scrollToTopBtn" className="landingpage_main">
      <ToastContainer />
      <div className="container">
        <div className="main_top_logo">
          <div className="logos_landing">
            <span>
              <img src={logo} alt="logos" className="logolanding" />
            </span>
          </div>

          <div className="smart_chains">
            <div className="smart_chain_1">
              <spna>
                <img
                  src={icon1}
                  alt="smart_chain"
                  className="smart_chain_icon"
                />
              </spna>
              <p>Smart Chain</p>
            </div>

            <div className="connect_btn mobile-connect-button">
              {/* <button> <Link to="/dashboard">Dashboard </Link></button> */}
                <ConnectWallet/>
            </div>
          </div>
        </div>
        <div
          className="register_in"
          style={{
            backgroundImage: `url(${plashtfiny})`,
            backgroundSize: "cover",
          }}
        >
          <div className="register_left">
            <h1>Register on MJC platform</h1>
            <p>
              Connect your wallet to start working. First time here? Watch a
              tutorial to learn more
            </p>
            <div className="join_bth">
            
            {Parent === "0x0000000000000000000000000000000000000000" || Parent === undefined ? 
              <button>
                <a href="/Registration" className="join_btn">
                 Sign In
                </a>
              </button> : 
              <button onClick={handleSearchDashboard}>
                  Dashboard
              </button>
            }
              <button>
                <a href="/Registration" className="wath_tut">
                  Registration
                </a>
              </button>
            </div>
          </div>

          <div className="register_right">
            <img src={poket_img} alt="pocket_img" className="poket_img" />
          </div>
        </div>
        <div className="owl_crousel">
          <div id="demo" className="carousel slide" data-ride="carousel">
            <ul className="carousel-indicators">
              <li data-target="#demo" data-slide-to="0" className="active"></li>
              <li data-target="#demo" data-slide-to="1"></li>
              <li data-target="#demo" data-slide-to="2"></li>
            </ul>

            <div className="carousel-inner">
              <div className="carousel-item active">
                <div
                  className="maxqore"
                  style={{
                    backgroundImage: `url(${frx3})`,
                    backgroundSize: "cover",
                  }}
                >
                  <h5>USDT Earning </h5>

                  <button>Coming soon</button>
                </div>
              </div>
              <div className="carousel-item">
                <div
                  className="maxqore"
                  style={{
                    backgroundImage: `url(${frx})`,
                    backgroundSize: "cover",
                  }}
                >
                  <h5>Listing on LATOKEN</h5>

                  <button>Trade MJC</button>
                </div>
              </div>
              <div className="carousel-item">
                <div
                  className="maxqore"
                  style={{
                    backgroundImage: `url(${frx})`,
                    backgroundSize: "cover",
                  }}
                >
                  <h5>Listing on LATOKEN</h5>

                  <button>Trade MJC</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="Account_preview">
          <div className="account_title">
            <h1>Account preview</h1>
            <p>
              Look up any MJC member account in preview mode. Enter ID to
              preview or click Demo to view a random account.
            </p>
          </div>

          <div className="wallwte_input">
            <div className="wall_left">
              <p>Enter User ID</p>

              <div className="previw_input_btn ">
                <input
                  value={previewID}
                  type="number"
                  onChange={handleChange}
                  className="account_input"
                  val=""
                />
                <a href="#scrollToTopBtn">
                  {" "}
                  <button onClick={handleSearch}>Preview</button>
                </a>
              </div>
            </div>
            <div className="wall_right">
              <p>Don’t know any ID?</p>
              <button>Check demo</button>
            </div>
          </div>
        </div>

        <div className="need_help_section">
          <h1>Need help with using the platform?</h1>
          <p>Get qualified support from MJC experts via online chat</p>
          <button className="contact_suppo">Contact support</button>

          {/* <img src={bluecircle} alt="bluecircle" className="bluecircle" /> */}
        </div>

        <div className="copy_right">
          <div className="copy_left">
            <p>© 2023 All Rights Reserved</p>
            <p>Documents</p>
          </div>

          <div className="social_media">
            <i className="fa fa-telegram" aria-hidden="true"></i>
            <i className="fa fa-youtube-play" aria-hidden="true"></i>
            <i className="fa fa-twitter" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landingpage;
