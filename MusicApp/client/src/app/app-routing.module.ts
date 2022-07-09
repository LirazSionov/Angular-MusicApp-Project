import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { AuthGuard } from './guards/auth.guard';
import { PreventUnsavedChangesGuardGuard } from './guards/prevent-unsaved-changes-guard.guard';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MemberEditComponent } from './member-edit/member-edit.component';
import { MessagesComponent } from './messages/messages.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    pathMatch:'full'
  },
  {
    path:'',
    canActivate:[AuthGuard],
    runGuardsAndResolvers:'always',
    children:[
     {
       path:'members',
       loadChildren:()=>import('./modules/members.module').then(m=>m.MembersModule)
     },
     {path:'lists',component:ListsComponent},
     {path:'messages',component:MessagesComponent},
     {path: 'member/edit', component:MemberEditComponent,canDeactivate:[PreventUnsavedChangesGuardGuard]}

    ]
  },
  {
    path:'errors',component:TestErrorsComponent
  },
  {
    path:'not-found', component:NotFoundComponent
  },
  {
    path:'server-error', component:ServerErrorComponent
  },
  {
    path:'**',
    pathMatch:'full',
    component:NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
