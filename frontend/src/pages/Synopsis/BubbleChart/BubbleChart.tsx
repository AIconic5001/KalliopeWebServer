import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { Button, Typography } from '@mui/material';

const BubbleChart = ({ data, width = 800, height = 600 }) => {
  const svgRef = useRef(null);
  const tooltipRef = useRef(null);
  const guideRef = useRef(null);
  const [mode, setMode] = useState('packed');

  useEffect(() => {
    if (!data || !data.length) return;

    // Clear any existing chart
    d3.select(svgRef.current).selectAll('*').remove();

    // Define chart dimensions and margins
    const margin = { top: 40, right: 20, bottom: 60, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create the SVG group with margins
    const svg = d3.select(svgRef.current).attr('width', width).attr('height', height);

    // Create a group element to contain the bubble chart
    const g = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Create the radius scale
    const rScale = d3
      .scaleSqrt()
      .domain([0, d3.max(data, (d) => d.count_of_ref)])
      .range([25, 50]);

    // Optional color scale
    const colorScale = d3
      .scaleThreshold()
      .domain([5, 10, 15, 20])
      .range(['#fee5d9', '#fcae91', '#fb6a4a', '#de2d26', '#a50f15']);

    // Create text labels for each bubble
    const labels = g
      .selectAll('text.label')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'label')
      .text((d) => d.year)
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .attr('pointer-events', 'none')
      .style('fill', '#000')
      .style('font-size', '12px')
      .raise();

    // Create circles for each data point
    const circles = g
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('r', (d) => rScale(d.count_of_ref))
      .attr('fill', (d) => colorScale(d.count_of_ref))
      .attr('opacity', 0.7);

    // Create tooltip
    const tooltip = d3.select(tooltipRef.current);

    // Add event listeners for tooltips
    circles
      .on('mouseover', (event, d) => {
        console.log('mouseover', d, event);
        tooltip
          .style('opacity', 1)
          .style('z-index', 100000)
          .html(`<strong>Year:</strong> ${d.year}<br/><strong>Count:</strong> ${d.count_of_ref}`)
          .style('left', event.pageX + 'px')
          .style('top', event.pageY + 'px');
      })
      .on('mousemove', (event) => {
        tooltip.style('left', event.layerX + 10 + 'px').style('top', event.layerY - 28 + 'px');
      })
      //   .on('mousemove', (event) => {
      //     tooltip.style('left', 1 + 'px').style('top', 0 + 'px');
      //   })
      .on('mouseout', () => {
        tooltip.style('opacity', 0);
      });

    // Define the center of the chart
    const centerX = innerWidth / 2;
    const centerY = innerHeight / 2;

    // Setup the simulation
    const simulation = d3
      .forceSimulation(data)
      .force('x', d3.forceX(centerX).strength(0.05))
      .force('y', d3.forceY(centerY).strength(0.05))
      .force(
        'collide',
        d3.forceCollide((d) => rScale(d.count_of_ref) + 1)
      )
      .on('tick', ticked);

    // Update positions on tick
    function ticked() {
      circles.attr('cx', (d) => d.x).attr('cy', (d) => d.y);
      labels.attr('x', (d) => d.x).attr('y', (d) => d.y);
    }

    // Setup drag behavior
    circles.call(
      d3
        .drag()
        .on('start', (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on('drag', (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on('end', (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        })
    );

    if (mode === 'ordered') {
      simulation.stop();
      g.selectAll('.bubble-size-legend').remove();
      g.selectAll('.year-label').remove();
      let yearDomain = d3.extent(data, (d) => d.year);
      let xScale = d3.scaleLinear().domain(yearDomain).range([0, innerWidth]);

      let yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.count_of_ref)])
        .range([innerHeight, 30]);
      g.selectAll('.x-axis').remove();
      g.selectAll('.y-axis').remove();
      let xAxis = d3.axisBottom(xScale).ticks(5).tickFormat(d3.format('.0f'));
      g.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0, ${innerHeight})`)
        .call(xAxis)
        .append('text')
        .attr('class', 'x-axis-label')
        .attr('transform', 'rotate(45)')
        .style('text-anchor', 'start');

      let yMin = d3.min(data, (d) => d.count_of_ref);

      let yMax = d3.max(data, (d) => d.count_of_ref);
      let tickCount = 8;
      let yAxis = d3.axisLeft(yScale).ticks(yMin, yMax, tickCount).tickFormat(d3.format('.0f'));
      g.append('g')
        .attr('class', 'y-axis')
        .call(yAxis)
        .append('text')
        .attr('class', 'y-axis-label')
        .attr('transform', 'rotate(-90)')
        .attr('x', -innerHeight / 2)
        .attr('y', -40)
        .style('text-anchor', 'end')
        .text('Count of References');
      circles
        .transition()
        .duration(600)
        .attr('cx', (d) => xScale(d.year))
        .attr('cy', (d) => yScale(d.count_of_ref))
        .attr('r', 10)
        .attr('fill', (d) => colorScale(d.count_of_ref))
        .attr('opacity', 0.7);
      labels.transition().duration(300).style('opacity', 0);
    } else if (mode === 'packed') {
      simulation.restart();
      g.selectAll('.x-axis').remove();
      g.selectAll('.y-axis').remove();
      g.selectAll('.bubble-size-legend').remove();
      g.selectAll('.year-label').remove();
      circles.transition().duration(300).attr('opacity', 0.7);
      labels.transition().duration(300).style('opacity', 1);
    }

    // Cleanup function
    return () => {
      simulation.stop();
    };
  }, [data, width, height, mode]);

  return (
    <div className='bubble-chart-container'>
      <svg ref={svgRef}></svg>
      <div ref={guideRef}>
        <Typography variant='body1' color='textSecondary'>
          You can try to drag and mouseover the bubbles for information
        </Typography>
        <Button variant='outlined' color='primary' onClick={() => setMode('ordered')}>
          Ordered
        </Button>
        <Button variant='outlined' color='primary' onClick={() => setMode('packed')}>
          Packed
        </Button>
      </div>
      <div
        ref={tooltipRef}
        style={{
          position: 'absolute',
          opacity: 0,
          backgroundColor: 'white',
          border: '1px solid #ddd',
          borderRadius: '4px',
          padding: '8px',
          pointerEvents: 'none',
          transition: 'opacity 0.15s',
          fontSize: '12px'
        }}
      ></div>
    </div>
  );
};

export default BubbleChart;
