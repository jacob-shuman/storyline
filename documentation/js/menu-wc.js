'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">storyline documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-935af14959ea4b88cd63b94910ae4f87"' : 'data-target="#xs-components-links-module-AppModule-935af14959ea4b88cd63b94910ae4f87"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-935af14959ea4b88cd63b94910ae4f87"' :
                                            'id="xs-components-links-module-AppModule-935af14959ea4b88cd63b94910ae4f87"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ArchiveCardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ArchiveCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ArchiveComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ArchiveComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CardSectionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CardSectionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CharacterCardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CharacterCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CharacterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CharacterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CharactersComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CharactersComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CircleButtonComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CircleButtonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CreateCharacterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CreateCharacterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CreateEventComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CreateEventComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CreateGroupComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CreateGroupComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CreateObjectComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CreateObjectComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CreatePlaceComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CreatePlaceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CreateProjectComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CreateProjectComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ElementCardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ElementCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EventComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EventComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EventsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EventsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GroupCardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GroupCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GroupComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GroupComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GroupsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GroupsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NavComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NoContentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NoContentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NotFoundComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NotFoundComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ObjectCardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ObjectCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ObjectComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ObjectComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ObjectsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ObjectsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PlaceCardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PlaceCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PlaceComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PlaceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PlacesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PlacesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProjectCardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProjectCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProjectOverviewComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProjectOverviewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProjectsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProjectsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegisterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RegisterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResetPasswordComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ResetPasswordComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SectionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SectionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SettingsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SettingsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TimelineCardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TimelineCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TimelineComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TimelineComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-935af14959ea4b88cd63b94910ae4f87"' : 'data-target="#xs-injectables-links-module-AppModule-935af14959ea4b88cd63b94910ae4f87"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-935af14959ea4b88cd63b94910ae4f87"' :
                                        'id="xs-injectables-links-module-AppModule-935af14959ea4b88cd63b94910ae4f87"' }>
                                        <li class="link">
                                            <a href="injectables/ValidateService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ValidateService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AlertService.html" data-type="entity-link">AlertService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link">AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CharacterService.html" data-type="entity-link">CharacterService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EmailService.html" data-type="entity-link">EmailService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EventService.html" data-type="entity-link">EventService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GroupService.html" data-type="entity-link">GroupService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ObjectService.html" data-type="entity-link">ObjectService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PlaceService.html" data-type="entity-link">PlaceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProjectService.html" data-type="entity-link">ProjectService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link">AuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/SLArchiveProjectResult.html" data-type="entity-link">SLArchiveProjectResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SLCharacter.html" data-type="entity-link">SLCharacter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SLCreateCharacterResult.html" data-type="entity-link">SLCreateCharacterResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SLCreateEventResult.html" data-type="entity-link">SLCreateEventResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SLCreateGroupResult.html" data-type="entity-link">SLCreateGroupResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SLCreateObjectResult.html" data-type="entity-link">SLCreateObjectResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SLCreatePlaceResult.html" data-type="entity-link">SLCreatePlaceResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SLCreateProjectResult.html" data-type="entity-link">SLCreateProjectResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SLDeleteCharacterResult.html" data-type="entity-link">SLDeleteCharacterResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SLDeleteEventResult.html" data-type="entity-link">SLDeleteEventResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SLDeleteGroupResult.html" data-type="entity-link">SLDeleteGroupResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SLDeleteObjectResult.html" data-type="entity-link">SLDeleteObjectResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SLDeletePlaceResult.html" data-type="entity-link">SLDeletePlaceResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SLDeleteProjectResult.html" data-type="entity-link">SLDeleteProjectResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SLEvent.html" data-type="entity-link">SLEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SLGetAllCharactersResult.html" data-type="entity-link">SLGetAllCharactersResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SLGetAllEventsResult.html" data-type="entity-link">SLGetAllEventsResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SLGetAllGroupsResult.html" data-type="entity-link">SLGetAllGroupsResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SLGetAllObjectsResult.html" data-type="entity-link">SLGetAllObjectsResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SLGetAllPlacesResult.html" data-type="entity-link">SLGetAllPlacesResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SLGetAllProjectsResult.html" data-type="entity-link">SLGetAllProjectsResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SLGetCharacterByIdResult.html" data-type="entity-link">SLGetCharacterByIdResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SLGetEventByIdResult.html" data-type="entity-link">SLGetEventByIdResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SLGetGroupByIdResult.html" data-type="entity-link">SLGetGroupByIdResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SLGetObjectByIdResult.html" data-type="entity-link">SLGetObjectByIdResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SLGetPlaceByIdResult.html" data-type="entity-link">SLGetPlaceByIdResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SLGetProjectByIdResult.html" data-type="entity-link">SLGetProjectByIdResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SLGetUserResult.html" data-type="entity-link">SLGetUserResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SLGroup.html" data-type="entity-link">SLGroup</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SLLoginResult.html" data-type="entity-link">SLLoginResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SLMongoCharacter.html" data-type="entity-link">SLMongoCharacter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SLMongoEvent.html" data-type="entity-link">SLMongoEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SLMongoGroup.html" data-type="entity-link">SLMongoGroup</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SLMongoObject.html" data-type="entity-link">SLMongoObject</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SLMongoPlace.html" data-type="entity-link">SLMongoPlace</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SLMongoProject.html" data-type="entity-link">SLMongoProject</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SLMongoUser.html" data-type="entity-link">SLMongoUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SLObject.html" data-type="entity-link">SLObject</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SLPlace.html" data-type="entity-link">SLPlace</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SLProject.html" data-type="entity-link">SLProject</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SLRegisterResult.html" data-type="entity-link">SLRegisterResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SLSendFeedbackResult.html" data-type="entity-link">SLSendFeedbackResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SLUnarchiveProjectResult.html" data-type="entity-link">SLUnarchiveProjectResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SLUpdateCharacterResult.html" data-type="entity-link">SLUpdateCharacterResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SLUpdateEventResult.html" data-type="entity-link">SLUpdateEventResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SLUpdateGroupResult.html" data-type="entity-link">SLUpdateGroupResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SLUpdateNicknameResult.html" data-type="entity-link">SLUpdateNicknameResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SLUpdateObjectResult.html" data-type="entity-link">SLUpdateObjectResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SLUpdatePlaceResult.html" data-type="entity-link">SLUpdatePlaceResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SLUpdateProjectResult.html" data-type="entity-link">SLUpdateProjectResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SLUser.html" data-type="entity-link">SLUser</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});