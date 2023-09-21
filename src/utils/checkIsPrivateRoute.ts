import { APP_ROUTES } from "@/constants/app-routes";

export function checkIsPrivateRoute(pathName: string){
  const appPrivateRoutes = Object.values(APP_ROUTES.private)
  const isPrivateRoute = appPrivateRoutes.includes(pathName)
  return isPrivateRoute
}
