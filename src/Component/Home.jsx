import React from 'react';
import {Container, Typography, Paper, Grid } from '@mui/material';

const Home = () => {
  return (
    <div style={{ backgroundColor: '#f4f6f9', minHeight: '100vh' }}>
      {/* Main content section */}
      <Container maxWidth="lg" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
        <Paper style={{ padding: '40px', textAlign: 'center', backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
          <Typography variant="h3" style={{ fontWeight: '700', color: '#333' }}>
            Welcome to Our Home Page!
          </Typography>

          <Typography variant="body1" style={{ marginTop: '20px', fontSize: '1.1rem', color: '#555' }}>
            We're so glad you're here. Explore our website.
            We're here to help you achieve your goals !!
          </Typography>

          <Grid container spacing={2} justifyContent="center" style={{ marginTop: '30px' }}>
            <Grid item>
              
            </Grid>
            <Grid item>
              
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};

export default Home;
