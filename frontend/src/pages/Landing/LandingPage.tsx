import React from "react";
import PropTypes from "prop-types";
import HeroSection from "./HeroSection";
import { Divider } from "@mui/material";
import FeatureSection from "./Features";
import UploadFeature from "./UploadFeature";
import PromptingFeat from "./PromptingFeat";
import "./styles.scss";
LandingPage.propTypes = {};

function LandingPage() {
  return (
    <div className="landing-container">
      <HeroSection />
      <Divider />
      <FeatureSection />
      <Divider />
      <UploadFeature />
      <Divider />
      <PromptingFeat />
    </div>
  );
}

export default LandingPage;
