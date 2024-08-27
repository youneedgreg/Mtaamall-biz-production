import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { FaHome, FaBuilding, FaUsers, FaBook, FaEnvelope, FaUser, FaHeadset } from 'react-icons/fa';
import './Dashboard.css';
import useProperties from "../../hooks/useProperties";

const Dashboard = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { data: businesses, isError, isLoading: isBusinessLoading } = useProperties();
  const userEmail = isAuthenticated && user?.email;

  // Find the first business associated with the authenticated user
  const userBusiness = businesses?.find(business => business.userEmail === userEmail);

  if (isError) {
    return <div>Error fetching business data</div>;
  }

  if (isLoading || isBusinessLoading) {
    return <div>Loading...</div>;
  }

  const firstImage = userBusiness?.images[0] || '';
  const businessTitle = userBusiness?.title || '';

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        {isAuthenticated && userBusiness && (
          <>
            <div className="business-profile">
              <div className="profile-image-wrapper">
                <img src={firstImage} alt="Business" className="profile-image" />
              </div>
              <p className="business-title">{businessTitle}</p>
              <p className="user-email">{userBusiness.userEmail}</p>
            </div>
          </>
        )}
        <ul className="sidebar-menu">
          <li className="menu-item">
            <FaHome className="menu-icon" />
            <span>Home</span>
          </li>
          <li className="menu-item">
            <FaBuilding className="menu-icon" />
            <span>Business</span>
          </li>
          <li className="menu-item">
            <FaUsers className="menu-icon" />
            <span>Users</span>
          </li>
          <li className="menu-item">
            <FaBook className="menu-icon" />
            <span>Bookings</span>
          </li>
          <li className="menu-item">
            <FaEnvelope className="menu-icon" />
            <span>Messages</span>
          </li>
          <li className="menu-item">
            <FaUser className="menu-icon" />
            <span>Profile</span>
          </li>
          <li className="menu-item">
            <FaHeadset className="menu-icon" />
            <span>Customer Support</span>
          </li>
        </ul>
      </div>
      <div className="content">
        {/* Content area */}
        MtaaMall
      </div>
    </div>
  );
};

export default Dashboard;
