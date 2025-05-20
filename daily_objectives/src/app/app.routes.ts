import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:"", loadComponent: () => import("./components/auth/login/login.component").then(m=>m.LoginComponent)},
    {path:"register", loadComponent: () => import("./components/auth/register/register.component").then(m=>m.RegisterComponent)},
    {path:"home", loadComponent: () => import("./components/calendar/calendar.component").then(m=>m.CalendarComponent)},
    {path:"objectives", loadComponent: () => import("./components/objectives/objectives-list/objectives-list.component").then(m=>m.ObjectivesListComponent)},
    {path:"objective", loadComponent: () => import("./components/objectives/objectives-detail/objectives-detail.component").then(m=>m.ObjectivesDetailComponent)},
    {path:"achievments", loadComponent: () => import("./components/achievments/achievments-list/achievments-list.component").then(m=>m.AchievmentsListComponent)},
    {path:"achievment", loadComponent: () => import("./components/achievments/achievments-detail/achievments-detail.component").then(m=>m.AchievmentsDetailComponent)},
];
