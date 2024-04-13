import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from './components/forms/login/login.component';
import { SignupComponent } from './components/forms/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';
import { EditUserComponent } from './components/forms/edit-user/edit-user.component';
import { CreateRoomComponent } from "./rooms/create-room/create-room.component";
import { EditRoomComponent } from "./rooms/edit-room/edit-room.component";
import { RoomDetailsComponent } from "./rooms/room-details/room-details.component";
import { RoomListComponent } from "./rooms/room-list/room-list.component";
import { SendNotificationsComponent } from "./notifications/send-notifications/send-notifications.component";
import { SearchRoomsComponent } from "./rooms/search-rooms/search-rooms.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from "@angular/core";



export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'updateUser', component: EditUserComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'Room', component: CreateRoomComponent, title: 'Room Create' },
  { path: 'Room/Edit/:id', component: EditRoomComponent, title: 'Room Edit' },
  { path: 'Room/Get/:id', component: RoomDetailsComponent, title: 'Room Details' },
  { path: 'Room/GetAll', component: RoomListComponent, title: 'All Rooms' },
  { path: 'NotificationAllUsers', component: SendNotificationsComponent, title: 'Notification' },
  { path: 'SearchRooms', component: SearchRoomsComponent, title: 'Search' },
  { path: 'dashboard', component: DashboardComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

