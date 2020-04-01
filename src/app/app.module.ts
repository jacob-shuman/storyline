import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './nav/nav.component';
import { ValidateService } from './services/validate/validate.service';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ProjectsComponent } from './projects/projects.component';
import { SectionComponent } from './home/section/section.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CreateProjectComponent } from './projects/create-project/create-project.component';
import { NoContentComponent } from './no-content/no-content.component';
import { SettingsComponent } from './settings/settings.component';
import { ProjectCardComponent } from './projects/project-card/project-card.component';
import { FooterComponent } from './footer/footer.component';
import { CharactersComponent } from './projects/characters/characters.component';
import { PlacesComponent } from './projects/places/places.component';
import { GroupsComponent } from './projects/groups/groups.component';
import { ObjectsComponent } from './projects/objects/objects.component';
import { EventsComponent } from './projects/events/events.component';
import { CreateCharacterComponent } from './projects/characters/create-character/create-character.component';
import { ProjectOverviewComponent } from './projects/project-overview/project-overview.component';
import { ArchiveComponent } from './archive/archive.component';
import { ArchiveCardComponent } from './archive/archive-card/archive-card.component';
import { CharacterCardComponent } from './projects/characters/character-card/character-card.component';
import { PlaceCardComponent } from './projects/places/place-card/place-card.component';
import { ObjectCardComponent } from './projects/objects/object-card/object-card.component';
import { GroupCardComponent } from './projects/groups/group-card/group-card.component';
import { CreateGroupComponent } from './projects/groups/create-group/create-group.component';
import { CreatePlaceComponent } from './projects/places/create-place/create-place.component';
import { CreateObjectComponent } from './projects/objects/create-object/create-object.component';
import { CharacterComponent } from './projects/characters/character/character.component';
import { ElementCardComponent } from './projects/element-card/element-card.component';
import { CardComponent } from './card/card.component';
import { CardSectionComponent } from './card/card-section/card-section.component';
import { CircleButtonComponent } from './circle-button/circle-button.component';
import { PlaceComponent } from './projects/places/place/place.component';
import { GroupComponent } from './projects/groups/group/group.component';
import { ObjectComponent } from './projects/objects/object/object.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,

    HomeComponent,
    SectionComponent,

    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,

    SettingsComponent,

    NotFoundComponent,
    NoContentComponent,

    ProjectsComponent,
    CreateProjectComponent,
    ProjectCardComponent,
    ProjectOverviewComponent,

    EventsComponent,

    CharactersComponent,
    CreateCharacterComponent,

    PlacesComponent,

    GroupsComponent,

    ObjectsComponent,

    ArchiveComponent,
    ArchiveCardComponent,
    CharacterCardComponent,
    PlaceCardComponent,
    ObjectCardComponent,
    GroupCardComponent,
    CreateGroupComponent,
    CreatePlaceComponent,
    CreateObjectComponent,

    CharacterComponent,

    ElementCardComponent,

    CardComponent,

    CardSectionComponent,

    CircleButtonComponent,

    PlaceComponent,

    GroupComponent,

    ObjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ValidateService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
