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
import { UserReservationsComponent } from './components/tables/user-reservations/user-reservations.component';
import { HomepageComponent } from './components/homepage/homepage.component';

export const routes: Routes = [
  { path: '', redirectTo: 'HomePage', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'userRoles', component: UserRolesComponent,canActivate: [AuthGuard], },
  { path: 'createReservation', component: ReservateComponent ,canActivate: [AuthGuard],},
  { path: 'Room', component: CreateRoomComponent, title: 'Room Create',canActivate: [AuthGuard], },
  { path: 'Room/Edit/:id', component: EditRoomComponent, title: 'Room Edit',canActivate: [AuthGuard], },
  {
    path: 'Room/Get/:id',
    component: RoomDetailsComponent,
    title: 'Room Details',
    canActivate: [AuthGuard],
  },
  { path: 'Room/GetAll', component: RoomListComponent, title: 'All Rooms',canActivate: [AuthGuard], },
  {
    path: 'NotificationAllUsers',
    component: SendNotificationsComponent,
    title: 'Notification',
    canActivate: [AuthGuard],
  },
  {
    path: 'Reservations',
    component: ReservationsComponent,
    title: 'Reservations',
    canActivate: [AuthGuard],
  },
  {
    path: 'Reservations/Edit/:id',
    component: EditReservationComponent,
    title: 'Reservations Edit',
    canActivate: [AuthGuard],
  },
  {
    path: 'YourReservations',
    component: UserReservationsComponent,
    title: 'Reservations ',
    canActivate: [AuthGuard],
  },
  {
    path: 'HomePage',
    component: HomepageComponent,
    title: 'Homepage ',
  },
  {
    path: 'Profile',
    component: EditUserComponent,
    title: 'Profile ',
    canActivate: [AuthGuard],
  },
];
