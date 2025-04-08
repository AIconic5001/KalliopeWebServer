import { useEffect, useState } from 'react';
import BubbleChart from '../BubbleChart/BubbleChart';
import './styles.scss';
import * as d3 from 'd3';
import { useGetCitationTimeline } from './handleTimelineApi';

function CitationTimeline() {
  const [data, setData] = useState([]);
  const groupDataByYear = (rawData) => {
    if (!rawData || rawData.length === 0) return [];

    // Use reduce to sum the count_of_ref for each year
    const grouped = rawData.reduce((acc, d) => {
      acc[d.year] = (acc[d.year] || 0) + d.count_of_ref;
      return acc;
    }, {});

    // Convert the grouped object into an array of objects
    return Object.keys(grouped).map((year) => ({
      year: +year, // Convert the key back to a number
      count_of_ref: grouped[year]
    }));
  };
  const res = useGetCitationTimeline(); // Custom hook to fetch citation timeline data
  useEffect(() => {
    if (res) {
      // Process the data to group by year and sum counts
      const processedData = groupDataByYear(res?.yearReferences);
      console.log(processedData);
      setData(processedData);
    }
    console.log(data);
  }, [res]);

  return (
    <div className='chart-container'>
      <h2>Year References Bubble Chart</h2>
      {data.length > 0 ? <BubbleChart data={data} width={500} height={400} /> : <div>No data available</div>}
    </div>
  );
}

export default CitationTimeline;
