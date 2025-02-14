import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

Team.propTypes = {};

const teamMembers = [
  {
    name: "A",
    role: "Software Engineer",
    image: "https://via.placeholder.com/150",
    work: "short description about what they do here",
  },
  {
    name: "B",
    role: "Data Scientist",
    image: "https://via.placeholder.com/150",
    work: "short description about what they do here",
  },
  {
    name: "C",
    role: "Software Engineer",
    image: "https://via.placeholder.com/150",
    work: "short description about what they do here",
  },
  {
    name: "D",
    role: "AI Engineer",
    image: "https://via.placeholder.com/150",
    work: "short description about what they do here",
  },
];

function Team() {
  return (
    <Grid container spacing={2} mt={4} mb={4}>
      <Grid size={12}>
        <Typography variant="h2">Our Team</Typography>
      </Grid>
      {teamMembers.map((member) => (
        <Grid size={6} key={member.name}>
          <div>
            <img src={member.image} alt="Picture here" />
            <Typography variant="h4">{member.name}</Typography>
            <Typography variant="h6">{member.role}</Typography>
            <Typography variant="body1">{member.work}</Typography>
          </div>
        </Grid>
      ))}
    </Grid>
  );
}

export default Team;
