import { ExtraOptions, RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

export const routes: Routes = [
  {
    path: "admin",
    loadChildren: () =>
      import("./rest-admin/rest-admin-module.module").then(
        (m) => m.RestAdminModuleModule
      ),
  },
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
  },
  { path: "", redirectTo: "admin", pathMatch: "full" },
  { path: "**", redirectTo: "admin" },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
