import * as React from 'react';

import { PieChart } from '@mui/x-charts/PieChart';

const data = [
  { label: 'Employee', value: 100 },
  { label: 'Client', value: 50 },
  { label: 'Project', value: 20 },
  { label: 'Department', value: 10 },
];

export default function AngleChart() {
  return (
    
      <PieChart
        series={[
          {
            paddingAngle: 8,
            innerRadius: 50,
            outerRadius: 80,
            data,
          },
        ]}
        
        width={500}
      height={300}
        legend={{ hidden: true }}
      />
   
  );
}
