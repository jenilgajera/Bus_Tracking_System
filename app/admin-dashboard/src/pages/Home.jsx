import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Link
        to="/login"
        className="flex min-h-svh flex-col items-center justify-center"
      >
        <Button>Click Me</Button>
      </Link>
    </div>
  );
};

export default Home;
