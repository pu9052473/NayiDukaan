'use client'; // Ensure this component is a client component

import React from 'react';
import { AppBar, Drawer, Toolbar, List, ListItem, ListItemText, CssBaseline, Typography, Box } from '@mui/material';
import Link from 'next/link';

const drawerWidth = 240;

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1}}>
        <Toolbar sx={{display:'flex', justifyContent: "center"}}>
          <Typography sx={{fontSize: "30px"}} noWrap component="div">
            Seller Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: "150px",
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: "150px", boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto'}}>
          <List>
            {[
              { text: 'Dashboard', href: '/SellerDashboard' },
              { text: 'My Profile', href: '/SellerDashboard/MyProfile' },
              { text: 'Edit Profile', href: '/SellerDashboard/MyProfile/EditProfile' },
              { text: 'My Products', href: '/SellerDashboard/Products' },
              { text: 'Setting', href: '/SellerDashboard/Setting' },
            ].map((item) => (
              <Link href={item.href} key={item.text} passHref>
                <ListItem button
                  sx={{ 
                    '&:hover': {
                      backgroundColor: 'rgba(247, 214,105)', // Change this color as needed
                    }
                  }}
                >
                  <ListItemText primary={item.text} />
                </ListItem>
              </Link>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{ 
          flexGrow: 1, 
          bgcolor: 'background.default', 
          p: 3, 
          mt: '64px', // Adjust for the AppBar height
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;