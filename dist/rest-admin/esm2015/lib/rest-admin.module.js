import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS, HttpClientJsonpModule, } from '@angular/common/http';
import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbActionsModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbIconModule, NbInputModule, NbRadioModule, NbSelectModule, NbUserModule, NbTreeGridModule, NbTimepickerModule, NbTagModule, NbAutocompleteModule, NbDialogModule, NbSpinnerModule, NbMenuModule, NbPopoverModule, NbTabsetModule, NbTooltipModule, NbToastrModule, NbSidebarModule, NbWindowModule, NbToggleModule, NbListModule, NbContextMenuModule, NbAlertModule, NbLayoutModule, } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from './@theme/theme.module';
import { CngHtmlCompilerModule } from '@codehint-ng/html-compiler';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { RouterModule } from '@angular/router';
import { RestMainComponentComponent } from './rest-admin/rest-main-component/rest-main-component.component';
import { RestAdminConfigService } from './rest-admin/rest-resource/service/rest-admin-config.service';
import { RestResourceListComponent } from './rest-admin/rest-resource/rest-resource-list/rest-resource-list.component';
import { RestResourceListFieldComponent } from './rest-admin/rest-resource/components/rest.resource-list-field/rest.resource-list-field.component';
import { RestResourceAddComponent } from './rest-admin/rest-resource/rest-resource-add/rest-resource-add.component';
import { RestResourceDeleteComponent } from './rest-admin/rest-resource/rest-ressource-delete/rest-resource-delete.component';
import { RestResourceEditorFieldsComponent } from './rest-admin/rest-resource/components/rest-resource-editor-fields/rest-resource-editor-fields.component';
import { RestResourceService } from './rest-admin/rest-resource/service/rest-resource.service';
import { ImageCropperModule } from 'ngx-image-cropper';
import { HttpAuthInterceptor } from './utils/http-auth.interceptor';
import { PaginationInterceptor } from './utils/pagination.interceptor';
import { RestResourceDetailComponent } from './rest-admin/rest-resource/rest-resource-detail/rest-resource-detail.component';
import { RestExportService } from './rest-admin/rest-resource/service/rest-export.service';
import { UploadFileComponent } from './rest-admin/rest-resource/components/upload-file/upload-file.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { RestLangService } from './rest-admin/rest-resource/service/rest-lang.service';
import { HttpErrorInterceptor } from './utils/http-error.interceptor';
import { AuthGuard } from './utils/auth.guard';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxPermissionsModule } from 'ngx-permissions';
import { CoreModule } from './@core/core.module';
import { FsIconCComponent } from './rest-admin/rest-resource/components/fs-icon-ccomponent/fs-icon.component';
import { NbAuthComponent, NbAuthModule, NbAuthSimpleToken, NbPasswordAuthStrategy, } from '@nebular/auth';
import { LoginComponent } from './auth/login/login.component';
import { isAuthGuard } from './utils/is-auth.guard';
import { NotificationService } from './rest-admin/rest-resource/service/notification.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RestShareService } from './rest-admin/rest-resource/service/rest-share.service';
import { AttributeDirective } from './rest-admin/directives/attribute.directive';
import { MenuFilterPipe } from './rest-admin/rest-main-component/menu-filter.pipe';
import { GmapsComponent } from './rest-admin/rest-resource/components/gmaps/gmaps.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { SelectAllCheckboxRenderComponent } from './rest-admin/rest-resource/components/fs-icon-ccomponent/select.component';
import { ImageZoomComponent } from './rest-admin/rest-resource/components/fs-icon-ccomponent/image-zoom.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "./rest-admin/rest-resource/service/rest-admin-config.service";
import * as i3 from "@nebular/theme";
import * as i4 from "./rest-admin/rest-resource/service/rest-lang.service";
import * as i5 from "ngx-permissions";
import * as i6 from "./@core/core.module";
import * as i7 from "./@theme/theme.module";
import * as i8 from "@ngx-translate/core";
// serviceRestConfig.restPathFileTranslate
export function createTranslateHttpLoader(http) {
    // return new MultiTranslateHttpLoader(http, [
    //   { prefix: './assets/i18n/', suffix: '.json' },//host app i18n assets
    //   { prefix: './lib/assets/i18n/', suffix: '.json' }, //your lib assets
    //   { prefix: './rest/lib/assets/i18n/', suffix: '.json' }, //your lib assets
    // ])
    return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}
export class RestAdminModule {
    constructor(router, compiler, serviceRestAdmin, iconLibraries, restLangService) {
        this.router = router;
        this.compiler = compiler;
        this.serviceRestAdmin = serviceRestAdmin;
        this.iconLibraries = iconLibraries;
        this.restLangService = restLangService;
        this.iconLibraries.registerFontPack('fas', {
            packClass: 'fas',
            iconClassPrefix: 'fa',
        });
        this.iconLibraries.registerFontPack('far', {
            packClass: 'far',
            iconClassPrefix: 'fa',
        });
        this.iconLibraries.registerFontPack('fab', {
            packClass: 'fab',
            iconClassPrefix: 'fa',
        });
        this.iconLibraries.registerFontPack('fad', {
            packClass: 'fa-duotone',
            iconClassPrefix: 'fa',
        });
        this.restLangService.setInitialAppLanguage();
        const tempModule = NgModule({
            imports: [
                RouterModule.forChild([
                    {
                        path: 'login',
                        component: NbAuthComponent,
                        canActivate: [isAuthGuard],
                        children: [
                            {
                                path: '',
                                component: LoginComponent,
                            },
                        ],
                    },
                    {
                        path: 'admin',
                        component: RestMainComponentComponent,
                        canActivate: [AuthGuard],
                        children: [...this.serviceRestAdmin.generateRoutes()],
                    },
                    { path: '', redirectTo: '/login', pathMatch: 'full' },
                    // { path: '**', redirectTo: '/' },
                ]),
                NbAuthModule.forRoot({
                    strategies: [
                        NbPasswordAuthStrategy.setup({
                            name: this.serviceRestAdmin.restAuthParams.strategy,
                            baseEndpoint: this.serviceRestAdmin.restAuthParams.baseEndpoint,
                            login: {
                                method: 'post',
                                endpoint: this.serviceRestAdmin.restAuthParams.loginEndPoint,
                                redirect: {
                                    success: this.serviceRestAdmin.restAuthParams
                                        .redirectRouteAfterLogin,
                                    failure: null,
                                },
                            },
                            token: {
                                class: NbAuthSimpleToken,
                                key: this.serviceRestAdmin.restAuthParams
                                    .tokenLocationInResponse,
                            },
                        }),
                    ],
                    forms: {
                        login: {
                            redirectDelay: 500,
                            strategy: this.serviceRestAdmin.restAuthParams.strategy,
                            showMessages: {
                                success: true,
                                error: true,
                            },
                        },
                    },
                }),
            ],
        })(class {
        });
        this.compiler.compileModuleAsync(tempModule).then((module) => {
            const routes = {
                path: '',
                loadChildren() {
                    return module;
                },
            };
            this.router.resetConfig([routes, ...this.router.config]);
        });
    }
    static forRoot(restConfig) {
        return {
            ngModule: RestAdminModule,
            providers: [
                RestAdminConfigService,
                { provide: 'restConfig', useValue: restConfig },
            ],
        };
    }
}
RestAdminModule.ɵfac = function RestAdminModule_Factory(t) { return new (t || RestAdminModule)(i0.ɵɵinject(i1.Router), i0.ɵɵinject(i0.Compiler), i0.ɵɵinject(i2.RestAdminConfigService), i0.ɵɵinject(i3.NbIconLibraries), i0.ɵɵinject(i4.RestLangService)); };
RestAdminModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: RestAdminModule });
RestAdminModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpAuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: PaginationInterceptor,
            multi: true,
        },
        AuthGuard,
        isAuthGuard,
        RestResourceService,
        RestAdminConfigService,
        RestExportService,
        RestLangService,
        NotificationService,
        RestShareService,
    ], imports: [[
            CommonModule,
            BrowserModule,
            BrowserAnimationsModule,
            RouterModule,
            ReactiveFormsModule,
            FormsModule,
            HttpClientModule,
            HttpClientJsonpModule,
            NbActionsModule,
            NbButtonModule,
            NbCardModule,
            NbCheckboxModule,
            NbInputModule,
            NbTagModule,
            NbRadioModule,
            NbUserModule,
            NbTreeGridModule,
            NbAlertModule,
            NbAutocompleteModule,
            Ng2SmartTableModule,
            FileUploadModule,
            CngHtmlCompilerModule,
            NbSpinnerModule,
            NbTabsetModule,
            NbPopoverModule,
            ImageCropperModule,
            NbToggleModule,
            NbListModule,
            NbTooltipModule,
            NbContextMenuModule,
            TranslateModule,
            NgxDropzoneModule,
            NgxPermissionsModule.forRoot(),
            NbLayoutModule,
            NbSelectModule,
            NbSidebarModule,
            NbMenuModule.forRoot(),
            NbDatepickerModule.forRoot(),
            NbDialogModule.forRoot(),
            NbWindowModule.forRoot(),
            NbToastrModule.forRoot(),
            NbTimepickerModule.forRoot(),
            CoreModule.forRoot(),
            ThemeModule.forRoot(),
            NbIconModule,
            GoogleMapsModule,
            TranslateModule.forRoot({
                loader: {
                    provide: TranslateLoader,
                    useFactory: createTranslateHttpLoader,
                    deps: [HttpClient],
                },
            }),
        ]] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(RestAdminModule, [{
        type: NgModule,
        args: [{
                declarations: [
                    RestResourceListComponent,
                    RestResourceAddComponent,
                    RestResourceDeleteComponent,
                    RestMainComponentComponent,
                    RestResourceEditorFieldsComponent,
                    RestResourceListFieldComponent,
                    RestResourceDetailComponent,
                    UploadFileComponent,
                    SelectAllCheckboxRenderComponent,
                    FsIconCComponent,
                    LoginComponent,
                    AttributeDirective,
                    MenuFilterPipe,
                    GmapsComponent,
                    ImageZoomComponent,
                ],
                exports: [
                    RestResourceListComponent,
                    RestResourceAddComponent,
                    RestResourceDeleteComponent,
                    RestMainComponentComponent,
                    RestResourceEditorFieldsComponent,
                    RestResourceListFieldComponent,
                    RestResourceDetailComponent,
                    UploadFileComponent,
                    LoginComponent,
                    GmapsComponent,
                ],
                entryComponents: [
                    RestResourceListComponent,
                    RestResourceListFieldComponent,
                    RestResourceAddComponent,
                    FsIconCComponent,
                    SelectAllCheckboxRenderComponent,
                    RestResourceDeleteComponent,
                    RestMainComponentComponent,
                    RestResourceEditorFieldsComponent,
                    RestResourceDetailComponent,
                    UploadFileComponent,
                    LoginComponent,
                    GmapsComponent,
                    ImageZoomComponent,
                ],
                imports: [
                    CommonModule,
                    BrowserModule,
                    BrowserAnimationsModule,
                    RouterModule,
                    ReactiveFormsModule,
                    FormsModule,
                    HttpClientModule,
                    HttpClientJsonpModule,
                    NbActionsModule,
                    NbButtonModule,
                    NbCardModule,
                    NbCheckboxModule,
                    NbInputModule,
                    NbTagModule,
                    NbRadioModule,
                    NbUserModule,
                    NbTreeGridModule,
                    NbAlertModule,
                    NbAutocompleteModule,
                    Ng2SmartTableModule,
                    FileUploadModule,
                    CngHtmlCompilerModule,
                    NbSpinnerModule,
                    NbTabsetModule,
                    NbPopoverModule,
                    ImageCropperModule,
                    NbToggleModule,
                    NbListModule,
                    NbTooltipModule,
                    NbContextMenuModule,
                    TranslateModule,
                    NgxDropzoneModule,
                    NgxPermissionsModule.forRoot(),
                    NbLayoutModule,
                    NbSelectModule,
                    NbSidebarModule,
                    NbMenuModule.forRoot(),
                    NbDatepickerModule.forRoot(),
                    NbDialogModule.forRoot(),
                    NbWindowModule.forRoot(),
                    NbToastrModule.forRoot(),
                    NbTimepickerModule.forRoot(),
                    CoreModule.forRoot(),
                    ThemeModule.forRoot(),
                    NbIconModule,
                    GoogleMapsModule,
                    TranslateModule.forRoot({
                        loader: {
                            provide: TranslateLoader,
                            useFactory: createTranslateHttpLoader,
                            deps: [HttpClient],
                        },
                    }),
                ],
                providers: [
                    { provide: HTTP_INTERCEPTORS, useClass: HttpAuthInterceptor, multi: true },
                    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
                    {
                        provide: HTTP_INTERCEPTORS,
                        useClass: PaginationInterceptor,
                        multi: true,
                    },
                    AuthGuard,
                    isAuthGuard,
                    RestResourceService,
                    RestAdminConfigService,
                    RestExportService,
                    RestLangService,
                    NotificationService,
                    RestShareService,
                ],
            }]
    }], function () { return [{ type: i1.Router }, { type: i0.Compiler }, { type: i2.RestAdminConfigService }, { type: i3.NbIconLibraries }, { type: i4.RestLangService }]; }, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(RestAdminModule, { declarations: [RestResourceListComponent,
        RestResourceAddComponent,
        RestResourceDeleteComponent,
        RestMainComponentComponent,
        RestResourceEditorFieldsComponent,
        RestResourceListFieldComponent,
        RestResourceDetailComponent,
        UploadFileComponent,
        SelectAllCheckboxRenderComponent,
        FsIconCComponent,
        LoginComponent,
        AttributeDirective,
        MenuFilterPipe,
        GmapsComponent,
        ImageZoomComponent], imports: [CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        NbActionsModule,
        NbButtonModule,
        NbCardModule,
        NbCheckboxModule,
        NbInputModule,
        NbTagModule,
        NbRadioModule,
        NbUserModule,
        NbTreeGridModule,
        NbAlertModule,
        NbAutocompleteModule,
        Ng2SmartTableModule,
        FileUploadModule,
        CngHtmlCompilerModule,
        NbSpinnerModule,
        NbTabsetModule,
        NbPopoverModule,
        ImageCropperModule,
        NbToggleModule,
        NbListModule,
        NbTooltipModule,
        NbContextMenuModule,
        TranslateModule,
        NgxDropzoneModule, i5.NgxPermissionsModule, NbLayoutModule,
        NbSelectModule,
        NbSidebarModule, i3.NbMenuModule, i3.NbDatepickerModule, i3.NbDialogModule, i3.NbWindowModule, i3.NbToastrModule, i3.NbTimepickerModule, i6.CoreModule, i7.ThemeModule, NbIconModule,
        GoogleMapsModule, i8.TranslateModule], exports: [RestResourceListComponent,
        RestResourceAddComponent,
        RestResourceDeleteComponent,
        RestMainComponentComponent,
        RestResourceEditorFieldsComponent,
        RestResourceListFieldComponent,
        RestResourceDetailComponent,
        UploadFileComponent,
        LoginComponent,
        GmapsComponent] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdC1hZG1pbi5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9yZXN0LWFkbWluL3NyYy9saWIvcmVzdC1hZG1pbi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RSxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUNMLFVBQVUsRUFDVixnQkFBZ0IsRUFDaEIsaUJBQWlCLEVBQ2pCLHFCQUFxQixHQUN0QixNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFJTCxRQUFRLEdBQ1QsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFDTCxlQUFlLEVBQ2YsY0FBYyxFQUNkLFlBQVksRUFDWixnQkFBZ0IsRUFDaEIsa0JBQWtCLEVBQ2xCLFlBQVksRUFDWixhQUFhLEVBQ2IsYUFBYSxFQUNiLGNBQWMsRUFDZCxZQUFZLEVBQ1osZ0JBQWdCLEVBQ2hCLGtCQUFrQixFQUNsQixXQUFXLEVBQ1gsb0JBQW9CLEVBQ3BCLGNBQWMsRUFDZCxlQUFlLEVBQ2YsWUFBWSxFQUNaLGVBQWUsRUFDZixjQUFjLEVBQ2QsZUFBZSxFQUNmLGNBQWMsRUFDZCxlQUFlLEVBQ2YsY0FBYyxFQUNkLGNBQWMsRUFDZCxZQUFZLEVBQ1osbUJBQW1CLEVBRW5CLGFBQWEsRUFDYixjQUFjLEdBQ2YsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDcEQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFbkUs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Q25CLGdCQUFnQjtpQkFDakI7YUFDRjs7d0ZBQ1ksZUFBZSxtQkFySHhCLHlCQUF5QjtRQUN6Qix3QkFBd0I7UUFDeEIsMkJBQTJCO1FBQzNCLDBCQUEwQjtRQUMxQixpQ0FBaUM7UUFDakMsOEJBQThCO1FBQzlCLDJCQUEyQjtRQUMzQixtQkFBbUI7UUFDbkIsZ0NBQWdDO1FBQ2hDLGdCQUFnQjtRQUNoQixjQUFjO1FBQ2Qsa0JBQWtCO1FBQ2xCLGNBQWM7UUFDZCxjQUFjO1FBQ2Qsa0JBQWtCLGFBOEJsQixZQUFZO1FBQ1osYUFBYTtRQUNiLHVCQUF1QjtRQUN2QixZQUFZO1FBQ1osbUJBQW1CO1FBQ25CLFdBQVc7UUFDWCxnQkFBZ0I7UUFDaEIscUJBQXFCO1FBQ3JCLGVBQWU7UUFDZixjQUFjO1FBQ2QsWUFBWTtRQUNaLGdCQUFnQjtRQUNoQixhQUFhO1FBQ2IsV0FBVztRQUNYLGFBQWE7UUFDYixZQUFZO1FBQ1osZ0JBQWdCO1FBQ2hCLGFBQWE7UUFDYixvQkFBb0I7UUFDcEIsbUJBQW1CO1FBQ25CLGdCQUFnQjtRQUNoQixxQkFBcUI7UUFDckIsZUFBZTtRQUNmLGNBQWM7UUFDZCxlQUFlO1FBQ2Ysa0JBQWtCO1FBQ2xCLGNBQWM7UUFDZCxZQUFZO1FBQ1osZUFBZTtRQUNmLG1CQUFtQjtRQUNuQixlQUFlO1FBQ2YsaUJBQWlCLDJCQUVqQixjQUFjO1FBQ2QsY0FBYztRQUNkLGVBQWUseUpBU2YsWUFBWTtRQUNaLGdCQUFnQixpQ0F4RWhCLHlCQUF5QjtRQUN6Qix3QkFBd0I7UUFDeEIsMkJBQTJCO1FBQzNCLDBCQUEwQjtRQUMxQixpQ0FBaUM7UUFDakMsOEJBQThCO1FBQzlCLDJCQUEyQjtRQUMzQixtQkFBbUI7UUFDbkIsY0FBYztRQUNkLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUcmFuc2xhdGVMb2FkZXIsIFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1xuICBIdHRwQ2xpZW50LFxuICBIdHRwQ2xpZW50TW9kdWxlLFxuICBIVFRQX0lOVEVSQ0VQVE9SUyxcbiAgSHR0cENsaWVudEpzb25wTW9kdWxlLFxufSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQge1xuICBDb21waWxlcixcbiAgRXJyb3JIYW5kbGVyLFxuICBNb2R1bGVXaXRoUHJvdmlkZXJzLFxuICBOZ01vZHVsZSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgTmJBY3Rpb25zTW9kdWxlLFxuICBOYkJ1dHRvbk1vZHVsZSxcbiAgTmJDYXJkTW9kdWxlLFxuICBOYkNoZWNrYm94TW9kdWxlLFxuICBOYkRhdGVwaWNrZXJNb2R1bGUsXG4gIE5iSWNvbk1vZHVsZSxcbiAgTmJJbnB1dE1vZHVsZSxcbiAgTmJSYWRpb01vZHVsZSxcbiAgTmJTZWxlY3RNb2R1bGUsXG4gIE5iVXNlck1vZHVsZSxcbiAgTmJUcmVlR3JpZE1vZHVsZSxcbiAgTmJUaW1lcGlja2VyTW9kdWxlLFxuICBOYlRhZ01vZHVsZSxcbiAgTmJBdXRvY29tcGxldGVNb2R1bGUsXG4gIE5iRGlhbG9nTW9kdWxlLFxuICBOYlNwaW5uZXJNb2R1bGUsXG4gIE5iTWVudU1vZHVsZSxcbiAgTmJQb3BvdmVyTW9kdWxlLFxuICBOYlRhYnNldE1vZHVsZSxcbiAgTmJUb29sdGlwTW9kdWxlLFxuICBOYlRvYXN0ck1vZHVsZSxcbiAgTmJTaWRlYmFyTW9kdWxlLFxuICBOYldpbmRvd01vZHVsZSxcbiAgTmJUb2dnbGVNb2R1bGUsXG4gIE5iTGlzdE1vZHVsZSxcbiAgTmJDb250ZXh0TWVudU1vZHVsZSxcbiAgTmJJY29uTGlicmFyaWVzLFxuICBOYkFsZXJ0TW9kdWxlLFxuICBOYkxheW91dE1vZHVsZSxcbn0gZnJvbSAnQG5lYnVsYXIvdGhlbWUnO1xuaW1wb3J0IHsgTmcyU21hcnRUYWJsZU1vZHVsZSB9IGZyb20gJ25nMi1zbWFydC10YWJsZSc7XG5pbXBvcnQgeyBUaGVtZU1vZHVsZSB9IGZyb20gJy4vQHRoZW1lL3RoZW1lLm1vZHVsZSc7XG5pbXBvcnQgeyBDbmdIdG1sQ29tcGlsZXJNb2R1bGUgfSBmcm9tICdAY29kZWhpbnQtbmcvaHRtbC1jb21waWxlcic7XG5cbmltcG9ydCB7IEZpbGVVcGxvYWRNb2R1bGUgfSBmcm9tICdAaXBsYWIvbmd4LWZpbGUtdXBsb2FkJztcbmltcG9ydCB7IFJvdXRlciwgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFJlc3RNYWluQ29tcG9uZW50Q29tcG9uZW50IH0gZnJvbSAnLi9yZXN0LWFkbWluL3Jlc3QtbWFpbi1jb21wb25lbnQvcmVzdC1tYWluLWNvbXBvbmVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgUmVzdEFkbWluQ29uZmlnU2VydmljZSB9IGZyb20gJy4vcmVzdC1hZG1pbi9yZXN0LXJlc291cmNlL3NlcnZpY2UvcmVzdC1hZG1pbi1jb25maWcuc2VydmljZSc7XG5pbXBvcnQgeyBSRVNUX0NPTkZJRyB9IGZyb20gJy4vcmVzdC1hZG1pbi9yZXN0LXJlc291cmNlL21vZGVscy9yZXN0LXJlc291cmNlLm1vZGVsJztcbmltcG9ydCB7IFJlc3RSZXNvdXJjZUxpc3RDb21wb25lbnQgfSBmcm9tICcuL3Jlc3QtYWRtaW4vcmVzdC1yZXNvdXJjZS9yZXN0LXJlc291cmNlLWxpc3QvcmVzdC1yZXNvdXJjZS1saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSZXN0UmVzb3VyY2VMaXN0RmllbGRDb21wb25lbnQgfSBmcm9tICcuL3Jlc3QtYWRtaW4vcmVzdC1yZXNvdXJjZS9jb21wb25lbnRzL3Jlc3QucmVzb3VyY2UtbGlzdC1maWVsZC9yZXN0LnJlc291cmNlLWxpc3QtZmllbGQuY29tcG9uZW50JztcbmltcG9ydCB7IFJlc3RSZXNvdXJjZUFkZENvbXBvbmVudCB9IGZyb20gJy4vcmVzdC1hZG1pbi9yZXN0LXJlc291cmNlL3Jlc3QtcmVzb3VyY2UtYWRkL3Jlc3QtcmVzb3VyY2UtYWRkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSZXN0UmVzb3VyY2VEZWxldGVDb21wb25lbnQgfSBmcm9tICcuL3Jlc3QtYWRtaW4vcmVzdC1yZXNvdXJjZS9yZXN0LXJlc3NvdXJjZS1kZWxldGUvcmVzdC1yZXNvdXJjZS1kZWxldGUuY29tcG9uZW50JztcbmltcG9ydCB7IFJlc3RSZXNvdXJjZUVkaXRvckZpZWxkc0NvbXBvbmVudCB9IGZyb20gJy4vcmVzdC1hZG1pbi9yZXN0LXJlc291cmNlL2NvbXBvbmVudHMvcmVzdC1yZXNvdXJjZS1lZGl0b3ItZmllbGRzL3Jlc3QtcmVzb3VyY2UtZWRpdG9yLWZpZWxkcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgUmVzdFJlc291cmNlU2VydmljZSB9IGZyb20gJy4vcmVzdC1hZG1pbi9yZXN0LXJlc291cmNlL3NlcnZpY2UvcmVzdC1yZXNvdXJjZS5zZXJ2aWNlJztcbmltcG9ydCB7IEltYWdlQ3JvcHBlck1vZHVsZSB9IGZyb20gJ25neC1pbWFnZS1jcm9wcGVyJztcbmltcG9ydCB7IEh0dHBBdXRoSW50ZXJjZXB0b3IgfSBmcm9tICcuL3V0aWxzL2h0dHAtYXV0aC5pbnRlcmNlcHRvcic7XG5pbXBvcnQgeyBQYWdpbmF0aW9uSW50ZXJjZXB0b3IgfSBmcm9tICcuL3V0aWxzL3BhZ2luYXRpb24uaW50ZXJjZXB0b3InO1xuaW1wb3J0IHsgUmVzdFJlc291cmNlRGV0YWlsQ29tcG9uZW50IH0gZnJvbSAnLi9yZXN0LWFkbWluL3Jlc3QtcmVzb3VyY2UvcmVzdC1yZXNvdXJjZS1kZXRhaWwvcmVzdC1yZXNvdXJjZS1kZXRhaWwuY29tcG9uZW50JztcbmltcG9ydCB7IFJlc3RFeHBvcnRTZXJ2aWNlIH0gZnJvbSAnLi9yZXN0LWFkbWluL3Jlc3QtcmVzb3VyY2Uvc2VydmljZS9yZXN0LWV4cG9ydC5zZXJ2aWNlJztcbmltcG9ydCB7IFVwbG9hZEZpbGVDb21wb25lbnQgfSBmcm9tICcuL3Jlc3QtYWRtaW4vcmVzdC1yZXNvdXJjZS9jb21wb25lbnRzL3VwbG9hZC1maWxlL3VwbG9hZC1maWxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUcmFuc2xhdGVIdHRwTG9hZGVyIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvaHR0cC1sb2FkZXInO1xuaW1wb3J0IHsgUmVzdExhbmdTZXJ2aWNlIH0gZnJvbSAnLi9yZXN0LWFkbWluL3Jlc3QtcmVzb3VyY2Uvc2VydmljZS9yZXN0LWxhbmcuc2VydmljZSc7XG5pbXBvcnQgeyBIdHRwRXJyb3JJbnRlcmNlcHRvciB9IGZyb20gJy4vdXRpbHMvaHR0cC1lcnJvci5pbnRlcmNlcHRvcic7XG5pbXBvcnQgeyBBdXRoR3VhcmQgfSBmcm9tICcuL3V0aWxzL2F1dGguZ3VhcmQnO1xuaW1wb3J0IHsgTmd4RHJvcHpvbmVNb2R1bGUgfSBmcm9tICduZ3gtZHJvcHpvbmUnO1xuaW1wb3J0IHsgTmd4UGVybWlzc2lvbnNNb2R1bGUgfSBmcm9tICduZ3gtcGVybWlzc2lvbnMnO1xuaW1wb3J0IHsgQ29yZU1vZHVsZSB9IGZyb20gJy4vQGNvcmUvY29yZS5tb2R1bGUnO1xuaW1wb3J0IHsgRnNJY29uQ0NvbXBvbmVudCB9IGZyb20gJy4vcmVzdC1hZG1pbi9yZXN0LXJlc291cmNlL2NvbXBvbmVudHMvZnMtaWNvbi1jY29tcG9uZW50L2ZzLWljb24uY29tcG9uZW50JztcbmltcG9ydCB7IE11bHRpVHJhbnNsYXRlSHR0cExvYWRlciB9IGZyb20gJ25neC10cmFuc2xhdGUtbXVsdGktaHR0cC1sb2FkZXInO1xuaW1wb3J0IHtcbiAgTmJBdXRoQ29tcG9uZW50LFxuICBOYkF1dGhNb2R1bGUsXG4gIE5iQXV0aFNpbXBsZVRva2VuLFxuICBOYlBhc3N3b3JkQXV0aFN0cmF0ZWd5LFxufSBmcm9tICdAbmVidWxhci9hdXRoJztcbmltcG9ydCB7IExvZ2luQ29tcG9uZW50IH0gZnJvbSAnLi9hdXRoL2xvZ2luL2xvZ2luLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBpc0F1dGhHdWFyZCB9IGZyb20gJy4vdXRpbHMvaXMtYXV0aC5ndWFyZCc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9yZXN0LWFkbWluL3Jlc3QtcmVzb3VyY2Uvc2VydmljZS9ub3RpZmljYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBCcm93c2VyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBSZXN0U2hhcmVTZXJ2aWNlIH0gZnJvbSAnLi9yZXN0LWFkbWluL3Jlc3QtcmVzb3VyY2Uvc2VydmljZS9yZXN0LXNoYXJlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXR0cmlidXRlRGlyZWN0aXZlIH0gZnJvbSAnLi9yZXN0LWFkbWluL2RpcmVjdGl2ZXMvYXR0cmlidXRlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBNZW51RmlsdGVyUGlwZSB9IGZyb20gJy4vcmVzdC1hZG1pbi9yZXN0LW1haW4tY29tcG9uZW50L21lbnUtZmlsdGVyLnBpcGUnO1xuaW1wb3J0IHsgR21hcHNDb21wb25lbnQgfSBmcm9tICcuL3Jlc3QtYWRtaW4vcmVzdC1yZXNvdXJjZS9jb21wb25lbnRzL2dtYXBzL2dtYXBzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBHb29nbGVNYXBzTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZ29vZ2xlLW1hcHMnO1xuaW1wb3J0IHsgU2VsZWN0QWxsQ2hlY2tib3hSZW5kZXJDb21wb25lbnQgfSBmcm9tICcuL3Jlc3QtYWRtaW4vcmVzdC1yZXNvdXJjZS9jb21wb25lbnRzL2ZzLWljb24tY2NvbXBvbmVudC9zZWxlY3QuY29tcG9uZW50JztcbmltcG9ydCB7IEltYWdlWm9vbUNvbXBvbmVudCB9IGZyb20gJy4vcmVzdC1hZG1pbi9yZXN0LXJlc291cmNlL2NvbXBvbmVudHMvZnMtaWNvbi1jY29tcG9uZW50L2ltYWdlLXpvb20uY29tcG9uZW50JztcblxuLy8gc2VydmljZVJlc3RDb25maWcucmVzdFBhdGhGaWxlVHJhbnNsYXRlXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVHJhbnNsYXRlSHR0cExvYWRlcihodHRwOiBIdHRwQ2xpZW50KSB7XG4gIC8vIHJldHVybiBuZXcgTXVsdGlUcmFuc2xhdGVIdHRwTG9hZGVyKGh0dHAsIFtcbiAgLy8gICB7IHByZWZpeDogJy4vYXNzZXRzL2kxOG4vJywgc3VmZml4OiAnLmpzb24nIH0sLy9ob3N0IGFwcCBpMThuIGFzc2V0c1xuICAvLyAgIHsgcHJlZml4OiAnLi9saWIvYXNzZXRzL2kxOG4vJywgc3VmZml4OiAnLmpzb24nIH0sIC8veW91ciBsaWIgYXNzZXRzXG4gIC8vICAgeyBwcmVmaXg6ICcuL3Jlc3QvbGliL2Fzc2V0cy9pMThuLycsIHN1ZmZpeDogJy5qc29uJyB9LCAvL3lvdXIgbGliIGFzc2V0c1xuICAvLyBdKVxuICByZXR1cm4gbmV3IFRyYW5zbGF0ZUh0dHBMb2FkZXIoaHR0cCwgJ2Fzc2V0cy9pMThuLycsICcuanNvbicpO1xufVxuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBSZXN0UmVzb3VyY2VMaXN0Q29tcG9uZW50LFxuICAgIFJlc3RSZXNvdXJjZUFkZENvbXBvbmVudCxcbiAgICBSZXN0UmVzb3VyY2VEZWxldGVDb21wb25lbnQsXG4gICAgUmVzdE1haW5Db21wb25lbnRDb21wb25lbnQsXG4gICAgUmVzdFJlc291cmNlRWRpdG9yRmllbGRzQ29tcG9uZW50LFxuICAgIFJlc3RSZXNvdXJjZUxpc3RGaWVsZENvbXBvbmVudCxcbiAgICBSZXN0UmVzb3VyY2VEZXRhaWxDb21wb25lbnQsXG4gICAgVXBsb2FkRmlsZUNvbXBvbmVudCxcbiAgICBTZWxlY3RBbGxDaGVja2JveFJlbmRlckNvbXBvbmVudCxcbiAgICBGc0ljb25DQ29tcG9uZW50LFxuICAgIExvZ2luQ29tcG9uZW50LFxuICAgIEF0dHJpYnV0ZURpcmVjdGl2ZSxcbiAgICBNZW51RmlsdGVyUGlwZSxcbiAgICBHbWFwc0NvbXBvbmVudCxcbiAgICBJbWFnZVpvb21Db21wb25lbnQsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBSZXN0UmVzb3VyY2VMaXN0Q29tcG9uZW50LFxuICAgIFJlc3RSZXNvdXJjZUFkZENvbXBvbmVudCxcbiAgICBSZXN0UmVzb3VyY2VEZWxldGVDb21wb25lbnQsXG4gICAgUmVzdE1haW5Db21wb25lbnRDb21wb25lbnQsXG4gICAgUmVzdFJlc291cmNlRWRpdG9yRmllbGRzQ29tcG9uZW50LFxuICAgIFJlc3RSZXNvdXJjZUxpc3RGaWVsZENvbXBvbmVudCxcbiAgICBSZXN0UmVzb3VyY2VEZXRhaWxDb21wb25lbnQsXG4gICAgVXBsb2FkRmlsZUNvbXBvbmVudCxcbiAgICBMb2dpbkNvbXBvbmVudCxcbiAgICBHbWFwc0NvbXBvbmVudCxcbiAgXSxcbiAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgUmVzdFJlc291cmNlTGlzdENvbXBvbmVudCxcbiAgICBSZXN0UmVzb3VyY2VMaXN0RmllbGRDb21wb25lbnQsXG4gICAgUmVzdFJlc291cmNlQWRkQ29tcG9uZW50LFxuICAgIEZzSWNvbkNDb21wb25lbnQsXG4gICAgU2VsZWN0QWxsQ2hlY2tib3hSZW5kZXJDb21wb25lbnQsXG4gICAgUmVzdFJlc291cmNlRGVsZXRlQ29tcG9uZW50LFxuICAgIFJlc3RNYWluQ29tcG9uZW50Q29tcG9uZW50LFxuICAgIFJlc3RSZXNvdXJjZUVkaXRvckZpZWxkc0NvbXBvbmVudCxcbiAgICBSZXN0UmVzb3VyY2VEZXRhaWxDb21wb25lbnQsXG4gICAgVXBsb2FkRmlsZUNvbXBvbmVudCxcbiAgICBMb2dpbkNvbXBvbmVudCxcbiAgICBHbWFwc0NvbXBvbmVudCxcbiAgICBJbWFnZVpvb21Db21wb25lbnQsXG4gIF0sXG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgQnJvd3Nlck1vZHVsZSxcbiAgICBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSxcbiAgICBSb3V0ZXJNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBIdHRwQ2xpZW50TW9kdWxlLFxuICAgIEh0dHBDbGllbnRKc29ucE1vZHVsZSxcbiAgICBOYkFjdGlvbnNNb2R1bGUsXG4gICAgTmJCdXR0b25Nb2R1bGUsXG4gICAgTmJDYXJkTW9kdWxlLFxuICAgIE5iQ2hlY2tib3hNb2R1bGUsXG4gICAgTmJJbnB1dE1vZHVsZSxcbiAgICBOYlRhZ01vZHVsZSxcbiAgICBOYlJhZGlvTW9kdWxlLFxuICAgIE5iVXNlck1vZHVsZSxcbiAgICBOYlRyZWVHcmlkTW9kdWxlLFxuICAgIE5iQWxlcnRNb2R1bGUsXG4gICAgTmJBdXRvY29tcGxldGVNb2R1bGUsXG4gICAgTmcyU21hcnRUYWJsZU1vZHVsZSxcbiAgICBGaWxlVXBsb2FkTW9kdWxlLFxuICAgIENuZ0h0bWxDb21waWxlck1vZHVsZSxcbiAgICBOYlNwaW5uZXJNb2R1bGUsXG4gICAgTmJUYWJzZXRNb2R1bGUsXG4gICAgTmJQb3BvdmVyTW9kdWxlLFxuICAgIEltYWdlQ3JvcHBlck1vZHVsZSxcbiAgICBOYlRvZ2dsZU1vZHVsZSxcbiAgICBOYkxpc3RNb2R1bGUsXG4gICAgTmJUb29sdGlwTW9kdWxlLFxuICAgIE5iQ29udGV4dE1lbnVNb2R1bGUsXG4gICAgVHJhbnNsYXRlTW9kdWxlLFxuICAgIE5neERyb3B6b25lTW9kdWxlLFxuICAgIE5neFBlcm1pc3Npb25zTW9kdWxlLmZvclJvb3QoKSxcbiAgICBOYkxheW91dE1vZHVsZSxcbiAgICBOYlNlbGVjdE1vZHVsZSxcbiAgICBOYlNpZGViYXJNb2R1bGUsXG4gICAgTmJNZW51TW9kdWxlLmZvclJvb3QoKSxcbiAgICBOYkRhdGVwaWNrZXJNb2R1bGUuZm9yUm9vdCgpLFxuICAgIE5iRGlhbG9nTW9kdWxlLmZvclJvb3QoKSxcbiAgICBOYldpbmRvd01vZHVsZS5mb3JSb290KCksXG4gICAgTmJUb2FzdHJNb2R1bGUuZm9yUm9vdCgpLFxuICAgIE5iVGltZXBpY2tlck1vZHVsZS5mb3JSb290KCksXG4gICAgQ29yZU1vZHVsZS5mb3JSb290KCksXG4gICAgVGhlbWVNb2R1bGUuZm9yUm9vdCgpLFxuICAgIE5iSWNvbk1vZHVsZSxcbiAgICBHb29nbGVNYXBzTW9kdWxlLFxuXG4gICAgVHJhbnNsYXRlTW9kdWxlLmZvclJvb3Qoe1xuICAgICAgbG9hZGVyOiB7XG4gICAgICAgIHByb3ZpZGU6IFRyYW5zbGF0ZUxvYWRlcixcbiAgICAgICAgdXNlRmFjdG9yeTogY3JlYXRlVHJhbnNsYXRlSHR0cExvYWRlcixcbiAgICAgICAgZGVwczogW0h0dHBDbGllbnRdLFxuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgeyBwcm92aWRlOiBIVFRQX0lOVEVSQ0VQVE9SUywgdXNlQ2xhc3M6IEh0dHBBdXRoSW50ZXJjZXB0b3IsIG11bHRpOiB0cnVlIH0sXG4gICAgeyBwcm92aWRlOiBIVFRQX0lOVEVSQ0VQVE9SUywgdXNlQ2xhc3M6IEh0dHBFcnJvckludGVyY2VwdG9yLCBtdWx0aTogdHJ1ZSB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IEhUVFBfSU5URVJDRVBUT1JTLFxuICAgICAgdXNlQ2xhc3M6IFBhZ2luYXRpb25JbnRlcmNlcHRvcixcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gICAgQXV0aEd1YXJkLFxuICAgIGlzQXV0aEd1YXJkLFxuICAgIFJlc3RSZXNvdXJjZVNlcnZpY2UsXG4gICAgUmVzdEFkbWluQ29uZmlnU2VydmljZSxcbiAgICBSZXN0RXhwb3J0U2VydmljZSxcbiAgICBSZXN0TGFuZ1NlcnZpY2UsXG4gICAgTm90aWZpY2F0aW9uU2VydmljZSxcbiAgICBSZXN0U2hhcmVTZXJ2aWNlLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBSZXN0QWRtaW5Nb2R1bGUge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICAgIHByaXZhdGUgY29tcGlsZXI6IENvbXBpbGVyLFxuICAgIHByaXZhdGUgc2VydmljZVJlc3RBZG1pbjogUmVzdEFkbWluQ29uZmlnU2VydmljZSxcbiAgICBwcml2YXRlIGljb25MaWJyYXJpZXM6IE5iSWNvbkxpYnJhcmllcyxcbiAgICBwcml2YXRlIHJlc3RMYW5nU2VydmljZTogUmVzdExhbmdTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMuaWNvbkxpYnJhcmllcy5yZWdpc3RlckZvbnRQYWNrKCdmYXMnLCB7XG4gICAgICBwYWNrQ2xhc3M6ICdmYXMnLFxuICAgICAgaWNvbkNsYXNzUHJlZml4OiAnZmEnLFxuICAgIH0pO1xuICAgIHRoaXMuaWNvbkxpYnJhcmllcy5yZWdpc3RlckZvbnRQYWNrKCdmYXInLCB7XG4gICAgICBwYWNrQ2xhc3M6ICdmYXInLFxuICAgICAgaWNvbkNsYXNzUHJlZml4OiAnZmEnLFxuICAgIH0pO1xuICAgIHRoaXMuaWNvbkxpYnJhcmllcy5yZWdpc3RlckZvbnRQYWNrKCdmYWInLCB7XG4gICAgICBwYWNrQ2xhc3M6ICdmYWInLFxuICAgICAgaWNvbkNsYXNzUHJlZml4OiAnZmEnLFxuICAgIH0pO1xuICAgIHRoaXMuaWNvbkxpYnJhcmllcy5yZWdpc3RlckZvbnRQYWNrKCdmYWQnLCB7XG4gICAgICBwYWNrQ2xhc3M6ICdmYS1kdW90b25lJyxcbiAgICAgIGljb25DbGFzc1ByZWZpeDogJ2ZhJyxcbiAgICB9KTtcbiAgICB0aGlzLnJlc3RMYW5nU2VydmljZS5zZXRJbml0aWFsQXBwTGFuZ3VhZ2UoKTtcblxuICAgIGNvbnN0IHRlbXBNb2R1bGUgPSBOZ01vZHVsZSh7XG4gICAgICBpbXBvcnRzOiBbXG4gICAgICAgIFJvdXRlck1vZHVsZS5mb3JDaGlsZChbXG4gICAgICAgICAge1xuICAgICAgICAgICAgcGF0aDogJ2xvZ2luJyxcbiAgICAgICAgICAgIGNvbXBvbmVudDogTmJBdXRoQ29tcG9uZW50LFxuICAgICAgICAgICAgY2FuQWN0aXZhdGU6IFtpc0F1dGhHdWFyZF0sXG4gICAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcGF0aDogJycsXG4gICAgICAgICAgICAgICAgY29tcG9uZW50OiBMb2dpbkNvbXBvbmVudCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBwYXRoOiAnYWRtaW4nLFxuICAgICAgICAgICAgY29tcG9uZW50OiBSZXN0TWFpbkNvbXBvbmVudENvbXBvbmVudCxcbiAgICAgICAgICAgIGNhbkFjdGl2YXRlOiBbQXV0aEd1YXJkXSxcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbLi4uKHRoaXMuc2VydmljZVJlc3RBZG1pbi5nZW5lcmF0ZVJvdXRlcygpIGFzIGFueSldLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgeyBwYXRoOiAnJywgcmVkaXJlY3RUbzogJy9sb2dpbicsIHBhdGhNYXRjaDogJ2Z1bGwnIH0sXG4gICAgICAgICAgLy8geyBwYXRoOiAnKionLCByZWRpcmVjdFRvOiAnLycgfSxcbiAgICAgICAgXSksXG4gICAgICAgIE5iQXV0aE1vZHVsZS5mb3JSb290KHtcbiAgICAgICAgICBzdHJhdGVnaWVzOiBbXG4gICAgICAgICAgICBOYlBhc3N3b3JkQXV0aFN0cmF0ZWd5LnNldHVwKHtcbiAgICAgICAgICAgICAgbmFtZTogdGhpcy5zZXJ2aWNlUmVzdEFkbWluLnJlc3RBdXRoUGFyYW1zLnN0cmF0ZWd5LFxuICAgICAgICAgICAgICBiYXNlRW5kcG9pbnQ6IHRoaXMuc2VydmljZVJlc3RBZG1pbi5yZXN0QXV0aFBhcmFtcy5iYXNlRW5kcG9pbnQsXG4gICAgICAgICAgICAgIGxvZ2luOiB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXG4gICAgICAgICAgICAgICAgZW5kcG9pbnQ6IHRoaXMuc2VydmljZVJlc3RBZG1pbi5yZXN0QXV0aFBhcmFtcy5sb2dpbkVuZFBvaW50LFxuICAgICAgICAgICAgICAgIHJlZGlyZWN0OiB7XG4gICAgICAgICAgICAgICAgICBzdWNjZXNzOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlcnZpY2VSZXN0QWRtaW4ucmVzdEF1dGhQYXJhbXNcbiAgICAgICAgICAgICAgICAgICAgICAucmVkaXJlY3RSb3V0ZUFmdGVyTG9naW4sXG4gICAgICAgICAgICAgICAgICBmYWlsdXJlOiBudWxsLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgdG9rZW46IHtcbiAgICAgICAgICAgICAgICBjbGFzczogTmJBdXRoU2ltcGxlVG9rZW4sXG4gICAgICAgICAgICAgICAga2V5OiB0aGlzLnNlcnZpY2VSZXN0QWRtaW4ucmVzdEF1dGhQYXJhbXNcbiAgICAgICAgICAgICAgICAgIC50b2tlbkxvY2F0aW9uSW5SZXNwb25zZSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgIF0sXG4gICAgICAgICAgZm9ybXM6IHtcbiAgICAgICAgICAgIGxvZ2luOiB7XG4gICAgICAgICAgICAgIHJlZGlyZWN0RGVsYXk6IDUwMCwgLy8gZGVsYXkgYmVmb3JlIHJlZGlyZWN0IGFmdGVyIGEgc3VjY2Vzc2Z1bCBsb2dpbiwgd2hpbGUgc3VjY2VzcyBtZXNzYWdlIGlzIHNob3duIHRvIHRoZSB1c2VyXG4gICAgICAgICAgICAgIHN0cmF0ZWd5OiB0aGlzLnNlcnZpY2VSZXN0QWRtaW4ucmVzdEF1dGhQYXJhbXMuc3RyYXRlZ3ksIC8vIHN0cmF0ZWd5IGlkIGtleS5cbiAgICAgICAgICAgICAgc2hvd01lc3NhZ2VzOiB7XG4gICAgICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBlcnJvcjogdHJ1ZSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSksXG4gICAgICBdLFxuICAgIH0pKGNsYXNzIHt9KTtcblxuICAgIHRoaXMuY29tcGlsZXIuY29tcGlsZU1vZHVsZUFzeW5jKHRlbXBNb2R1bGUpLnRoZW4oKG1vZHVsZSkgPT4ge1xuICAgICAgY29uc3Qgcm91dGVzID0ge1xuICAgICAgICBwYXRoOiAnJyxcbiAgICAgICAgbG9hZENoaWxkcmVuKCkge1xuICAgICAgICAgIHJldHVybiBtb2R1bGU7XG4gICAgICAgIH0sXG4gICAgICB9O1xuXG4gICAgICB0aGlzLnJvdXRlci5yZXNldENvbmZpZyhbcm91dGVzLCAuLi50aGlzLnJvdXRlci5jb25maWddKTtcbiAgICB9KTtcbiAgfVxuICBzdGF0aWMgZm9yUm9vdChcbiAgICByZXN0Q29uZmlnOiBSRVNUX0NPTkZJR1xuICApOiBNb2R1bGVXaXRoUHJvdmlkZXJzPFJlc3RBZG1pbk1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogUmVzdEFkbWluTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIFJlc3RBZG1pbkNvbmZpZ1NlcnZpY2UsXG4gICAgICAgIHsgcHJvdmlkZTogJ3Jlc3RDb25maWcnLCB1c2VWYWx1ZTogcmVzdENvbmZpZyB9LFxuICAgICAgXSxcbiAgICB9O1xuICB9XG59XG4iXX0=