
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const LoginButton = () => {
  return (
    <Button asChild variant="outline" className="border-amber-300 bg-amber-300 text-slate-900 hover:bg-amber-400 hover:border-amber-400 rounded-none font-medium">
      <Link to="/login">
        Sign In
      </Link>
    </Button>
  );
};

export default LoginButton;
