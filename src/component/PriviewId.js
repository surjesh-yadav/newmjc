import React, { useEffect, useState } from 'react';
import img1 from '../image/Vector.svg';
import { ConnectWallet } from '@thirdweb-dev/react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const PriviewId = () => {
  const [previewID, setPreviewID] = useState("");
  const [userData, setUserData] = useState(null);

  const handleChange = (event) => {
    setPreviewID(event.target.value);
  };
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3200/v1/alldetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: previewID }),
      });
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleSearch = () => {
    fetchData();
    
  };

  console.log(userData);
  const handleConnectWallet = () => {

    navigate('/dashboard');
  };


  const toggleDropdown2 = () => {
    const menuDropdown = document.querySelector('.sid_menus_all');
    menuDropdown.style.display = menuDropdown.style.display === 'none' ? 'block' : 'none';


    const menuDropdown2 = document.querySelector('.pre_Id');
    menuDropdown2.style.display = menuDropdown2.style.display === 'none' ? 'block' : 'none';

};

  return (
    <div className='container'>
      <div className='pre_Id'>
        <div className="pri_id_cnct_btn">
          <div className='pri_id_img'>
            <img src={img1} alt='logo' className='logoimg_priview' />
            <p>Preview ID</p>
            <div className='input_btn'>
              <input value={previewID} type='number' onChange={handleChange} className='input_NUmber' />
              <button type='button' onClick={handleSearch}>Search</button>
            </div>
          </div>
          {/* <div className='connect_btn'>
            <ConnectWallet onConnect={handleConnectWallet} />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default PriviewId;
