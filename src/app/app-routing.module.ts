import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ProjectsComponent } from './projects/projects.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CreateProjectComponent } from './projects/create-project/create-project.component';
import { CharactersComponent } from './projects/characters/characters.component';
import { SettingsComponent } from './settings/settings.component';
import { AuthGuard } from './guards/auth.guard';
import { ArchiveComponent } from './archive/archive.component';
import { ProjectOverviewComponent } from './projects/project-overview/project-overview.component';
import { PlacesComponent } from './projects/places/places.component';
import { ObjectsComponent } from './projects/objects/objects.component';
import { GroupsComponent } from './projects/groups/groups.component';
import { EventsComponent } from './projects/events/events.component';
import { CreateCharacterComponent } from './projects/characters/create-character/create-character.component';
import { CreateGroupComponent } from './projects/groups/create-group/create-group.component';
import { CreateObjectComponent } from './projects/objects/create-object/create-object.component';
import { CreatePlaceComponent } from './projects/places/create-place/create-place.component';
import { CharacterComponent } from './projects/characters/character/character.component';
import { PlaceComponent } from './projects/places/place/place.component';
import { ObjectComponent } from './projects/objects/object/object.component';
import { GroupComponent } from './projects/groups/group/group.component';
import { TimelineComponent } from './projects/timeline/timeline.component';
import { CreateEventComponent } from './projects/timeline/create-event/create-event.component';
import { EventComponent } from './projects/timeline/event/event.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    component: ResetPasswordComponent,
    path: 'reset'
  },
  {
    component: ProjectsComponent,
    path: 'projects',
    canActivate: [AuthGuard]
  },
  {
    component: CreateProjectComponent,
    path: 'projects/create',
    canActivate: [AuthGuard]
  },
  {
    component: ArchiveComponent,
    path: 'archive',
    canActivate: [AuthGuard]
  },
  {
    component: SettingsComponent,
    path: 'settings',
    canActivate: [AuthGuard]
  },
  {
    component: ProjectOverviewComponent,
    path: 'project/:id',
    canActivate: [AuthGuard]
  },
  {
    component: EventsComponent,
    path: 'project/:id/events',
    canActivate: [AuthGuard]
  },
  {
    component: TimelineComponent,
    path: 'project/:id/timeline',
    canActivate: [AuthGuard]
  },
  {
    component: CreateEventComponent,
    path: 'project/:id/timeline/create',
    canActivate: [AuthGuard]
  },
  {
    component: EventComponent,
    path: 'project/:projectId/timeline/:eventId',
    canActivate: [AuthGuard]
  },
  {
    component: CharactersComponent,
    path: 'project/:id/characters',
    canActivate: [AuthGuard]
  },
  {
    component: CreateCharacterComponent,
    path: 'project/:id/characters/create',
    canActivate: [AuthGuard]
  },
  {
    component: CharacterComponent,
    path: 'project/:projectId/characters/:characterId',
    canActivate: [AuthGuard]
  },
  {
    component: PlacesComponent,
    path: 'project/:id/places',
    canActivate: [AuthGuard]
  },
  {
    component: CreatePlaceComponent,
    path: 'project/:id/places/create',
    canActivate: [AuthGuard]
  },
  {
    component: PlaceComponent,
    path: 'project/:projectId/places/:placeId',
    canActivate: [AuthGuard]
  },
  {
    component: ObjectsComponent,
    path: 'project/:id/objects',
    canActivate: [AuthGuard]
  },
  {
    component: CreateObjectComponent,
    path: 'project/:id/objects/create',
    canActivate: [AuthGuard]
  },
  {
    component: ObjectComponent,
    path: 'project/:projectId/objects/:objectId',
    canActivate: [AuthGuard]
  },
  {
    component: GroupsComponent,
    path: 'project/:id/groups',
    canActivate: [AuthGuard]
  },
  {
    component: CreateGroupComponent,
    path: 'project/:id/groups/create',
    canActivate: [AuthGuard]
  },
  {
    component: GroupComponent,
    path: 'project/:projectId/groups/:groupId',
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
