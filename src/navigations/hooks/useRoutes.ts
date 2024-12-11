import LengthConverter from "@app/features/LengthUnitConverter/screens/LengthConverter";
import { Route } from "../types/Route.type";

const useRoutes = (): Route[] => {
  const routes: Route[] = [
    {
      name: "lengthConverter",
      component: LengthConverter,
      options: {
        headerShown: false,
      },
    },
  ];

  return routes;
};

export default useRoutes;
