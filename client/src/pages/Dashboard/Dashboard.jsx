import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { getProperty } from '../../utils/api'; // Assuming this function is used to get a specific property
import { useAuth0 } from "@auth0/auth0-react";

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth0();
  const [business, setBusiness] = useState(null);

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        if (isAuthenticated && user) {
          const businessData = await getProperty(user.sub); // Assuming user.sub is the unique user ID to fetch their business
          setBusiness(businessData);
        }
      } catch (error) {
        console.error("Failed to fetch business data:", error);
      }
    };

    fetchBusiness();
  }, [isAuthenticated, user]);

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        {business ? (
          <>
            <img src={business.photos[0]} alt="Business Logo" className="business-logo" />
            <h2>{business.title}</h2>
            <p>{user.email}</p>
          </>
        ) : (
          <p>Loading business details...</p>
        )}
      </div>
      <div className="content">
        MtaaMall
      </div>
    </div>
  );
}

export default Dashboard;
