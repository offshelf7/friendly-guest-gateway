
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const LoginButton = () => {
  const { t } = useLanguage();
  
  return (
    <Button 
      asChild 
      variant="outline" 
      className="border-2 border-amber-300 bg-amber-300 text-slate-900 hover:bg-amber-400 hover:border-amber-400 font-medium"
    >
      <Link to="/login">
        {t('nav.signIn')}
      </Link>
    </Button>
  );
};

export default LoginButton;
