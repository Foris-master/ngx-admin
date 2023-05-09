import { Component, Input } from '@angular/core';
import { REST_FIELD_TYPES } from '../../models/rest-resource.model';
import * as _ from 'lodash';
import * as i0 from "@angular/core";
import * as i1 from "@nebular/theme";
import * as i2 from "../../service/rest-lang.service";
import * as i3 from "@codehint-ng/html-compiler";
import * as i4 from "../fs-icon-ccomponent/fs-icon.component";
import * as i5 from "@angular/common";
export class RestResourceListFieldComponent {
    constructor(dataSourceBuilder, langService) {
        this.dataSourceBuilder = dataSourceBuilder;
        this.langService = langService;
        this.customColumn = 'name';
        this.allColumns = [this.customColumn];
    }
    ngOnInit() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        this.restField = this.value.restField;
        this.val = _.get(this.rowData, this.restField.label);
        switch (this.restField.type) {
            case REST_FIELD_TYPES.HAS_MANY:
                const datas = [];
                this.val.forEach((item) => {
                    var _a, _b, _c;
                    datas.push({
                        data: {
                            name: ((_c = (_b = (_a = this.restField) === null || _a === void 0 ? void 0 : _a.metaData) === null || _b === void 0 ? void 0 : _b.listConfig) === null || _c === void 0 ? void 0 : _c.restManyResources.label)
                                ? item[this.restField.metaData.listConfig.restManyResources.label]
                                : item,
                            item,
                        },
                    });
                });
                const rowsT = [
                    {
                        data: {
                            name: this.restField.name,
                            place: 'header-place',
                        },
                        children: datas,
                    },
                ];
                this.dataSource = this.dataSourceBuilder.create(rowsT);
                break;
            case REST_FIELD_TYPES.BELONG_TO_MANY:
                const items = [];
                this.val.forEach((item) => {
                    items.push({
                        data: {
                            name: item[this.restField.metaData.listConfig.restBelongToManyResources
                                .label],
                            item,
                        },
                    });
                });
                const rowsBelongToMany = [
                    {
                        data: {
                            name: this.restField.name,
                            place: 'header-place',
                        },
                        children: items,
                    },
                ];
                this.dataSource = this.dataSourceBuilder.create(rowsBelongToMany);
                break;
            case REST_FIELD_TYPES.HAS_ONE:
                if (this.val &&
                    !((_d = (_c = (_b = (_a = this.restField) === null || _a === void 0 ? void 0 : _a.metaData) === null || _b === void 0 ? void 0 : _b.listConfig) === null || _c === void 0 ? void 0 : _c.restHasOneResources) === null || _d === void 0 ? void 0 : _d.template)) {
                    this.val =
                        this.val[this.restField.metaData.listConfig.restHasOneResources.name];
                }
                break;
            case REST_FIELD_TYPES.COLOR:
                if (!this.val) {
                    this.val = '#E4E4E4';
                }
                break;
            default:
                break;
        }
        this.class = (_f = (_e = this.restField.metaData) === null || _e === void 0 ? void 0 : _e.listConfig) === null || _f === void 0 ? void 0 : _f.class;
        this.style = (_h = (_g = this.restField.metaData) === null || _g === void 0 ? void 0 : _g.listConfig) === null || _h === void 0 ? void 0 : _h.style;
    }
    get REST_FIELD_TYPES() {
        return REST_FIELD_TYPES;
    }
    get jsonValue() {
        try {
            if (!this.restField || !this.val) {
                throw new Error('Missing required data properties');
            }
            if (this.restField.i18n === true && this.restField.metaData && this.restField.metaData.addConfig.jsonConfig) {
                const selectedField = this.restField.metaData.addConfig.jsonConfig.jsonFields.find((field) => field === this.langService.selected);
                if (selectedField) {
                    if (typeof this.val === 'string' && this.val[0] === '{') {
                        const parsedData = JSON.parse(this.val);
                        if (parsedData[selectedField]) {
                            this._jsonValue = parsedData[selectedField];
                        }
                        else {
                            throw new Error('Invalid i18n language selected');
                        }
                    }
                    else if (typeof this.val === 'object' && this.val[selectedField]) {
                        this._jsonValue = this.val[selectedField];
                    }
                    else if (typeof this.val === 'string') {
                        this._jsonValue = this.val;
                    }
                    else {
                        throw new Error('Invalid data format for i18n field');
                    }
                }
                else {
                    throw new Error('Invalid i18n language selected');
                }
            }
            else {
                this._jsonValue = this.val;
            }
            if (typeof this._jsonValue === 'object') {
                this._jsonValue = JSON.stringify(this._jsonValue);
            }
        }
        catch (err) {
            // console.log(`Error occurred in jsonValue: ${err}`);
            this._jsonValue = JSON.stringify(this.val);
        }
        return this._jsonValue;
    }
}
RestResourceListFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.5", ngImport: i0, type: RestResourceListFieldComponent, deps: [{ token: i1.NbTreeGridDataSourceBuilder }, { token: i2.RestLangService }], target: i0.ɵɵFactoryTarget.Component });
RestResourceListFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.5", type: RestResourceListFieldComponent, selector: "ngx-rest-resource-list-field", inputs: { value: "value", rowData: "rowData" }, ngImport: i0, template: "<div\n  *ngIf=\"\n    restField.type == REST_FIELD_TYPES.TEXT ||\n    restField.type == REST_FIELD_TYPES.STRING ||\n    restField.type == REST_FIELD_TYPES.NUMBER ||\n    restField.type == REST_FIELD_TYPES.ENUM\n  \"\n>\n  <ng-container *ngIf=\"!restField.template\"> {{ val }}</ng-container>\n\n  <ng-container *ngIf=\"restField.template\">\n    <cng-html-compiler [template]=\"restField.template\" [componentClass]=\"val\">\n    </cng-html-compiler>\n  </ng-container>\n</div>\n\n<div *ngIf=\"restField.type == REST_FIELD_TYPES.BOOLEAN\" class=\"text-center\">\n  <ng-container *ngIf=\"!restField.template\">\n    <nb-checkbox [checked]=\"val\" [disabled]=\"true\"></nb-checkbox>\n  </ng-container>\n\n  <ng-container *ngIf=\"restField.template\">\n    <cng-html-compiler [template]=\"restField.template\" [componentClass]=\"val\">\n    </cng-html-compiler>\n  </ng-container>\n</div>\n\n<div\n  *ngIf=\"restField.type == REST_FIELD_TYPES.COLOR\"\n  style=\"height: 50px; display: flex\"\n>\n  <ng-container style=\"align-self: center\">{{ val }}</ng-container>\n  <input\n    style=\"height: 45px; width: 80px; margin-left: 5px\"\n    disabled=\"true\"\n    [placeholder]=\"val\"\n    [value]=\"val\"\n    type=\"color\"\n  />\n</div>\n\n<div *ngIf=\"restField.type == REST_FIELD_TYPES.IMAGE\" class=\"text-center\">\n  <ng-container *ngIf=\"!restField.template\">\n    <img class=\"rest-img\" [src]=\"val\" alt=\"\" [style]=\"style\"\n  /></ng-container>\n  <ng-container *ngIf=\"restField.template\">\n    <cng-html-compiler [template]=\"restField.template\" [componentClass]=\"val\">\n    </cng-html-compiler>\n  </ng-container>\n</div>\n\n<div *ngIf=\"restField.type == REST_FIELD_TYPES.HAS_ONE\">\n  <ng-container *ngIf=\"!restField.template\"> {{ val }}</ng-container>\n  <ng-container *ngIf=\"restField.template\">\n    <cng-html-compiler [template]=\"restField.template\" [componentClass]=\"val\">\n    </cng-html-compiler>\n  </ng-container>\n</div>\n\n<div *ngIf=\"restField.type == REST_FIELD_TYPES.BELONG_TO\">\n  <ng-container *ngIf=\"!restField.template\"> {{ val }}</ng-container>\n  <ng-container *ngIf=\"restField.template\">\n    <cng-html-compiler [template]=\"restField.template\" [componentClass]=\"val\">\n    </cng-html-compiler>\n  </ng-container>\n</div>\n\n<div *ngIf=\"restField.type == REST_FIELD_TYPES.MORPH\">\n  <ng-container *ngIf=\"!restField.template\"> {{ val }}</ng-container>\n  <ng-container *ngIf=\"restField.template\">\n    <cng-html-compiler [template]=\"restField.template\" [componentClass]=\"val\">\n    </cng-html-compiler>\n  </ng-container>\n</div>\n\n<div *ngIf=\"restField.type == REST_FIELD_TYPES.JSON\">\n  <ng-container *ngIf=\"!restField.template\"> {{ jsonValue }}</ng-container>\n  <ng-container *ngIf=\"restField.template\">\n    <cng-html-compiler\n      [template]=\"restField.template\"\n      [componentClass]=\"jsonValue\"\n    >\n    </cng-html-compiler>\n  </ng-container>\n</div>\n\n<div *ngIf=\"restField.type == REST_FIELD_TYPES.DATE\">\n  <ng-container *ngIf=\"!restField.template\"> {{ val }}</ng-container>\n  <ng-container *ngIf=\"restField.template\">\n    <cng-html-compiler [template]=\"restField.template\" [componentClass]=\"val\">\n    </cng-html-compiler>\n  </ng-container>\n</div>\n\n<div *ngIf=\"restField.type == REST_FIELD_TYPES.HAS_MANY\">\n  <table [nbTreeGrid]=\"dataSource\">\n    <tr nbTreeGridRow *nbTreeGridRowDef=\"let row; columns: allColumns\"></tr>\n\n    <ng-container [nbTreeGridColumnDef]=\"customColumn\">\n      <td nbTreeGridCell *nbTreeGridCellDef=\"let row\">\n        <ngx-fs-icon\n          [expanded]=\"row.expanded\"\n          [place]=\"row.data.place\"\n        ></ngx-fs-icon>\n        <ng-container\n          *ngIf=\"!restField?.metaData?.listConfig?.restManyResources.template\"\n        >\n          {{ row.data[customColumn] }}\n        </ng-container>\n\n        <ng-container\n          *ngIf=\"restField?.metaData?.listConfig?.restManyResources.template\"\n        >\n          <span *ngIf=\"row.data.place\">{{ restField.name }}</span>\n          <ng-container *ngIf=\"!row.data.place\">\n            <cng-html-compiler\n              [template]=\"\n                restField.metaData.listConfig.restManyResources.template\n              \"\n              [componentClass]=\"row.data.item\"\n            >\n            </cng-html-compiler>\n          </ng-container>\n        </ng-container>\n      </td>\n    </ng-container>\n  </table>\n</div>\n\n<div *ngIf=\"restField.type == REST_FIELD_TYPES.BELONG_TO_MANY\">\n  <table [nbTreeGrid]=\"dataSource\">\n    <tr nbTreeGridRow *nbTreeGridRowDef=\"let row; columns: allColumns\"></tr>\n\n    <ng-container [nbTreeGridColumnDef]=\"customColumn\">\n      <td nbTreeGridCell *nbTreeGridCellDef=\"let row\">\n        <ngx-fs-icon\n          [expanded]=\"row.expanded\"\n          [place]=\"row.data.place\"\n        ></ngx-fs-icon>\n        <ng-container\n          *ngIf=\"\n            !restField.metaData.listConfig.restBelongToManyResources.template\n          \"\n        >\n          {{ row.data[customColumn] }}\n        </ng-container>\n\n        <ng-container\n          *ngIf=\"\n            restField.metaData.listConfig.restBelongToManyResources.template\n          \"\n        >\n          <span *ngIf=\"row.data.place\">{{ restField.name }}</span>\n          <ng-container *ngIf=\"!row.data.place\">\n            <cng-html-compiler\n              [template]=\"\n                restField.metaData.listConfig.restBelongToManyResources.template\n              \"\n              [componentClass]=\"row.data.item\"\n            >\n            </cng-html-compiler>\n          </ng-container>\n        </ng-container>\n      </td>\n    </ng-container>\n  </table>\n</div>\n", styles: ["@use \"@nebular/theme/styles/themes/default\";.rest-img{max-width:100px}.nb-theme-default :host button[nbTreeGridRowToggle]{background:transparent;border:none;padding:0}.nb-theme-default :host .search-label{display:block}.nb-theme-default :host .search-input{margin-bottom:1rem}.nb-theme-default :host .nb-column-name{width:100%}.nb-theme-default :host ::ng-deep .row-toggle-button{color:#222b45}.nb-theme-default :host .nb-tree-grid-header-cell,.nb-theme-default :host .nb-tree-grid-header-cell button{text-transform:capitalize}@media screen and (min-width: 400px){.nb-theme-default :host .nb-column-name,.nb-theme-default :host .nb-column-size{width:50%}}@media screen and (min-width: 500px){.nb-theme-default :host .nb-column-name,.nb-theme-default :host .nb-column-size,.nb-theme-default :host .nb-column-kind{width:33.333%}}@media screen and (min-width: 600px){.nb-theme-default :host .nb-column-name{width:31%}.nb-theme-default :host .nb-column-size,.nb-theme-default :host .nb-column-kind,.nb-theme-default :host .nb-column-items{width:23%}}.nb-theme-dark :host button[nbTreeGridRowToggle]{background:transparent;border:none;padding:0}.nb-theme-dark :host .search-label{display:block}.nb-theme-dark :host .search-input{margin-bottom:1rem}.nb-theme-dark :host .nb-column-name{width:100%}.nb-theme-dark :host ::ng-deep .row-toggle-button{color:#fff}.nb-theme-dark :host .nb-tree-grid-header-cell,.nb-theme-dark :host .nb-tree-grid-header-cell button{text-transform:capitalize}@media screen and (min-width: 400px){.nb-theme-dark :host .nb-column-name,.nb-theme-dark :host .nb-column-size{width:50%}}@media screen and (min-width: 500px){.nb-theme-dark :host .nb-column-name,.nb-theme-dark :host .nb-column-size,.nb-theme-dark :host .nb-column-kind{width:33.333%}}@media screen and (min-width: 600px){.nb-theme-dark :host .nb-column-name{width:31%}.nb-theme-dark :host .nb-column-size,.nb-theme-dark :host .nb-column-kind,.nb-theme-dark :host .nb-column-items{width:23%}}.nb-theme-cosmic :host button[nbTreeGridRowToggle]{background:transparent;border:none;padding:0}.nb-theme-cosmic :host .search-label{display:block}.nb-theme-cosmic :host .search-input{margin-bottom:1rem}.nb-theme-cosmic :host .nb-column-name{width:100%}.nb-theme-cosmic :host ::ng-deep .row-toggle-button{color:#fff}.nb-theme-cosmic :host .nb-tree-grid-header-cell,.nb-theme-cosmic :host .nb-tree-grid-header-cell button{text-transform:capitalize}@media screen and (min-width: 400px){.nb-theme-cosmic :host .nb-column-name,.nb-theme-cosmic :host .nb-column-size{width:50%}}@media screen and (min-width: 500px){.nb-theme-cosmic :host .nb-column-name,.nb-theme-cosmic :host .nb-column-size,.nb-theme-cosmic :host .nb-column-kind{width:33.333%}}@media screen and (min-width: 600px){.nb-theme-cosmic :host .nb-column-name{width:31%}.nb-theme-cosmic :host .nb-column-size,.nb-theme-cosmic :host .nb-column-kind,.nb-theme-cosmic :host .nb-column-items{width:23%}}.nb-theme-corporate :host button[nbTreeGridRowToggle]{background:transparent;border:none;padding:0}.nb-theme-corporate :host .search-label{display:block}.nb-theme-corporate :host .search-input{margin-bottom:1rem}.nb-theme-corporate :host .nb-column-name{width:100%}.nb-theme-corporate :host ::ng-deep .row-toggle-button{color:#222b45}.nb-theme-corporate :host .nb-tree-grid-header-cell,.nb-theme-corporate :host .nb-tree-grid-header-cell button{text-transform:capitalize}@media screen and (min-width: 400px){.nb-theme-corporate :host .nb-column-name,.nb-theme-corporate :host .nb-column-size{width:50%}}@media screen and (min-width: 500px){.nb-theme-corporate :host .nb-column-name,.nb-theme-corporate :host .nb-column-size,.nb-theme-corporate :host .nb-column-kind{width:33.333%}}@media screen and (min-width: 600px){.nb-theme-corporate :host .nb-column-name{width:31%}.nb-theme-corporate :host .nb-column-size,.nb-theme-corporate :host .nb-column-kind,.nb-theme-corporate :host .nb-column-items{width:23%}}*{cursor:pointer}\n"], components: [{ type: i3.CngHtmlCompilerComponent, selector: "cng-html-compiler", inputs: ["template", "componentClass", "imports"] }, { type: i1.NbCheckboxComponent, selector: "nb-checkbox", inputs: ["status", "checked", "disabled", "indeterminate"], outputs: ["checkedChange"] }, { type: i1.NbTreeGridComponent, selector: "table[nbTreeGrid]", inputs: ["levelPadding", "nbTreeGrid", "equalColumnsWidth"] }, { type: i1.NbTreeGridRowComponent, selector: "tr[nbTreeGridRow]", inputs: ["doubleClickDelay", "clickToToggle"] }, { type: i4.FsIconCComponent, selector: "ngx-fs-icon", inputs: ["expanded", "place"] }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NbTreeGridRowDefDirective, selector: "[nbTreeGridRowDef]", inputs: ["nbTreeGridRowDefColumns"] }, { type: i1.NbTreeGridColumnDefDirective, selector: "[nbTreeGridColumnDef]", inputs: ["nbTreeGridColumnDef", "hideOn", "showOn"] }, { type: i1.NbTreeGridCellDefDirective, selector: "[nbTreeGridCellDef]" }, { type: i1.NbTreeGridCellDirective, selector: "td[nbTreeGridCell]" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.5", ngImport: i0, type: RestResourceListFieldComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ngx-rest-resource-list-field',
                    templateUrl: './rest.resource-list-field.component.html',
                    styleUrls: ['./rest.resource-list-field.component.scss'],
                }]
        }], ctorParameters: function () { return [{ type: i1.NbTreeGridDataSourceBuilder }, { type: i2.RestLangService }]; }, propDecorators: { value: [{
                type: Input
            }], rowData: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdC5yZXNvdXJjZS1saXN0LWZpZWxkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3Jlc3QtYWRtaW4vc3JjL2xpYi9yZXN0LWFkbWluL3Jlc3QtcmVzb3VyY2UvY29tcG9uZW50cy9yZXN0LnJlc291cmNlLWxpc3QtZmllbGQvcmVzdC5yZXNvdXJjZS1saXN0LWZpZWxkLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3Jlc3QtYWRtaW4vc3JjL2xpYi9yZXN0LWFkbWluL3Jlc3QtcmVzb3VyY2UvY29tcG9uZW50cy9yZXN0LnJlc291cmNlLWxpc3QtZmllbGQvcmVzdC5yZXNvdXJjZS1saXN0LWZpZWxkLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUE2QixNQUFNLGVBQWUsQ0FBQztBQUU1RSxPQUFPLEVBQWEsZ0JBQWdCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUUvRSxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQzs7Ozs7OztBQWE1QixNQUFNLE9BQU8sOEJBQThCO0lBZXpDLFlBQ1UsaUJBQW1ELEVBQ25ELFdBQTRCO1FBRDVCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0M7UUFDbkQsZ0JBQVcsR0FBWCxXQUFXLENBQWlCO1FBVHRDLGlCQUFZLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLGVBQVUsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQVM5QixDQUFDO0lBQ0osUUFBUTs7UUFDTixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUFT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QUNHLE9BQU87c0JBQWYsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFZpZXdDZWxsIH0gZnJvbSAnbmcyLXNtYXJ0LXRhYmxlJztcbmltcG9ydCB7IFJlc3RGaWVsZCwgUkVTVF9GSUVMRF9UWVBFUyB9IGZyb20gJy4uLy4uL21vZGVscy9yZXN0LXJlc291cmNlLm1vZGVsJztcbmltcG9ydCB7IFJlc3RMYW5nU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2UvcmVzdC1sYW5nLnNlcnZpY2UnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHtcbiAgTmJUcmVlR3JpZERhdGFTb3VyY2UsXG4gIE5iU29ydERpcmVjdGlvbixcbiAgTmJUcmVlR3JpZERhdGFTb3VyY2VCdWlsZGVyLFxuICBOYlNvcnRSZXF1ZXN0LFxufSBmcm9tICdAbmVidWxhci90aGVtZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25neC1yZXN0LXJlc291cmNlLWxpc3QtZmllbGQnLFxuICB0ZW1wbGF0ZVVybDogJy4vcmVzdC5yZXNvdXJjZS1saXN0LWZpZWxkLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcmVzdC5yZXNvdXJjZS1saXN0LWZpZWxkLmNvbXBvbmVudC5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIFJlc3RSZXNvdXJjZUxpc3RGaWVsZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgVmlld0NlbGwge1xuICBASW5wdXQoKSB2YWx1ZTogYW55O1xuICBASW5wdXQoKSByb3dEYXRhOiBhbnk7XG4gIHZhbDogYW55O1xuICByZXN0RmllbGQhOiBSZXN0RmllbGQ7XG4gIGNsYXNzITogc3RyaW5nO1xuICBzdHlsZSE6IHN0cmluZztcblxuICBjdXN0b21Db2x1bW4gPSAnbmFtZSc7XG4gIGFsbENvbHVtbnMgPSBbdGhpcy5jdXN0b21Db2x1bW5dO1xuICBkYXRhU291cmNlITogTmJUcmVlR3JpZERhdGFTb3VyY2U8YW55PjtcbiAgaW1hZ2U6IGFueTtcbiAgLy9qc29uIG9wdGlvbnNcbiAgX2pzb25WYWx1ZTogYW55O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZGF0YVNvdXJjZUJ1aWxkZXI6IE5iVHJlZUdyaWREYXRhU291cmNlQnVpbGRlcjxhbnk+LFxuICAgIHByaXZhdGUgbGFuZ1NlcnZpY2U6IFJlc3RMYW5nU2VydmljZVxuICApIHt9XG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMucmVzdEZpZWxkID0gdGhpcy52YWx1ZS5yZXN0RmllbGQ7XG4gICAgdGhpcy52YWwgPSBfLmdldCh0aGlzLnJvd0RhdGEsIHRoaXMucmVzdEZpZWxkLmxhYmVsKTtcbiAgICBzd2l0Y2ggKHRoaXMucmVzdEZpZWxkLnR5cGUpIHtcbiAgICAgIGNhc2UgUkVTVF9GSUVMRF9UWVBFUy5IQVNfTUFOWTpcbiAgICAgICAgY29uc3QgZGF0YXM6IGFueSA9IFtdO1xuXG4gICAgICAgIHRoaXMudmFsLmZvckVhY2goKGl0ZW06IGFueSkgPT4ge1xuICAgICAgICAgIGRhdGFzLnB1c2goe1xuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICBuYW1lOiB0aGlzLnJlc3RGaWVsZD8ubWV0YURhdGE/Lmxpc3RDb25maWc/LnJlc3RNYW55UmVzb3VyY2VzXG4gICAgICAgICAgICAgICAgLmxhYmVsXG4gICAgICAgICAgICAgICAgPyBpdGVtW1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3RGaWVsZC5tZXRhRGF0YS5saXN0Q29uZmlnLnJlc3RNYW55UmVzb3VyY2VzLmxhYmVsXG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgOiBpdGVtLFxuICAgICAgICAgICAgICBpdGVtLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3Qgcm93c1QgPSBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICBuYW1lOiB0aGlzLnJlc3RGaWVsZC5uYW1lLFxuICAgICAgICAgICAgICBwbGFjZTogJ2hlYWRlci1wbGFjZScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2hpbGRyZW46IGRhdGFzLFxuICAgICAgICAgIH0sXG4gICAgICAgIF07XG4gICAgICAgIHRoaXMuZGF0YVNvdXJjZSA9IHRoaXMuZGF0YVNvdXJjZUJ1aWxkZXIuY3JlYXRlKHJvd3NUKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgUkVTVF9GSUVMRF9UWVBFUy5CRUxPTkdfVE9fTUFOWTpcbiAgICAgICAgY29uc3QgaXRlbXM6IGFueSA9IFtdO1xuXG4gICAgICAgIHRoaXMudmFsLmZvckVhY2goKGl0ZW06IGFueSkgPT4ge1xuICAgICAgICAgIGl0ZW1zLnB1c2goe1xuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICBuYW1lOiBpdGVtW1xuICAgICAgICAgICAgICAgIHRoaXMucmVzdEZpZWxkLm1ldGFEYXRhLmxpc3RDb25maWcucmVzdEJlbG9uZ1RvTWFueVJlc291cmNlc1xuICAgICAgICAgICAgICAgICAgLmxhYmVsXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIGl0ZW0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCByb3dzQmVsb25nVG9NYW55ID0gW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgbmFtZTogdGhpcy5yZXN0RmllbGQubmFtZSxcbiAgICAgICAgICAgICAgcGxhY2U6ICdoZWFkZXItcGxhY2UnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNoaWxkcmVuOiBpdGVtcyxcbiAgICAgICAgICB9LFxuICAgICAgICBdO1xuICAgICAgICB0aGlzLmRhdGFTb3VyY2UgPSB0aGlzLmRhdGFTb3VyY2VCdWlsZGVyLmNyZWF0ZShyb3dzQmVsb25nVG9NYW55KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgUkVTVF9GSUVMRF9UWVBFUy5IQVNfT05FOlxuICAgICAgICBpZiAoXG4gICAgICAgICAgdGhpcy52YWwgJiZcbiAgICAgICAgICAhdGhpcy5yZXN0RmllbGQ/Lm1ldGFEYXRhPy5saXN0Q29uZmlnPy5yZXN0SGFzT25lUmVzb3VyY2VzPy50ZW1wbGF0ZVxuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLnZhbCA9XG4gICAgICAgICAgICB0aGlzLnZhbFtcbiAgICAgICAgICAgICAgdGhpcy5yZXN0RmllbGQubWV0YURhdGEubGlzdENvbmZpZy5yZXN0SGFzT25lUmVzb3VyY2VzLm5hbWVcbiAgICAgICAgICAgIF07XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFJFU1RfRklFTERfVFlQRVMuQ09MT1I6XG4gICAgICAgIGlmICghdGhpcy52YWwpIHtcbiAgICAgICAgICB0aGlzLnZhbCA9ICcjRTRFNEU0JztcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHRoaXMuY2xhc3MgPSB0aGlzLnJlc3RGaWVsZC5tZXRhRGF0YT8ubGlzdENvbmZpZz8uY2xhc3M7XG4gICAgdGhpcy5zdHlsZSA9IHRoaXMucmVzdEZpZWxkLm1ldGFEYXRhPy5saXN0Q29uZmlnPy5zdHlsZTtcbiAgfVxuXG4gIGdldCBSRVNUX0ZJRUxEX1RZUEVTKCkge1xuICAgIHJldHVybiBSRVNUX0ZJRUxEX1RZUEVTO1xuICB9XG4gIGdldCBqc29uVmFsdWUoKTogYW55IHtcbiAgICB0cnkge1xuICAgICAgaWYgKCF0aGlzLnJlc3RGaWVsZCB8fCAhdGhpcy52YWwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIHJlcXVpcmVkIGRhdGEgcHJvcGVydGllcycpO1xuICAgICAgfVxuICBcbiAgICAgIGlmICh0aGlzLnJlc3RGaWVsZC5pMThuID09PSB0cnVlICYmIHRoaXMucmVzdEZpZWxkLm1ldGFEYXRhICYmIHRoaXMucmVzdEZpZWxkLm1ldGFEYXRhLmFkZENvbmZpZy5qc29uQ29uZmlnKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkRmllbGQgPSB0aGlzLnJlc3RGaWVsZC5tZXRhRGF0YS5hZGRDb25maWcuanNvbkNvbmZpZy5qc29uRmllbGRzLmZpbmQoKGZpZWxkKSA9PiBmaWVsZCA9PT0gdGhpcy5sYW5nU2VydmljZS5zZWxlY3RlZCk7XG4gIFxuICAgICAgICBpZiAoc2VsZWN0ZWRGaWVsZCkge1xuICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy52YWwgPT09ICdzdHJpbmcnICYmIHRoaXMudmFsWzBdID09PSAneycpIHtcbiAgICAgICAgICAgIGNvbnN0IHBhcnNlZERhdGEgPSBKU09OLnBhcnNlKHRoaXMudmFsKTtcbiAgICAgICAgICAgIGlmIChwYXJzZWREYXRhW3NlbGVjdGVkRmllbGRdKSB7XG4gICAgICAgICAgICAgIHRoaXMuX2pzb25WYWx1ZSA9IHBhcnNlZERhdGFbc2VsZWN0ZWRGaWVsZF07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgaTE4biBsYW5ndWFnZSBzZWxlY3RlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMudmFsID09PSAnb2JqZWN0JyAmJiB0aGlzLnZhbFtzZWxlY3RlZEZpZWxkXSkge1xuICAgICAgICAgICAgdGhpcy5fanNvblZhbHVlID0gdGhpcy52YWxbc2VsZWN0ZWRGaWVsZF07XG4gICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy52YWwgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aGlzLl9qc29uVmFsdWUgPSB0aGlzLnZhbDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGRhdGEgZm9ybWF0IGZvciBpMThuIGZpZWxkJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBpMThuIGxhbmd1YWdlIHNlbGVjdGVkJyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2pzb25WYWx1ZSA9IHRoaXMudmFsO1xuICAgICAgfVxuICBcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5fanNvblZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICB0aGlzLl9qc29uVmFsdWUgPSBKU09OLnN0cmluZ2lmeSh0aGlzLl9qc29uVmFsdWUpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgLy8gY29uc29sZS5sb2coYEVycm9yIG9jY3VycmVkIGluIGpzb25WYWx1ZTogJHtlcnJ9YCk7XG4gICAgICB0aGlzLl9qc29uVmFsdWUgPSBKU09OLnN0cmluZ2lmeSh0aGlzLnZhbCk7XG4gICAgfVxuICBcbiAgICByZXR1cm4gdGhpcy5fanNvblZhbHVlO1xuICB9XG59XG4iLCI8ZGl2XG4gICpuZ0lmPVwiXG4gICAgcmVzdEZpZWxkLnR5cGUgPT0gUkVTVF9GSUVMRF9UWVBFUy5URVhUIHx8XG4gICAgcmVzdEZpZWxkLnR5cGUgPT0gUkVTVF9GSUVMRF9UWVBFUy5TVFJJTkcgfHxcbiAgICByZXN0RmllbGQudHlwZSA9PSBSRVNUX0ZJRUxEX1RZUEVTLk5VTUJFUiB8fFxuICAgIHJlc3RGaWVsZC50eXBlID09IFJFU1RfRklFTERfVFlQRVMuRU5VTVxuICBcIlxuPlxuICA8bmctY29udGFpbmVyICpuZ0lmPVwiIXJlc3RGaWVsZC50ZW1wbGF0ZVwiPiB7eyB2YWwgfX08L25nLWNvbnRhaW5lcj5cblxuICA8bmctY29udGFpbmVyICpuZ0lmPVwicmVzdEZpZWxkLnRlbXBsYXRlXCI+XG4gICAgPGNuZy1odG1sLWNvbXBpbGVyIFt0ZW1wbGF0ZV09XCJyZXN0RmllbGQudGVtcGxhdGVcIiBbY29tcG9uZW50Q2xhc3NdPVwidmFsXCI+XG4gICAgPC9jbmctaHRtbC1jb21waWxlcj5cbiAgPC9uZy1jb250YWluZXI+XG48L2Rpdj5cblxuPGRpdiAqbmdJZj1cInJlc3RGaWVsZC50eXBlID09IFJFU1RfRklFTERfVFlQRVMuQk9PTEVBTlwiIGNsYXNzPVwidGV4dC1jZW50ZXJcIj5cbiAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFyZXN0RmllbGQudGVtcGxhdGVcIj5cbiAgICA8bmItY2hlY2tib3ggW2NoZWNrZWRdPVwidmFsXCIgW2Rpc2FibGVkXT1cInRydWVcIj48L25iLWNoZWNrYm94PlxuICA8L25nLWNvbnRhaW5lcj5cblxuICA8bmctY29udGFpbmVyICpuZ0lmPVwicmVzdEZpZWxkLnRlbXBsYXRlXCI+XG4gICAgPGNuZy1odG1sLWNvbXBpbGVyIFt0ZW1wbGF0ZV09XCJyZXN0RmllbGQudGVtcGxhdGVcIiBbY29tcG9uZW50Q2xhc3NdPVwidmFsXCI+XG4gICAgPC9jbmctaHRtbC1jb21waWxlcj5cbiAgPC9uZy1jb250YWluZXI+XG48L2Rpdj5cblxuPGRpdlxuICAqbmdJZj1cInJlc3RGaWVsZC50eXBlID09IFJFU1RfRklFTERfVFlQRVMuQ09MT1JcIlxuICBzdHlsZT1cImhlaWdodDogNTBweDsgZGlzcGxheTogZmxleFwiXG4+XG4gIDxuZy1jb250YWluZXIgc3R5bGU9XCJhbGlnbi1zZWxmOiBjZW50ZXJcIj57eyB2YWwgfX08L25nLWNvbnRhaW5lcj5cbiAgPGlucHV0XG4gICAgc3R5bGU9XCJoZWlnaHQ6IDQ1cHg7IHdpZHRoOiA4MHB4OyBtYXJnaW4tbGVmdDogNXB4XCJcbiAgICBkaXNhYmxlZD1cInRydWVcIlxuICAgIFtwbGFjZWhvbGRlcl09XCJ2YWxcIlxuICAgIFt2YWx1ZV09XCJ2YWxcIlxuICAgIHR5cGU9XCJjb2xvclwiXG4gIC8+XG48L2Rpdj5cblxuPGRpdiAqbmdJZj1cInJlc3RGaWVsZC50eXBlID09IFJFU1RfRklFTERfVFlQRVMuSU1BR0VcIiBjbGFzcz1cInRleHQtY2VudGVyXCI+XG4gIDxuZy1jb250YWluZXIgKm5nSWY9XCIhcmVzdEZpZWxkLnRlbXBsYXRlXCI+XG4gICAgPGltZyBjbGFzcz1cInJlc3QtaW1nXCIgW3NyY109XCJ2YWxcIiBhbHQ9XCJcIiBbc3R5bGVdPVwic3R5bGVcIlxuICAvPjwvbmctY29udGFpbmVyPlxuICA8bmctY29udGFpbmVyICpuZ0lmPVwicmVzdEZpZWxkLnRlbXBsYXRlXCI+XG4gICAgPGNuZy1odG1sLWNvbXBpbGVyIFt0ZW1wbGF0ZV09XCJyZXN0RmllbGQudGVtcGxhdGVcIiBbY29tcG9uZW50Q2xhc3NdPVwidmFsXCI+XG4gICAgPC9jbmctaHRtbC1jb21waWxlcj5cbiAgPC9uZy1jb250YWluZXI+XG48L2Rpdj5cblxuPGRpdiAqbmdJZj1cInJlc3RGaWVsZC50eXBlID09IFJFU1RfRklFTERfVFlQRVMuSEFTX09ORVwiPlxuICA8bmctY29udGFpbmVyICpuZ0lmPVwiIXJlc3RGaWVsZC50ZW1wbGF0ZVwiPiB7eyB2YWwgfX08L25nLWNvbnRhaW5lcj5cbiAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInJlc3RGaWVsZC50ZW1wbGF0ZVwiPlxuICAgIDxjbmctaHRtbC1jb21waWxlciBbdGVtcGxhdGVdPVwicmVzdEZpZWxkLnRlbXBsYXRlXCIgW2NvbXBvbmVudENsYXNzXT1cInZhbFwiPlxuICAgIDwvY25nLWh0bWwtY29tcGlsZXI+XG4gIDwvbmctY29udGFpbmVyPlxuPC9kaXY+XG5cbjxkaXYgKm5nSWY9XCJyZXN0RmllbGQudHlwZSA9PSBSRVNUX0ZJRUxEX1RZUEVTLkJFTE9OR19UT1wiPlxuICA8bmctY29udGFpbmVyICpuZ0lmPVwiIXJlc3RGaWVsZC50ZW1wbGF0ZVwiPiB7eyB2YWwgfX08L25nLWNvbnRhaW5lcj5cbiAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInJlc3RGaWVsZC50ZW1wbGF0ZVwiPlxuICAgIDxjbmctaHRtbC1jb21waWxlciBbdGVtcGxhdGVdPVwicmVzdEZpZWxkLnRlbXBsYXRlXCIgW2NvbXBvbmVudENsYXNzXT1cInZhbFwiPlxuICAgIDwvY25nLWh0bWwtY29tcGlsZXI+XG4gIDwvbmctY29udGFpbmVyPlxuPC9kaXY+XG5cbjxkaXYgKm5nSWY9XCJyZXN0RmllbGQudHlwZSA9PSBSRVNUX0ZJRUxEX1RZUEVTLk1PUlBIXCI+XG4gIDxuZy1jb250YWluZXIgKm5nSWY9XCIhcmVzdEZpZWxkLnRlbXBsYXRlXCI+IHt7IHZhbCB9fTwvbmctY29udGFpbmVyPlxuICA8bmctY29udGFpbmVyICpuZ0lmPVwicmVzdEZpZWxkLnRlbXBsYXRlXCI+XG4gICAgPGNuZy1odG1sLWNvbXBpbGVyIFt0ZW1wbGF0ZV09XCJyZXN0RmllbGQudGVtcGxhdGVcIiBbY29tcG9uZW50Q2xhc3NdPVwidmFsXCI+XG4gICAgPC9jbmctaHRtbC1jb21waWxlcj5cbiAgPC9uZy1jb250YWluZXI+XG48L2Rpdj5cblxuPGRpdiAqbmdJZj1cInJlc3RGaWVsZC50eXBlID09IFJFU1RfRklFTERfVFlQRVMuSlNPTlwiPlxuICA8bmctY29udGFpbmVyICpuZ0lmPVwiIXJlc3RGaWVsZC50ZW1wbGF0ZVwiPiB7eyBqc29uVmFsdWUgfX08L25nLWNvbnRhaW5lcj5cbiAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInJlc3RGaWVsZC50ZW1wbGF0ZVwiPlxuICAgIDxjbmctaHRtbC1jb21waWxlclxuICAgICAgW3RlbXBsYXRlXT1cInJlc3RGaWVsZC50ZW1wbGF0ZVwiXG4gICAgICBbY29tcG9uZW50Q2xhc3NdPVwianNvblZhbHVlXCJcbiAgICA+XG4gICAgPC9jbmctaHRtbC1jb21waWxlcj5cbiAgPC9uZy1jb250YWluZXI+XG48L2Rpdj5cblxuPGRpdiAqbmdJZj1cInJlc3RGaWVsZC50eXBlID09IFJFU1RfRklFTERfVFlQRVMuREFURVwiPlxuICA8bmctY29udGFpbmVyICpuZ0lmPVwiIXJlc3RGaWVsZC50ZW1wbGF0ZVwiPiB7eyB2YWwgfX08L25nLWNvbnRhaW5lcj5cbiAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInJlc3RGaWVsZC50ZW1wbGF0ZVwiPlxuICAgIDxjbmctaHRtbC1jb21waWxlciBbdGVtcGxhdGVdPVwicmVzdEZpZWxkLnRlbXBsYXRlXCIgW2NvbXBvbmVudENsYXNzXT1cInZhbFwiPlxuICAgIDwvY25nLWh0bWwtY29tcGlsZXI+XG4gIDwvbmctY29udGFpbmVyPlxuPC9kaXY+XG5cbjxkaXYgKm5nSWY9XCJyZXN0RmllbGQudHlwZSA9PSBSRVNUX0ZJRUxEX1RZUEVTLkhBU19NQU5ZXCI+XG4gIDx0YWJsZSBbbmJUcmVlR3JpZF09XCJkYXRhU291cmNlXCI+XG4gICAgPHRyIG5iVHJlZUdyaWRSb3cgKm5iVHJlZUdyaWRSb3dEZWY9XCJsZXQgcm93OyBjb2x1bW5zOiBhbGxDb2x1bW5zXCI+PC90cj5cblxuICAgIDxuZy1jb250YWluZXIgW25iVHJlZUdyaWRDb2x1bW5EZWZdPVwiY3VzdG9tQ29sdW1uXCI+XG4gICAgICA8dGQgbmJUcmVlR3JpZENlbGwgKm5iVHJlZUdyaWRDZWxsRGVmPVwibGV0IHJvd1wiPlxuICAgICAgICA8bmd4LWZzLWljb25cbiAgICAgICAgICBbZXhwYW5kZWRdPVwicm93LmV4cGFuZGVkXCJcbiAgICAgICAgICBbcGxhY2VdPVwicm93LmRhdGEucGxhY2VcIlxuICAgICAgICA+PC9uZ3gtZnMtaWNvbj5cbiAgICAgICAgPG5nLWNvbnRhaW5lclxuICAgICAgICAgICpuZ0lmPVwiIXJlc3RGaWVsZD8ubWV0YURhdGE/Lmxpc3RDb25maWc/LnJlc3RNYW55UmVzb3VyY2VzLnRlbXBsYXRlXCJcbiAgICAgICAgPlxuICAgICAgICAgIHt7IHJvdy5kYXRhW2N1c3RvbUNvbHVtbl0gfX1cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgICAgPG5nLWNvbnRhaW5lclxuICAgICAgICAgICpuZ0lmPVwicmVzdEZpZWxkPy5tZXRhRGF0YT8ubGlzdENvbmZpZz8ucmVzdE1hbnlSZXNvdXJjZXMudGVtcGxhdGVcIlxuICAgICAgICA+XG4gICAgICAgICAgPHNwYW4gKm5nSWY9XCJyb3cuZGF0YS5wbGFjZVwiPnt7IHJlc3RGaWVsZC5uYW1lIH19PC9zcGFuPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhcm93LmRhdGEucGxhY2VcIj5cbiAgICAgICAgICAgIDxjbmctaHRtbC1jb21waWxlclxuICAgICAgICAgICAgICBbdGVtcGxhdGVdPVwiXG4gICAgICAgICAgICAgICAgcmVzdEZpZWxkLm1ldGFEYXRhLmxpc3RDb25maWcucmVzdE1hbnlSZXNvdXJjZXMudGVtcGxhdGVcbiAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgW2NvbXBvbmVudENsYXNzXT1cInJvdy5kYXRhLml0ZW1cIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgPC9jbmctaHRtbC1jb21waWxlcj5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8L3RkPlxuICAgIDwvbmctY29udGFpbmVyPlxuICA8L3RhYmxlPlxuPC9kaXY+XG5cbjxkaXYgKm5nSWY9XCJyZXN0RmllbGQudHlwZSA9PSBSRVNUX0ZJRUxEX1RZUEVTLkJFTE9OR19UT19NQU5ZXCI+XG4gIDx0YWJsZSBbbmJUcmVlR3JpZF09XCJkYXRhU291cmNlXCI+XG4gICAgPHRyIG5iVHJlZUdyaWRSb3cgKm5iVHJlZUdyaWRSb3dEZWY9XCJsZXQgcm93OyBjb2x1bW5zOiBhbGxDb2x1bW5zXCI+PC90cj5cblxuICAgIDxuZy1jb250YWluZXIgW25iVHJlZUdyaWRDb2x1bW5EZWZdPVwiY3VzdG9tQ29sdW1uXCI+XG4gICAgICA8dGQgbmJUcmVlR3JpZENlbGwgKm5iVHJlZUdyaWRDZWxsRGVmPVwibGV0IHJvd1wiPlxuICAgICAgICA8bmd4LWZzLWljb25cbiAgICAgICAgICBbZXhwYW5kZWRdPVwicm93LmV4cGFuZGVkXCJcbiAgICAgICAgICBbcGxhY2VdPVwicm93LmRhdGEucGxhY2VcIlxuICAgICAgICA+PC9uZ3gtZnMtaWNvbj5cbiAgICAgICAgPG5nLWNvbnRhaW5lclxuICAgICAgICAgICpuZ0lmPVwiXG4gICAgICAgICAgICAhcmVzdEZpZWxkLm1ldGFEYXRhLmxpc3RDb25maWcucmVzdEJlbG9uZ1RvTWFueVJlc291cmNlcy50ZW1wbGF0ZVxuICAgICAgICAgIFwiXG4gICAgICAgID5cbiAgICAgICAgICB7eyByb3cuZGF0YVtjdXN0b21Db2x1bW5dIH19XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgICAqbmdJZj1cIlxuICAgICAgICAgICAgcmVzdEZpZWxkLm1ldGFEYXRhLmxpc3RDb25maWcucmVzdEJlbG9uZ1RvTWFueVJlc291cmNlcy50ZW1wbGF0ZVxuICAgICAgICAgIFwiXG4gICAgICAgID5cbiAgICAgICAgICA8c3BhbiAqbmdJZj1cInJvdy5kYXRhLnBsYWNlXCI+e3sgcmVzdEZpZWxkLm5hbWUgfX08L3NwYW4+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFyb3cuZGF0YS5wbGFjZVwiPlxuICAgICAgICAgICAgPGNuZy1odG1sLWNvbXBpbGVyXG4gICAgICAgICAgICAgIFt0ZW1wbGF0ZV09XCJcbiAgICAgICAgICAgICAgICByZXN0RmllbGQubWV0YURhdGEubGlzdENvbmZpZy5yZXN0QmVsb25nVG9NYW55UmVzb3VyY2VzLnRlbXBsYXRlXG4gICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgIFtjb21wb25lbnRDbGFzc109XCJyb3cuZGF0YS5pdGVtXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgIDwvY25nLWh0bWwtY29tcGlsZXI+XG4gICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPC90ZD5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgPC90YWJsZT5cbjwvZGl2PlxuIl19