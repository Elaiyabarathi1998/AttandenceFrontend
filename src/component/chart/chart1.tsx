import * as React from 'react';
import { PieChart } from '@mui/x-charts';

export default function Chart() {
  const data = [
    { id: 0, value: 100, label: 'Employee' },
    { id: 1, value: 50, label: 'Client' },
  ];

  return (
    <PieChart
      series={[
        {
          data: data,
        },
      ]}
      width={400}
      height={250}
    />
  );
}
