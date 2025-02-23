import './styles.scss';

export default function LoadingSuspense() {
  return (
    <div className='suspense-container'>
      <div className='spin-container'>
        <div className='atom-spinner'>
          <div className='spinner-inner'>
            <div className='spinner-line'></div>
            <div className='spinner-line'></div>
            <div className='spinner-line'></div>
            <div className='spinner-circle'>&#9679;</div>
          </div>
        </div>
      </div>
    </div>
  );
}
