
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const LoginButton = () => {
  return (
    <Button asChild variant="outline" className="border-white text-white hover:bg-white/10 rounded-none">
      <Link to="/login">
        Sign In
      </Link>
    </Button>
  );
};

export default LoginButton;
