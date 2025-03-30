
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

type ErrorStateProps = {
  title: string;
  message: string;
};

const ErrorState = ({ title, message }: ErrorStateProps) => {
  const navigate = useNavigate();

  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold mb-4 text-red-500">{title}</h2>
      <p className="mb-6">{message}</p>
      <Button onClick={() => navigate('/rooms')}>Back to Rooms</Button>
    </div>
  );
};

export default ErrorState;
