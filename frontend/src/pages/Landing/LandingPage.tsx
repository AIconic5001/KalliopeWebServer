import { Divider } from '@mui/material';
import FeatureSection from './Features';
import HeroSection from './HeroSection';
import PromptingFeat from './PromptingFeat';
import './styles.scss';
import UploadFeature from './UploadFeature';
LandingPage.propTypes = {};

function LandingPage() {
  return (
    <div className='landing-container'>
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
