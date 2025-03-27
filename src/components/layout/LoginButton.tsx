
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const LoginButton = () => {
  return (
    <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10">
      <Link to="/login">
        Sign In
      </Link>
    </Button>
  );
};

export default LoginButton;
