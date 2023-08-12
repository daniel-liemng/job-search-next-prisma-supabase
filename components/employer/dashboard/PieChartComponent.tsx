import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

interface PieChartComponentProps {
  activeJobs: number;
  inactiveJobs: number;
}

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartComponent: React.FC<PieChartComponentProps> = ({
  activeJobs,
  inactiveJobs,
}) => {
  const data = {
    labels: ['Active', 'Inactive'],
    datasets: [
      {
        label: 'Jobs',
        data: [activeJobs, inactiveJobs],
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(153, 102, 255, 1)'],
        borderWidth: 1,
      },
    ],
  };
  return <Pie data={data} />;
};

export default PieChartComponent;
