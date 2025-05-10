import { useEffect, useRef } from 'react';
import { TimelineData } from '../../types';
import { format, parseISO } from 'date-fns';
import { motion } from 'framer-motion';
import * as d3 from 'd3';

interface AreaChartProps {
  data: TimelineData[];
}

const AreaChart = ({ data }: AreaChartProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    if (!svgRef.current || !data.length) return;
    
    const svg = d3.select(svgRef.current);
    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    // Clear any previous chart
    svg.selectAll('*').remove();
    
    const x = d3.scaleTime()
      .domain(d3.extent(data, d => parseISO(d.date)) as [Date, Date])
      .range([0, innerWidth]);
    
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.applied) as number])
      .nice()
      .range([innerHeight, 0]);
    
    const appliedLine = d3.line<TimelineData>()
      .x(d => x(parseISO(d.date)))
      .y(d => y(d.applied))
      .curve(d3.curveCatmullRom);
    
    const interviewedLine = d3.line<TimelineData>()
      .x(d => x(parseISO(d.date)))
      .y(d => y(d.interviewed))
      .curve(d3.curveCatmullRom);
    
    const offeredLine = d3.line<TimelineData>()
      .x(d => x(parseISO(d.date)))
      .y(d => y(d.offered))
      .curve(d3.curveCatmullRom);
    
    const hiredLine = d3.line<TimelineData>()
      .x(d => x(parseISO(d.date)))
      .y(d => y(d.hired))
      .curve(d3.curveCatmullRom);
    
    const appliedArea = d3.area<TimelineData>()
      .x(d => x(parseISO(d.date)))
      .y0(innerHeight)
      .y1(d => y(d.applied))
      .curve(d3.curveCatmullRom);
    
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    
    // Add the x-axis
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x).ticks(5).tickFormat(d => format(d as Date, 'MMM d')))
      .call(g => g.select('.domain').attr('stroke', '#cbd5e1'))
      .call(g => g.selectAll('.tick line').attr('stroke', '#e2e8f0'))
      .call(g => g.selectAll('.tick text').attr('fill', '#64748b').attr('font-size', '10px'));
    
    // Add the y-axis
    g.append('g')
      .call(d3.axisLeft(y).ticks(5))
      .call(g => g.select('.domain').attr('stroke', '#cbd5e1'))
      .call(g => g.selectAll('.tick line').attr('stroke', '#e2e8f0'))
      .call(g => g.selectAll('.tick text').attr('fill', '#64748b').attr('font-size', '10px'));
    
    // Add a gray grid
    g.append('g')
      .attr('class', 'grid')
      .selectAll('line')
      .data(y.ticks(5))
      .enter()
      .append('line')
      .attr('x1', 0)
      .attr('x2', innerWidth)
      .attr('y1', d => y(d))
      .attr('y2', d => y(d))
      .attr('stroke', '#e2e8f0')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '3,3');
    
    // Add the applied area
    g.append('path')
      .datum(data)
      .attr('fill', 'url(#appliedGradient)')
      .attr('d', appliedArea);
    
    // Define the gradient
    const gradient = svg.append('defs')
      .append('linearGradient')
      .attr('id', 'appliedGradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');
    
    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#3b82f6')
      .attr('stop-opacity', 0.7);
    
    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#3b82f6')
      .attr('stop-opacity', 0);
    
    // Add the lines
    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#3b82f6')
      .attr('stroke-width', 2)
      .attr('d', appliedLine);
    
    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#8b5cf6')
      .attr('stroke-width', 2)
      .attr('d', interviewedLine);
    
    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#f59e0b')
      .attr('stroke-width', 2)
      .attr('d', offeredLine);
    
    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#10b981')
      .attr('stroke-width', 2)
      .attr('d', hiredLine);
    
    // Add circles at each data point
    data.forEach(d => {
      g.append('circle')
        .attr('cx', x(parseISO(d.date)))
        .attr('cy', y(d.applied))
        .attr('r', 4)
        .attr('fill', '#3b82f6');
      
      g.append('circle')
        .attr('cx', x(parseISO(d.date)))
        .attr('cy', y(d.interviewed))
        .attr('r', 4)
        .attr('fill', '#8b5cf6');
      
      g.append('circle')
        .attr('cx', x(parseISO(d.date)))
        .attr('cy', y(d.offered))
        .attr('r', 4)
        .attr('fill', '#f59e0b');
      
      g.append('circle')
        .attr('cx', x(parseISO(d.date)))
        .attr('cy', y(d.hired))
        .attr('r', 4)
        .attr('fill', '#10b981');
    });
    
    // Add a legend
    const legend = g.append('g')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 10)
      .attr('text-anchor', 'start')
      .selectAll('g')
      .data(['Applied', 'Interviewed', 'Offered', 'Hired'])
      .enter().append('g')
      .attr('transform', (d, i) => `translate(${i * 80}, -10)`);
    
    legend.append('rect')
      .attr('x', 0)
      .attr('width', 12)
      .attr('height', 12)
      .attr('fill', (d, i) => ['#3b82f6', '#8b5cf6', '#f59e0b', '#10b981'][i]);
    
    legend.append('text')
      .attr('x', 16)
      .attr('y', 6)
      .attr('dy', '0.35em')
      .text(d => d)
      .attr('fill', '#64748b');
    
  }, [data]);
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-full"
    >
      <svg ref={svgRef} width="100%" height="100%" />
    </motion.div>
  );
};

export default AreaChart;