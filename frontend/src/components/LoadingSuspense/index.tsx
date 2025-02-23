import './styles.scss';

export default function LoadingSuspense() {
  return (
    <div className='suspense-container'>
      <div className='atom-spinner'>
        <div className='spinner-inner'>
          <div className='spinner-line'></div>
          <div className='spinner-line'></div>
          <div className='spinner-line'></div>
          <div className='spinner-circle'>&#9679;</div>
        </div>
      </div>
      <div className='wave-container'>
        <h1 className='wave-text'>
          <span>P</span>
          <span>r</span>
          <span>o</span>
          <span>c</span>
          <span>e</span>
          <span>s</span>
          <span>s</span>
          <span>i</span>
          <span>n</span>
          <span>g</span>
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </h1>
      </div>
    </div>
  );
}
