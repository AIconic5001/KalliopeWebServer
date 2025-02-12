import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import "./styles.scss";
import { Link } from "react-router-dom";
// import "../../../assets/images/HeroCover.png"
HeroSection.propTypes = {};

function HeroSection() {
  return (
    <div className="hero-container">
      <Box className="hero-content">
        <Grid container spacing={8}>
          <Grid container size={6} spacing={8}>
            <Grid size={12}>
              <Typography
                variant="h1"
                align="center"
                fontSize="120px"
                color={"var(--primary)"}
                fontWeight="bold"
              >
                {" "}
                Kalliope{" "}
              </Typography>
            </Grid>
            <Grid size={12}>
              <Typography align="center" variant="body1">
                This project aims to revolutionize the academic research
                landscape by providing an smart tool for literature discovery
                and application
              </Typography>
            </Grid>
          </Grid>
          <Grid size={12}>
            <Grid container spacing={3} size={6}>
              <Grid size={6} sx={{ textAlign: "center" }}>
                <a href="#upload">
                  <Button variant="contained" color="primary">
                    <Typography variant="button1">
                      Upload your research paper
                    </Typography>
                  </Button>
                </a>
              </Grid>
              <Grid size={6} sx={{ textAlign: "center" }}>
                <a href="#prompt">
                  <Button variant="contained" color="primary">
                    <Typography variant="button1">
                      Find your wanted paper
                    </Typography>
                  </Button>
                </a>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default HeroSection;
