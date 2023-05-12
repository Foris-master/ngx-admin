import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestResource } from '../models/rest-resource';
import { REST_FIELD_TYPES, PERMISSION } from '../models/rest-resource.model';
import { RestAdminConfigService } from '../service/rest-admin-config.service';
import { RestResourceService } from '../service/rest-resource.service';
import { NbDialogService, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { RestLangService } from '../service/rest-lang.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxPermissionsService } from 'ngx-permissions';
import * as i0 from "@angular/core";
export declare class RestResourceDetailComponent implements OnInit {
    private activatedRoute;
    private serviceRest;
    private serviceRestAdminConfig;
    private router;
    private dataSourceBuilder;
    private dialogService;
    private langService;
    private sanitizer;
    private permissionsService;
    resource: RestResource;
    ID: string;
    ressourceName: string;
    container: Boolean;
    style: any;
    datas: any[];
    datas1: any[][];
    entityId: number;
    objectKeys: {
        (o: object): string[];
        (o: {}): string[];
    };
    customColumn: string;
    allColumns: string[];
    listDataSource: any;
    isTabsMenu: boolean;
    tabsName: any[];
    filesUpload: {};
    permissions: PERMISSION[];
    constructor(activatedRoute: ActivatedRoute, serviceRest: RestResourceService, serviceRestAdminConfig: RestAdminConfigService, router: Router, dataSourceBuilder: NbTreeGridDataSourceBuilder<any>, dialogService: NbDialogService, langService: RestLangService, sanitizer: DomSanitizer, permissionsService: NgxPermissionsService);
    get PERMISSION(): typeof PERMISSION;
    ngOnInit(): void;
    editEntity(): void;
    listEntity(): void;
    deleteEntity(): void;
    get REST_FIELD_TYPES(): typeof REST_FIELD_TYPES;
    onSelect(event: any): void;
    onRemove(field: any): void;
    loadBelongToDetail(data: any): void;
    isObject: (a: any) => boolean;
    isArray: (a: any) => boolean;
    getBelongToSecondField: (elt: any, response: any) => any;
    jsonValue: (val: any) => any;
    sanitizerUrl: (link: any) => import("@angular/platform-browser").SafeResourceUrl;
    static ɵfac: i0.ɵɵFactoryDeclaration<RestResourceDetailComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RestResourceDetailComponent, "ngx-rest-resource-detail", never, { "resource": "resource"; "ID": "ID"; "ressourceName": "ressourceName"; "container": "container"; "style": "style"; }, {}, never, never>;
}
//# sourceMappingURL=rest-resource-detail.component.d.ts.map