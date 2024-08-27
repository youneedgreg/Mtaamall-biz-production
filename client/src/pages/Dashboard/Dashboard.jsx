import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './Dashboard.css';
import useProperties from "../../hooks/useProperties";

const Dashboard = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { data: businesses, isError, isLoading: isBusinessLoading } = useProperties();
  const userEmail = isAuthenticated && user?.email;

  const userBusinesses = businesses?.filter(business => business.userEmail === userEmail) || [];

  if (isError) {
    return <div>Error fetching business data</div>;
  }

  if (isLoading || isBusinessLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Dashboard</h2>
        <p>Total Businesses: {businesses.length}</p>
        {isAuthenticated && (
          <>
            <p><strong>User Email:</strong> {userEmail}</p>
            <h3>Your Businesses:</h3>
            <ul>
              {userBusinesses.map(business => (
                <li key={business.id}>
                  <strong>Email:</strong> {business.userEmail} <br />
                  <strong>Title:</strong> {business.title}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      <div className="content">
        {/* Content area */}
        MtaaMall
      </div>
    </div>
  );
};

export default Dashboard;
