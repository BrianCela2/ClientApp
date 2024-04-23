import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from './components/forms/login/login.component';
import { SignupComponent } from './components/forms/signup/signup.component';
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
import { ProfileComponent } from './components/tables/profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from "@angular/core";
import { HotelServiceListComponent } from "./hotel-services/hotel-service-list/hotel-service-list.component";
import { HotelServiceDetailsComponent } from "./hotel-services/hotel-service-details/hotel-service-details.component";
import { HotelServiceCreateComponent } from "./hotel-services/hotel-service-create/hotel-service-create.component";
import { HotelServiceUpdateComponent } from "./hotel-services/hotel-service-update/hotel-service-update.component";



export const routes: Routes = [
  { path: '', redirectTo: 'HomePage', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'updateUser',
    component: EditUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'userRoles', component: UserRolesComponent },
  { path: 'createReservation', component: ReservateComponent },
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
    component: ProfileComponent,
    title: 'Profile ',
    canActivate: [AuthGuard],
  },
  { path: 'Reservations', component: ReservationsComponent, title: 'Reservations', canActivate: [AuthGuard] },
  { path: 'Reservations/Edit/:id', component: EditReservationComponent, title: 'Reservations Edit', canActivate: [AuthGuard] },

  { path: 'Dashboard', component: DashboardComponent },
  { path: 'HotelServices', component: HotelServiceListComponent },
  { path: 'HotelServices/Details/:id', component: HotelServiceDetailsComponent },
  { path: 'HotelServices/Create', component: HotelServiceCreateComponent },
  { path: 'HotelServices/Update/:id', component: HotelServiceUpdateComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

