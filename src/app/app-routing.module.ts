import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SectionAComponent } from './section-a/section-a.component';
import { SectionBComponent } from './section-b/section-b.component';
import { SectionCFormFComponent } from './section-cform-f/section-cform-f.component';
import { SectionDformFComponent } from './section-dform-f/section-dform-f.component';

const routes: Routes = [
  {path:"", redirectTo:"/home", pathMatch:"full"},
  {path:"home", component: HomeComponent},
  {path:"sectionA", component: SectionAComponent},
  {path:"sectionB", component:SectionBComponent},
  {path:'sectionC', component:SectionCFormFComponent},
  {path:'sectionD', component:SectionDformFComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
