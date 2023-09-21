import { APP_ROUTES } from "@/constants/app-routes";

export function checkIsPublicRoute(path: string){
  const appPublicRoutes = Object.values(APP_ROUTES.public)
  const isPrivateRoute = appPublicRoutes.includes(path)
  return isPrivateRoute
}
