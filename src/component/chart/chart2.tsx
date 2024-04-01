import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function BasicBars() {
  const xAxisData = ['Project', 'Department'];

  const seriesData = [
    { data: [20], color: '#2196F3' }, // Project
    { data: [10], color: '#4CAF50' }, // Department
  ];

  return (
    <BarChart
      xAxis={[{ scaleType: 'band', data: xAxisData }]}
      series={seriesData}
      width={400}
      height={300}
    />
  );
}
