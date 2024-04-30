import React from 'react';
import { Grid, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import ListUsers from './components/ListUsers';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';



const Dashboard = () => {
  const navigate = useNavigate(); // Get the navigate function from react-router-dom

  useEffect(() => {
    // Retrieve user data from localStorage
    const userDataString = localStorage.getItem('user');
    

    if (userDataString) {
        try {
            // Parse the user data from JSON string to JavaScript object
            const userData = JSON.parse(userDataString);
            

            // Access user role directly from the userData object
            const userRole = userData.roles && userData.roles.length > 0 ? userData.roles[0] : null;
            

            // Redirect user based on role
            if (userRole === 'ROLE_ADMIN') {
                navigate('/dashboard'); // Redirect to admin page if user is admin
            } else {
                navigate('/auth/404'); // Redirect to user page for other roles
            }
        } catch (error) {
            console.error('Error parsing user data:', error);
            navigate('/auth/login'); // Redirect to login page if parsing error occurs
        }
    } else {
        // Handle case when user data is not available
        navigate('/auth/login');
    }
}, [navigate]);
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
      <Grid item xs={12} lg={8}>
            <ListUsers />
          </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
