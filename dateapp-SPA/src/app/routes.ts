import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/memberList/memberList.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guard/auth.guard';
import { MemberDetailComponent } from './members/memberDetail/memberDetail.component';
import { MemberDetailResolver } from './_resolver/member-detail.resolver';
import { MemberListResolver } from './_resolver/member-list.resolver';
import { MemberEditComponent } from './members/memberEdit/memberEdit.component';
import { MemberEditResolver } from './_resolver/member-edit.resolver';
import { PrevenetUnsavedChanges } from './_guard/PrevenetUnsavedChanges.guard';


export const appRoutes: Routes = [
    { path: '', component: HomeComponent},

    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'member', component: MemberListComponent, resolve: {users: MemberListResolver}},
            { path: 'member/:id', component: MemberDetailComponent, resolve: {user: MemberDetailResolver}},
            { path: 'memberEdit', component: MemberEditComponent,
            resolve: {user: MemberEditResolver}, canDeactivate: [PrevenetUnsavedChanges]},
            { path: 'messages', component: MessagesComponent},
            { path: 'lists', component: ListsComponent},
        ]
    },

    { path: '**', redirectTo: '', pathMatch: 'full'},
];
