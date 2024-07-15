import React from 'react';
import DashboardLayout from '../../Components/DashboardLayout';
import { Typography } from '@mui/material';

const Dashboard: React.FC = () => {
  return (
    <DashboardLayout>
      <Typography variant="h6">Welcome to the Dashboard</Typography>
      {/* Add dashboard content here */}
    </DashboardLayout>
  );
};

export default Dashboard;