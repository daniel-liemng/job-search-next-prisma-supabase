import { Card, CardContent } from '@/components/ui/card';

interface NumberCardProps {
  icon: React.ReactNode;
  text: string;
  number: number;
}

const NumberCard: React.FC<NumberCardProps> = ({ icon, text, number }) => {
  return (
    <Card className='w-[300px]'>
      <div className='flex items-center px-6 py-4'>
        {icon}
        <div className='flex-1 flex-col text-center'>
          <h1 className='text-4xl font-semibold'>{number}</h1>
          <h3 className='text-lg'>{text}</h3>
        </div>
      </div>
    </Card>
  );
};

export default NumberCard;
