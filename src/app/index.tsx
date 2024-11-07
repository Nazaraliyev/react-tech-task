import Router from "@/routes";
import { useMe } from "@/utils/hooks";

const App = () => {
  // Hooks
  useMe();

  return <Router />;
};

export default App
