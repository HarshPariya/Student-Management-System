import React from 'react';
import { Container, Typography, Paper, Grid } from '@mui/material';
import './Home.css'; // Import CSS file

const Home = () => {
  return (
    <div className="home-container">
      <Container maxWidth="lg" className="home-content">
        <Paper className="home-paper">
          <Typography variant="h3" className="home-title">
            Welcome to Our Home Page!
          </Typography>

          <Typography variant="body1" className="home-text">
            We're so glad you're here. Explore our website.
            We're here to help you achieve your goals !!
          </Typography>

          <Grid container spacing={2} justifyContent="center" className="home-grid">
            <Grid item>{/* Add buttons or content here */}</Grid>
            <Grid item>{/* Add buttons or content here */}</Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};

export default Home;
