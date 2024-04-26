import { Routes } from '@angular/router';
import { LoginComponent } from './components/forms/login/login.component';
import { SignupComponent } from './components/forms/signup/signup.component';
import { DashboardComponent } from './components/tables/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { EditUserComponent } from './components/forms/edit-user/edit-user.component';
import { CreateRoomComponent } from './components/forms/create-room/create-room.component';
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
import { UserHistoryComponent } from './components/tables/user-history/user-history.component';
import { ReservationDetailsComponent } from './components/pages/reservation-details/reservation-details.component';
import { AdminGuard } from './guards/admin.guard';
import { OpeartorGuard } from './guards/operator.guard';
import { RoomsComponent } from './components/pages/rooms/rooms.component';

export const routes: Routes = [
  { path: '', redirectTo: 'HomePage', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AdminGuard],
  },
  { path: 'userRoles', component: UserRolesComponent,canActivate: [AdminGuard], },
  { path: 'createReservation', component: ReservateComponent ,canActivate: [AuthGuard],},
  { path: 'Room', component: CreateRoomComponent, title: 'Room Create',canActivate: [AdminGuard], },
  { path: 'Room/Edit/:id', component: EditRoomComponent, title: 'Room Edit',canActivate: [AdminGuard], },
  {
    path: 'Room/Get/:id',
    component: RoomDetailsComponent,
    title: 'Room Details',
    canActivate: [OpeartorGuard],
  },
  { path: 'Room/GetAll', component: RoomListComponent, title: 'All Rooms',canActivate: [OpeartorGuard] },
  { path: 'Rooms', component: RoomsComponent, title: 'Rooms'},

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
    canActivate: [OpeartorGuard],
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
  {path: 'UsersHistory', component: UserHistoryComponent, title: 'Users History',canActivate: [AdminGuard],},
  {path:'Reservation/:id',component:ReservationDetailsComponent,title:'Reservation'},
  {path: 'UsersHistory', component: UserHistoryComponent, title: 'Users History',canActivate: [AdminGuard],}
];
