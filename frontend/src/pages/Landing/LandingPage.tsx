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
      <Test />
    </div>
  );
}

export default LandingPage;

function Test() {
  return (
    <div
      style={{
        color: 'white',
        fontSize: '2rem',
        textAlign: 'center',
        padding: '2rem',
        background: 'black'
      }}
    >
      Test
    </div>
  );
}
