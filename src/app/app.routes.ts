import { RouterModule,Routes } from "@angular/router";
import { CreateRoomComponent } from "./rooms/create-room/create-room.component";
import { NgModule } from "@angular/core";
import { EditRoomComponent } from "./rooms/edit-room/edit-room.component";

export const routes:Routes = [
    { path:'Room', component: CreateRoomComponent, title: 'Room Create' },
    { path:'Room/Edit/:id',component:EditRoomComponent,title:'Room Edit'}
]
    @NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
    })
    export class AppRoutingModule{

}
