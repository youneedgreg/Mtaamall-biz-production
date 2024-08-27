import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import useProperties from "../../hooks/useProperties";

const Dashboard = () => {
  const { data, isError, isLoading } = useProperties();
  const [businessCount, setBusinessCount] = useState(0);

  useEffect(() => {
    if (data) {
      setBusinessCount(data.length);
    }
  }, [data]);

  if (isError) {
    return <div>Error fetching business data</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Dashboard</h2>
        <p>Total Businesses: {businessCount}</p>
        {/* You can add more sidebar content here */}
      </div>
      <div className="content">
        {/* Content area */}
        MtaaMall
      </div>
    </div>
  );
}

export default Dashboard;
