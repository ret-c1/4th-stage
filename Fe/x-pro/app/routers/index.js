import { staticRoutes } from './routers';
import { diffAmenu } from './difference';
import { diff } from './filterRouteTree';

// 静态
export const publicRoutes = staticRoutes;

// 菜单
export const refactorMenuTree = diffAmenu;
// 路由
export const refactorRouterTree = diff;
