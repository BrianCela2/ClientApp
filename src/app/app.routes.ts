import { RouterModule, Routes } from "@angular/router";
import { CreateRoomComponent } from "./rooms/create-room/create-room.component";
import { NgModule } from "@angular/core";
import { EditRoomComponent } from "./rooms/edit-room/edit-room.component";
import { RoomDetailsComponent } from "./rooms/room-details/room-details.component";
import { DashboardComponent } from './dashboard/dashboard.component';



export const routes: Routes = [
    { path: 'Room', component: CreateRoomComponent, title: 'Room Create' },
    { path: 'Room/Edit/:id', component: EditRoomComponent, title: 'Room Edit' },
    { path: 'Room/Get/:id', component: RoomDetailsComponent, title: 'Room Details' },
    { path: 'dashboard', component: DashboardComponent }
]
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}

