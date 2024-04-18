import { Routes } from '@angular/router';
import { LoginComponent } from './components/forms/login/login.component';
import { SignupComponent } from './components/forms/signup/signup.component';
import { DashboardComponent } from './components/tables/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { EditUserComponent } from './components/forms/edit-user/edit-user.component';
import { CreateRoomComponent } from './rooms/create-room/create-room.component';
import { EditRoomComponent } from './rooms/edit-room/edit-room.component';
import { RoomDetailsComponent } from './rooms/room-details/room-details.component';
import { RoomListComponent } from './rooms/room-list/room-list.component';
import { SendNotificationsComponent } from './notifications/send-notifications/send-notifications.component';
import { UserRolesComponent } from './components/tables/user-roles/user-roles.component';
import { ReservateComponent } from './components/reservate/reservate.component';
import { ReservationsComponent } from './components/tables/reservations/reservations.component';
import { EditReservationComponent } from './components/forms/edit-reservation/edit-reservation.component';

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
  { path: 'userRoles', component: UserRolesComponent },
  { path: 'steps', component: ReservateComponent },
  { path: 'Room', component: CreateRoomComponent, title: 'Room Create' },
  { path: 'Room/Edit/:id', component: EditRoomComponent, title: 'Room Edit' },
  {
    path: 'Room/Get/:id',
    component: RoomDetailsComponent,
    title: 'Room Details',
  },
  { path: 'Room/GetAll', component: RoomListComponent, title: 'All Rooms' },
  {
    path: 'NotificationAllUsers',
    component: SendNotificationsComponent,
    title: 'Notification',
    canActivate: [AuthGuard]
  },
  { path: 'Reservations', component: ReservationsComponent, title: 'Reservations',canActivate: [AuthGuard]},
  { path: 'Reservations/Edit/:id', component: EditReservationComponent, title: 'Reservations Edit',canActivate: [AuthGuard]}


];
