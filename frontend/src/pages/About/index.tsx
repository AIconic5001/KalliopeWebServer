import { Box, Divider, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Img from "../../assets/images/demoPic.png";
import Team from "./Team/Team";

AboutPage.propTypes = {};

function AboutPage() {
  return (
    <div>
      <Stack spacing={2}>
        <Box sx={{ marginBottom: "100px" }}>
          <Typography variant="h1">About Us</Typography>
        </Box>
        <Box>
          <Grid container spacing={2}>
            <Grid size={8}>
              <Typography variant="h6">Our mission</Typography>
              <Typography variant="body1">
                Kalliope aims to revolutionize the academic research landscape
                by providing an intelligent, user-centric tool for literature
                discovery and application. Unlike existing tools, our
                application not only identifies relevant research but also
                generates concise synopses for each paper, empowering users to
                quickly grasp essential insights and make well-informed
                decisions.
              </Typography>
            </Grid>
            <Grid size={4}>
              <div>
                <img src={Img} alt="Picture here" />
              </div>
            </Grid>
          </Grid>
        </Box>
        <Divider />
        <Box>
          <Team />
        </Box>
        <Divider />
      </Stack>
    </div>
  );
}

export default AboutPage;
