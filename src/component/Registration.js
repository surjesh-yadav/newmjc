import plashtfiny from "../image/tiffany-blur.png";
import logo from "../image/Vector.svg";
import icon1 from "../image/icon3.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import { Bars } from "react-loader-spinner";
import {Button} from '@nextui-org/react';
import confetti from 'canvas-confetti';
import {
  stakecontract,
  stake_abi,
}from "./contract.js";
import {
  useTokenBalance,
  useContract,
  useAddress,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UsdtContract, usdt_abi } from "./usdt.js";

const Registration = () => {
  const navigate = useNavigate();
  const handleConfetti = () => {
    confetti({   });
  };

  const [stackPrice, setStackPrice] = useState("");
  const [mjcstackamount, setMjcStackAmount] = useState("");
  const [mjcStackDuration, setMjcStackDuration] = useState("");
  const [stackReferral, setStackReferral] = useState("");
  const [activeTab, setActiveTab] = useState("home");
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };
  
  //   const [referralCode, setReferralCode] = useState("");
  const [spending, setSpending] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [price, setPrice] = useState("");
  const handleReferralChange = (event) => {
    setReferralCode(event.target.value);
  };
  const handleSpendingChange = (event) => {
    setSpending(event.target.value);
  };

  const handleSelectOption = (event) => {
    setSelectedValue(event.target.value);
    //console.log(event.target.value , );
  };

  const handleStackPrice = (event) => {
    setStackPrice(event.target.value);
  };

  const handleStackReferral = (event) => {
    setStackReferral(event.target.value);
  };

  const handleMjcStackAmount = (event) => {
    setMjcStackAmount(event.target.value);
  };

  const handleMjcStackDuration = (event) => {
    setMjcStackDuration(event.target.value);
  };

  useEffect(() => {
    const fetchedData = async () => {
      try {
        const response = await axios.get(
          "https://api.dex-trade.com/v1/public/ticker?pair=MJCTUSDT"
        );
        setPrice(response.data.data.last);
      } catch (err) {
        console.log(err);
      }
    };
    fetchedData();
  }, []);

  const result2 = (selectedValue / price).toFixed(0);
  const mjcstackamountValue = (mjcstackamount / price).toFixed(0);
  const newValue = (result2 * 0.15).toFixed(0);
  // const newValue = 5000
  //console.log(newValue, "this is our new value");
  const onFormSubmit = (event) => {
    event.preventDefault();
    // console.log("selectedValue", result);
  };
  const [response, setResponse] = useState(null);
  const [userData, setUserData] = useState(null);
  const [USDTAmt, setUSDTAmt] = useState("");
  const [cunAmt, setCunAmt] = useState("");
  const [withdrawAmt, setWithdrawAmt] = useState("");
  const [approveAmt, setApproveAmt] = useState("");
  const [BuyTokenLoading, setBuyTokenLoading] = useState(false);
  const [directStakeJoiningLoading, setDirectStakeJoiningLoading] =
    useState(false);
  const [StakeLoading, setStakeLoading] = useState(false);
  const [SellTokensloading, setSellTokensLoading] = useState(false);
  const [WithdrawTokensloading, setWithdrawTokensLoading] = useState(false);
  const [ApproveTokensloading, setApproveTokensLoading] = useState(false);
  const referralLinkRef = useRef(null);
  const [referralCode, setReferralCode] = useState("");
  const [BTCprice, setBTCPrice] = useState("");
  const [BNBprice, setBNBPrice] = useState("");
  const [mainuser_id, setMainUserId] = useState();
  const isValidUSDTamount = Number(USDTAmt) >= 20 || USDTAmt == "";


  useEffect(() => {
    const fetchedbtcprice = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
        );

        if (!response.ok) {
          throw new Error("Response is not ok");
        }
        const result = await response.json();
        setBTCPrice(result.bitcoin.usd);
      } catch (error) {
        console.log(error);
      }
    };
    fetchedbtcprice();
  }, []);

  useEffect(() => {
    const fetchedbnbprice = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd"
        );

        if (!response.ok) {
          throw new Error("Response is not ok");
        }
        const result = await response.json();
        setBNBPrice(result.binancecoin.usd);
      } catch (error) {
        console.log(error);
      }
    };
    fetchedbnbprice();
  }, []);

  var storedData = localStorage.getItem("userID");
  var userDataID = JSON.parse(storedData);
  //console.log(userDataID , " this is  user_id");
  let address = useAddress();

  const getMainUserId = async (address) => {
    try {
      let dumy = await fetch("http://localhost:3200/v1/allDetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address: address }),
      });
      let response = await dumy.json();
      //console.log(response.data.user_id, "this is my main id");
      // localStorage.setItem("userData", JSON.stringify(response?.data));
      setMainUserId(response.data?.user_id);
    } catch (error) {
      console.log(error);
    }
  };
 
 
 
  //read functions
  const { contract } = useContract(
    "0x5E19d78968baD32Fd9DA4B8ea55716068b1EC82a"
  );
  const { data: cunWalletBal, isLoading: isCunWalletBalLoading } =
    useTokenBalance(contract, address);
  const { contract: USDTContract } = useContract(
    "0x0ECBBF0D46E13cC4fffdf14AbC39D8332c89Ad8b"
  );
  const { data: walletBal, isLoading: walletBalLoading } = useTokenBalance(
    USDTContract,
    address
  );

  const { data: parent, isLoading: isParentLoading } = useContractRead(
    contract,
    "getParent",
    [address]
  );

  const { data: tierState, isLoading: isStateLoading } = useContractRead(
    contract,
    "tierState",
    [ethers.utils.parseEther("50")]
  );

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.forEach((value, key) => {
      setReferralCode(`${value}`);
    });
  }, []);

  //approve tokens
  const { mutateAsync: approve, isLoading: isApproveLoading } =
    useContractWrite(USDTContract, "approve");

  const handleCopyReferralLink = () => {
    if (referralLinkRef.current) {
      referralLinkRef.current.select();
      document.execCommand("copy");
      window.getSelection().removeAllRanges();

      // Use react-toastify to display a toaster notification
      toast.success("Referral link copied to clipboard!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
 
  const approveTokens = async () => {
    setBuyTokenLoading(true);
  try {
    let spender = "0x5E19d78968baD32Fd9DA4B8ea55716068b1EC82a"; //contract address
    let approveAmount = ethers.utils.parseEther(spending);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
     UsdtContract,
     usdt_abi,
     signer,
    );
    console.log(contract);
    const token = await contract.approve(spender, approveAmount.toString(), { gasLimit: 3000000});
    console.log(token);
   
      
        const receipt = await token.wait();
        console.log(receipt)
        console.log(receipt.status)
              if (receipt.status === 1) {
          toast.success("Successfully approved tokens!", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
        setBuyTokenLoading(false);
      } catch (error) {
        setBuyTokenLoading(false);
        toast.error("Failed", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }


  var storedData = localStorage.getItem('userData');
  // buyTokens
  const { mutateAsync: buyTokens, isLoading: isBuyTokensLoading } =
    useContractWrite(contract, "buyTokens");

  const { mutateAsync: DirectStakeJoining, isLoading: isJoiningLoading } =
    useContractWrite(contract, "DirectStakeJoining");

  const { mutateAsync: stakeTokens, isLoading: isStakeLoading } =
    useContractWrite(contract, "stakeTokens");

  const DirectStakeJoinings = async () => {
    setDirectStakeJoiningLoading(true);
    try {
      let ref;
      if (referralCode === "0x0000000000000000000000000000000000000000") {
        ref = referralCode;
      } else {
        ref = referralCode;
      }
      let usdtAmt = result2.toString();

      const data = await DirectStakeJoining({
        args: [stackReferral, usdtAmt],
      });
      setDirectStakeJoiningLoading(false);

      console.info("contract call successs", data);

      toast.success("Tokens Bought Successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (err) {
      toast.error("You can not buy more than $1000 in one transaction", {
        position: toast.POSITION.TOP_CENTER,
      });
      console.error("contract call failure", err);
    } finally {
      setUSDTAmt("");
      setDirectStakeJoiningLoading(false);
    }
  };

  const [userID, setUserId] = useState("");

  const getDetails = async (address) => {
    try {
      let dumy = await fetch("http://localhost:3200/v1/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address: address.toLowerCase() }),
      });
      let response = await dumy.json();
      localStorage.setItem("userID", JSON.stringify(response.data.user_id));
      localStorage.setItem("userData", JSON.stringify(response.data));

      setUserId(response.data.user_id);
      setUserData(response.data.data)
    } catch (error) {
     // console.log(error);
    }
}


  useEffect(() => {
    getDetails(address); 
  }, [address]);

  //console.log(userID);
  const postingSteckTokens = async (userID, newValue) => {
       setStakeLoading(true)
    try {
      let data = await fetch("http://localhost:3200/steck/post-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userID, tokensteck_amount: newValue }),
      });
      let response = await data.json();
      setStakeLoading(false)
      //console.log(response, "this is our response");
      toast.success("Tokens Staked Successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
      // setIsModalOpen(false);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      //console.log(error);
    }
  };

  
  const postingData = async () => {
    try {
      const response = await fetch("http://localhost:3200/v1/alldetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userID }),
      });
      const data = await response.json();
      //console.log(data, " this is posting  data");
      localStorage.setItem("userData", JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleBuyPlan = async () => {
    postingData()
    try {
      console.log("Inside try block")
      const response = await fetch("http://localhost:3200/v1/plan-buy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_wallet: address.toLowerCase(),
          parent_wallet_id: referralCode.toLowerCase(),
          buyed_plan:[{amount: selectedValue}],
          user_id: userID,
        }),
      });
      const data = await response.json();
      toast.success("Tokens Bought Successfully", {
        position: toast.POSITION.TOP_CENTER,
      });

      navigate('/dashboard');
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };



const rate = "100";

  const buyToken = async (handleBuyPlan, getDetails, getMainUserId) => {
    setBuyTokenLoading(true);
    try {
      let ref;
      if (parent === "0x0000000000000000000000000000000000000000") {
        ref = referralCode;
      } else {
        ref = referralCode;
      }
      let tierplan = ethers.utils.parseEther(selectedValue);
      let stakesamount = ethers.utils.parseEther(rate);
      
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
           stakecontract,
           stake_abi,
           signer,
          );
          console.log(contract);
          const token = await contract.buyTokens(ref, tierplan.toString(),stakesamount.toString(), { gasLimit: 3000000,value :ethers.utils.parseEther("0.0003") });
          console.log(token);
          const receipt = await token.wait();

        console.log(receipt)
         console.log(receipt.status)

           if (receipt.status === 1) {
            handleBuyPlan()  
            getDetails()
            handleConfetti() 
            getMainUserId(address);
            } 

            } catch (error) {
              toast.error("Failed", {
                position: toast.POSITION.TOP_CENTER,
              });
            }
         setBuyTokenLoading(false);
          
        

        } catch (err) {
          toast.error("You can not buy more than $1000 in one transaction", {
            position: toast.POSITION.TOP_CENTER,
          });
          console.error("contract call failure", err);
        } finally {
          setUSDTAmt("");
          setBuyTokenLoading(false);
        }
      };


  const stakeMjcTokens = async () => {
    setStakeLoading(true);
    getMainUserId(address);
    try {
      const data = await stakeTokens({
        args: [newValue, 365, 0],
      });
      //console.log(data)
      postingSteckTokens(userID, newValue);
     
    } catch (err) {
      setStakeLoading(false);
      toast.error("Something went wrong..Try again", {
        position: toast.POSITION.TOP_CENTER,
      });
      console.error("contract call failure", err);
    } finally {
      setUSDTAmt("");
    }
  };


  const handleUserWallet = async () => {
    try {
      let dumy = await fetch("http://localhost:3200/v1/allDetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: referralCode }),
      });
      let response = await dumy.json();
      if (!response) {
        // setLoading(true)
      } else {
        setReferralCode(response.data.wallet_address);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //sell Token
  const { mutateAsync: sellTokens, isLoading: isSellTokenLoading } =
    useContractWrite(contract, "sellTokens");

  const sellToken = async () => {
    try {
      setSellTokensLoading(true);
      let amount = ethers.utils.parseEther(cunAmt);
      const data = await sellTokens({ args: [amount] });
      console.info("contract call successs", data);
      toast.success("Tokens sold successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (err) {
      toast.error("Selling amount exceeds limit", {
        position: toast.POSITION.TOP_CENTER,
      });

      console.error("contract call failure", err);
    } finally {
      setCunAmt("");
      setSellTokensLoading(false);
    }
  };

  //withdraw Tokens
  const { mutateAsync: withdraw, isLoading: isWithdrawTokensLoading } =
    useContractWrite(contract, "withdraw");

  const withdrawToken = async () => {
    try {
      setWithdrawTokensLoading(true);
      let amount = ethers.utils.parseEther(withdrawAmt);
      const data = await withdraw({ args: [amount] });
      console.info("contract call successs", data);
      toast.success("Tokens Has Been Successfully Withdrawn", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (err) {
      toast.error("Tokens Withdraw Failed", {
        position: toast.POSITION.TOP_CENTER,
      });
      console.error("contract call failure", err);
    } finally {
      setWithdrawAmt("");
      setWithdrawTokensLoading(false);
    }
  };

  const postData = async (userId) => {
    // const userId = 27;
    const apiUrl = "http://localhost:3200/v1/alldetails";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userId }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setResponse(data.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    postData(userDataID);
  }, []);

  const numberOfElements = 12; // Change this to the desired number of elements

  const blueElements = Array.from({ length: numberOfElements }, (_, index) => (
    <div key={index} className="forsage_blue"></div>
  ));

  const [isModalOpen, setIsModalOpen] = useState(false);

  // console.log (result2,"amountsss");
  // console.log (selectedValue,"selected value is");

  const { data: lockDetails50, isLoading: isLockLoading1 } =
  useContractRead(contract, "getUnlockPlanDetails", [address, ethers.utils.parseEther("50")]);
  //console.log(lockDetails50)
  const { data: lockDetails100, isLoading: isLockLoading100 } =
  useContractRead(contract, "getUnlockPlanDetails", [address, ethers.utils.parseEther("100")]);
  //console.log(lockDetails100)

  const { data: lockDetails200, isLoading: isLockLoading200 } =
  useContractRead(contract, "getUnlockPlanDetails", [address, ethers.utils.parseEther("200")]);
  //console.log(lockDetails200)

  const { data: lockDetails500, isLoading: isLockLoading500 } =
  useContractRead(contract, "getUnlockPlanDetails", [address, ethers.utils.parseEther("500")]);
  //console.log(lockDetails500)

  const { data: lockDetails1000, isLoading: isLockLoading1000 } =
  useContractRead(contract, "getUnlockPlanDetails", [address, ethers.utils.parseEther("1000")]);
  //console.log(lockDetails1000)


 

  return (
    <div className="regi_main">
      {/* {isModalOpen && (
        <div className="popupmainbuy">
          <div class="modal-content">
            <div class="modal-header">
              <h3 className="text-center modal-content-section">
                Stake tokens to activate your current purchase plan
              </h3>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body text-center">

            {StakeLoading ? <button
               onClick={() => {
              stakeMjcTokens();
              getMainUserId(address);}} 
                type="button"
                class="btn btn-primary center mx-auto modal-button"
                data-dismiss="modal"
              >
               Loading...
              </button> 
                        :  <button
               onClick={() => {
              stakeMjcTokens();
              getMainUserId(address);}} 
                type="button"
                class="btn btn-primary center mx-auto modal-button"
                data-dismiss="modal"
              >
                Stake Tokens
              </button>
            
            
            }
           
            </div>
          </div>
        </div>
      )} */}
      <div style={{ zIndex: 99999999 }}>
        <ToastContainer />
      </div>

      {/* <img src={blueflase} className="bludeflasereg" alt="blueflase" /> */}
      <div className={`container ${isModalOpen ? "opacitylow" : ""}`}>
        <div className="main_top_logo">
          <div className="logos_landing">
            <span>
              <img src={logo} alt="logos" className="logolanding" />
            </span>
          </div>

          <div className="smart_chains">
            <div className="smart_chain_1">
              <span>
                <img
                  src={icon1}
                  alt="smart_chain"
                  className="smart_chain_icon"
                />
              </span>
              <p>Smart Chain</p>
            </div>

            <div className="connect_btn">
              <button>
                <Link to="/">Back </Link>
              </button>
            </div>
          </div>
        </div>
        {ApproveTokensloading && <Loading />}
        {BuyTokenLoading && <Loading />}
        {directStakeJoiningLoading && <Loading />}
        {StakeLoading && <Loading />}
        <div className="registion_from">
          <div className="row">
            <div className="col-lg-6">
              <div className="regis_left">
                <h2>
                  Registration On <br></br> MJC Platform
                </h2>

                <div className="input_upline">
                  <h5>Your Referral Address</h5>
                  <input
                    type="text"
                    className="you_pline_input"
                    value={referralCode}
                    onChange={handleReferralChange}
                  />
                  {/* <div className="wllet_condition">
                    <p>
                      <button onClick={() => handleTabClick("home")}>
                        <span className="check_icon">
                          <i
                            className={`fa fa-check ${
                              activeTab === "home" ? "activeTabText" : ""
                            }`}
                            aria-hidden="true"
                          ></i>
                        </span>
                        <span
                          className={`tabText ${
                            activeTab === "home" ? "activeTabText" : ""
                          }`}
                        >
                          Buy Tokens
                        </span>
                      </button>
                     
                    </p>
                    <p>
                      <button onClick={() => handleTabClick("menu1")}>
                        <span className="check_icon">
                          <i
                            className={`fa fa-check ${
                              activeTab === "menu1" ? "activeTabText" : ""
                            }`}
                            aria-hidden="true"
                          ></i>
                        </span>
                        <span
                          className={`tabText ${
                            activeTab === "menu1" ? "activeTabText" : ""
                          }`}
                        >
                          Direct Staking
                        </span>
                      </button>
                    </p>
                    <p>
                      <button onClick={() => handleTabClick("menu2")}>
                        <span className="check_icon">
                          <i
                            className={`fa fa-check ${
                              activeTab === "menu2" ? "activeTabText" : ""
                            }`}
                            aria-hidden="true"
                          ></i>
                        </span>
                        <span
                          className={`tabText ${
                            activeTab === "menu2" ? "activeTabText" : ""
                          }`}
                        >
                          MJC Stake Joining
                        </span>
                      </button>
                    </p>
                  </div> */}

                  <div className="chech_agin_btn">
                    <button onClick={() => handleUserWallet()}>
                      Fill Parent
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div
                className="regis_right"
                style={{
                  backgroundImage: `url(${plashtfiny})`,
                  backgroundSize: "cover",
                }}
              >
                <div className="top_section_reg">
                  <div className="spending">
                    <p>Enter spending</p>
                    <input
                      type="number"
                      className="buy_mjc_input"
                      value={spending}
                      onChange={handleSpendingChange}
                    />

                    <button onClick={approveTokens} className="buy_button_MJC">
                      Approve USDT to spend
                    </button>
                  </div>
                  <div className="tab-content">
                    <div
                      id="home"
                      className={`container tab-pane ${
                        activeTab === "home" ? "active" : "fade"
                      }`}
                    >
                      <div className="buy_token_card">
                        <h1>Buy USDT Plan</h1>

                        <form onSubmit={onFormSubmit}>
                          <div className="buy_mjc_one_input">
                            <p>Enter referrer wallet address</p>
                            <input
                              required
                              type="text"
                              className="buy_mjc_input"
                              value={referralCode}
                              onChange={handleReferralChange}
                            />
                          </div>
                          <div className="buy_mjc_one_input">
                            <p>Buy plan</p>
                            <select
                              id="Buy_plan_mjc"
                              name="Buy_plan_mjc"
                              value={selectedValue}
                              onChange={handleSelectOption}
                            >
                              <option required value="">
                                Select Your Plan
                              </option>
                              {/* <option value="0.1">0.1</option> */}

                              {lockDetails50 == true ? 
                                <option disabled value="50">50</option> :
                                <option value="50">50</option>
                               }

                               {lockDetails100 == true ? 
                                <option disabled value="100">100</option> :
                                <option value="100">100</option>
                               }
                               {lockDetails200 == true ? 
                                <option disabled value="200">200</option> :
                                <option  value="200">200</option>
                               }
                               {lockDetails500 == true ? 
                                <option disabled value="500">500</option> :
                                <option  value="500">500</option>
                               }
                               {lockDetails1000 == true ? 
                                <option disabled value="1000">1000</option> :
                                <option  value="1000">1000</option>
                               }
                            </select>
                          </div>
                          {/* <p>You must have {result2} MJC Tokens</p> */}
                          <Button
                            onClick={()=>{buyToken(handleBuyPlan, getDetails, getMainUserId)}}
                            type="submit"
                            className="buy_button_MJC"
                          >
                            {" "}
                            Purchase Plan
                          </Button>
                        </form>
                      </div>
                    </div>
                    <div
                      id="menu1"
                      className={`container tab-pane ${
                        activeTab === "menu1" ? "active" : "fade"
                      }`}
                    >
                      <div className="buy_token_card">
                        <h1>Direct Staking</h1>

                        <div className="buy_mjc_one_input">
                          <p>Enter referrer wallet address</p>
                          <input
                            onChange={handleStackReferral}
                            value={stackReferral}
                            type="text"
                            className="buy_mjc_input"
                          />
                        </div>

                        <div className="buy_mjc_one_input">
                          <p>Enter amount</p>
                          <input
                            onChange={handleStackPrice}
                            value={stackPrice}
                            type="text"
                            className="buy_mjc_input"
                          />
                        </div>

                        <button
                          onClick={DirectStakeJoinings}
                          type="submit"
                          className="buy_button_MJC"
                        >
                          {" "}
                          Direct Stake
                        </button>
                      </div>
                    </div>
                    <div
                      id="menu2"
                      className={`container tab-pane ${
                        activeTab === "menu2" ? "active" : "fade"
                      }`}
                    >
                      <div className="buy_token_card">
                        <h1>MJC Stake Joining</h1>

                        <div className="buy_mjc_one_input">
                          <p>Enter amount in $</p>
                          <input
                            value={mjcstackamount}
                            onChange={handleMjcStackAmount}
                            type="number"
                            className="buy_mjc_input"
                          />
                          <p>$ worth MJCT : {mjcstackamountValue}</p>
                        </div>

                        <div className="buy_mjc_one_input">
                          <p>Enter duration</p>
                          <select
                            value={mjcStackDuration}
                            onChange={handleMjcStackDuration}
                            id="Buy_plan_mjc"
                            name="Buy_plan_mjc"
                          >
                            <option>Select Duration</option>
                            <option value="90">90</option>
                            <option value="180">180</option>
                            <option value="360">360</option>
                          </select>
                        </div>

                        <button
                          onClick={stakeMjcTokens}
                          className="buy_button_MJC"
                        >
                          Stake tokens
                        </button>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
