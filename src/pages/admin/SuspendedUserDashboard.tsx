
import UserMessages from '@/components/admin/UserMessages';

const SuspendedUserDashboard = () => {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Account Suspended</h1>
        <p className="text-muted-foreground">
          Your account has been suspended. Please contact an administrator using
          the messaging system below.
        </p>
      </div>

      <UserMessages />
    </div>
  );
};

export default SuspendedUserDashboard;
