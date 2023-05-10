import { REST_FIELD_TYPES, TYPE_GROUP, TYPE_METHOD_REQUEST, } from './rest-resource.model';
export class RestResource {
    constructor(mainConfig, fields, listConfig, addConfig, editConfig, detailConfig) {
        this._hasFile = false;
        this._name = mainConfig.name;
        this._icon = mainConfig.icon;
        this._description = mainConfig.description;
        this._api = mainConfig.api;
        this._authRequired = mainConfig.authRequired;
        this._showInMenu = mainConfig.showInMenu;
        this._fields = fields;
        this._listConfig = listConfig;
        this._addConfig = addConfig;
        this._editConfig = editConfig;
        this._detailConfig = detailConfig;
    }
    // Getters
    get name() {
        return this._name;
    }
    get api() {
        return this._api == null ? this.name.toLowerCase() + 's' : this._api;
    }
    get authRequired() {
        return this._authRequired == null ? false : this._authRequired;
    }
    get showInMenu() {
        return this._showInMenu == null ? true : this._showInMenu;
    }
    get icon() {
        if (this._icon == null)
            return 'browser-outline';
        else if (typeof this._icon == 'string')
            return this._icon;
        else
            return { icon: this._icon.icon, pack: this._icon.pack };
    }
    get fields() {
        return this._fields.map((field) => {
            var _a;
            return ({
                name: field.name,
                type: field.type ? field.type : REST_FIELD_TYPES.STRING,
                note: field.note ? field.note : '',
                label: field.label ? field.label : field.name,
                inForm: field.inForm !== undefined ? field.inForm : true,
                metaData: ((_a = field.metaData) === null || _a === void 0 ? void 0 : _a.attributes) !== undefined
                    ? field.metaData
                    : Object.assign(Object.assign({}, field === null || field === void 0 ? void 0 : field.metaData), { attributes: {} }),
                i18n: field.i18n !== undefined ? field.i18n : false,
            });
        });
    }
    get hasFile() {
        return (this.fields.findIndex((field) => [
            REST_FIELD_TYPES.IMAGE,
            REST_FIELD_TYPES.PDF,
            REST_FIELD_TYPES.FILE,
        ].includes(field.type)) >= 0);
    }
    get permissions() {
        return this._permissions == null ? [] : this._permissions;
    }
    // Defini afin de tester les valeurs des metadatas
    // get metaData(): REST_FIELD_METADATA {
    //   const metaData: REST_FIELD_METADATA = {};
    //   this._fields.forEach((field) => {
    //     if (field.metaData && field.metaData.addConfig) {
    //       if (field.metaData.addConfig.mapConfig) {
    //         metaData.addConfig.mapConfig.lattiudeKeyField = field.metaData
    //           .addConfig.mapConfig.lattiudeKeyField
    //           ? field.metaData.addConfig.mapConfig.lattiudeKeyField
    //           : 'latitude';
    //         metaData.addConfig.mapConfig.longitudeKeyField = field.metaData
    //           .addConfig.mapConfig.longitudeKeyField
    //           ? field.metaData.addConfig.mapConfig.longitudeKeyField
    //           : 'longitude';
    //       }
    //     }
    //     switch (metaData.addConfig) {
    //       // case metaData.addConfig?.belongToOptions:
    //       //   metaData.addConfig.belongToOptions = {
    //       //     ...metaData.addConfig?.belongToOptions,
    //       //     value: field?.metaData?.addConfig.belongToOptions?.value
    //       //       ? field?.metaData?.addConfig?.belongToOptions?.value
    //       //       : "id",
    //       //     template: field.metaData.addConfig.belongToOptions.template
    //       //       ? field.metaData.addConfig.belongToOptions.template
    //       //       : field.metaData.addConfig.belongToOptions.filterKeys[0],
    //       //     filterKeys: field.metaData.addConfig.belongToOptions.filterKeys
    //       //       ? field.metaData.addConfig.belongToOptions.filterKeys
    //       //       : ["name"],
    //       //   };
    //       //   break;
    //       default:
    //         break;
    //     }
    //   });
    //   return metaData;
    // }
    get listConfig() {
        const rest = {};
        if (this._listConfig.columns)
            rest.columns = this._listConfig.columns;
        else {
            rest.columns = this.fields.reduce((cumul, item) => {
                cumul.push(item.name);
                return cumul;
            }, []);
        }
        rest.api = this._listConfig.api ? this._listConfig.api : this.api;
        rest.group = this._listConfig.group ? this._listConfig.group : null;
        rest.hideAddSubHeader = this._listConfig.hideAddSubHeader
            ? this._listConfig.hideAddSubHeader
            : false;
        rest.queryParams = this._listConfig.queryParams
            ? this._listConfig.queryParams
            : this.queryParams;
        rest.description = this._listConfig.description
            ? this._listConfig.description
            : 'list of ' + this.name;
        rest.perPage = this._listConfig.perPage ? this._listConfig.perPage : 25;
        rest.title = this._listConfig.title
            ? this._listConfig.title
            : 'List of ' + this.name;
        rest.searchFilter = this._listConfig.searchFilter
            ? this._listConfig.searchFilter
            : { filterBy: [] };
        if (rest.group) {
            rest.group = this._listConfig.group;
            rest.group.priority = rest.group.priority ? rest.group.priority : 0;
            rest.group.icon = rest.group.icon ? rest.group.icon : 'folder-outline';
        }
        else
            rest.group = {
                priority: 0,
                name: 'default',
                type: TYPE_GROUP.DEFAULT,
            };
        return rest;
    }
    get addConfig() {
        const rest = {};
        rest.api = this._addConfig.api ? this._addConfig.api : this.api;
        rest.title = this._addConfig.title
            ? this._addConfig.title
            : 'Add ' + this.name;
        rest.method = this._addConfig.method
            ? this._addConfig.method
            : TYPE_METHOD_REQUEST.POST;
        rest.body = this._addConfig.body ? this._addConfig.body : {};
        rest.header = this._addConfig.header ? this._addConfig.header : {};
        return rest;
    }
    get editConfig() {
        const rest = {};
        rest.api = this._editConfig.api ? this._editConfig.api : this.api;
        rest.isLaravel = this._editConfig.isLaravel
            ? this._editConfig.isLaravel
            : false;
        this._hasFile = this.hasFile;
        rest.method = this._editConfig.method
            ? this._editConfig.method
            : TYPE_METHOD_REQUEST.POST;
        rest.body = this._editConfig.body ? this._editConfig.body : {};
        rest.header = this._editConfig.header ? this._editConfig.header : {};
        rest.title = this._editConfig.title
            ? this._editConfig.title
            : 'Edit ' + this.name;
        rest.queryParams = this._editConfig.queryParams
            ? this._editConfig.queryParams
            : this.queryParams;
        return rest;
    }
    get detailConfig() {
        const rest = {};
        rest.api = this._detailConfig.api ? this._detailConfig.api : this.api;
        rest.title = this._detailConfig.title ? this._detailConfig.title : '';
        rest.tabsConfig = this._detailConfig.tabsConfig
            ? this._detailConfig.tabsConfig
            : null;
        rest.queryParams = this._detailConfig.queryParams
            ? this._detailConfig.queryParams
            : this.queryParams;
        rest.preparedStatementQuery = this._detailConfig.preparedStatementQuery
            ? this._detailConfig.preparedStatementQuery
            : null;
        return rest;
    }
    get description() {
        return this._description == null
            ? 'manage ' + this.name
            : this._description;
    }
    get queryParams() {
        return this._queryParams == null ? {} : this._queryParams;
    }
    // Setters
    set name(v) {
        this._name = v;
    }
    set fields(v) {
        this._fields = v;
    }
    set listConfig(v) {
        this._listConfig = v;
    }
    set editConfig(v) {
        this._editConfig = v;
    }
    set detailConfig(v) {
        this._detailConfig = v;
    }
    set api(v) {
        this._api = v;
    }
    set icon(v) {
        this._icon = v;
    }
    set description(v) {
        this._description = v;
    }
    set queryParams(v) {
        this._queryParams = v;
    }
    set authRequired(v) {
        this._authRequired = v;
    }
    set showInMenu(v) {
        this._showInMenu = v;
    }
    set permissions(v) {
        this._permissions = v;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdC1yZXNvdXJjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3Jlc3QtYWRtaW4vc3JjL2xpYi9yZXN0LWFkbWluL3Jlc3QtcmVzb3VyY2UvbW9kZWxzL3Jlc3QtcmVzb3VyY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUdMLGdCQUFnQixFQU9oQixVQUFVLEVBQ1YsbUJBQW1CLEdBQ3BCLE1BQU0sdUJBQXVCLENBQUM7QUFFL0IsTUFBTSxPQUFPLFlBQVk7SUFrQnZCLFlBQ0UsVUFBc0IsRUFDdEIsTUFBbUIsRUFDbkIsVUFBc0IsRUFDdEIsU0FBb0IsRUFDcEIsVUFBc0IsRUFDdEIsWUFBMEI7UUFsQnBCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFvQnZCLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztRQUM3QixJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUM7UUFDN0IsSUFBSSxDQUFDLFlBQVksR0FBRyxVQUFVLENBQUMsV0FBVyxDQUFDO1FBQzNDLElBQUksQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQztRQUMzQixJQUFJLENBQUMsYUFBYSxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUM7UUFDN0MsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDO1FBRXpDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO1FBQzlCLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQzVCLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO1FBQzlCLElBQUksQ0FBQyxhQUFhLEdBQUcsWUFBWSxDQUFDO0lBQ3BDLENBQUM7SUFFRCxVQUFVO0lBRVYsSUFBSSxJQUFJO1FBQ04sT0FBTyxJQUFJLENBQUMsS0FB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LENBQXNCO1FBQzdCLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxJQUFJLFdBQVcsQ0FBQyxDQUFTO1FBQ3ZCLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxJQUFJLFdBQVcsQ0FBQyxDQUFNO1FBQ3BCLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxJQUFJLFlBQVksQ0FBQyxDQUFVO1FBQ3pCLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFRCxJQUFJLFVBQVUsQ0FBQyxDQUFVO1FBQ3ZCLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxJQUFJLFdBQVcsQ0FBQyxDQUFXO1FBQ3pCLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO0lBQ3hCLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIFJlc3RGaWVsZCxcbiAgTGlzdENvbmZpZyxcbiAgUkVTVF9GSUVMRF9UWVBFUyxcbiAgQWRkQ29uZmlnLFxuICBSRVNUX0ZJRUxEX01FVEFEQVRBLFxuICBNYWluQ29uZmlnLFxuICBFZGl0Q29uZmlnLFxuICBDdXN0b21JY29uLFxuICBEZXRhaWxDb25maWcsXG4gIFRZUEVfR1JPVVAsXG4gIFRZUEVfTUVUSE9EX1JFUVVFU1QsXG59IGZyb20gJy4vcmVzdC1yZXNvdXJjZS5tb2RlbCc7XG5cbmV4cG9ydCBjbGFzcyBSZXN0UmVzb3VyY2Uge1xuICBwcml2YXRlIF9hcGk6IHN0cmluZztcbiAgcHJpdmF0ZSBfZGVzY3JpcHRpb246IHN0cmluZztcbiAgcHJpdmF0ZSBfaWNvbjogc3RyaW5nIHwgQ3VzdG9tSWNvbjtcbiAgcHJpdmF0ZSBfbmFtZTogc3RyaW5nO1xuICBwcml2YXRlIF9hdXRoUmVxdWlyZWQ6IGJvb2xlYW47XG4gIHByaXZhdGUgX2hhc0ZpbGUgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfc2hvd0luTWVudTogYm9vbGVhbjtcbiAgcHJpdmF0ZSBfcGVybWlzc2lvbnM6IHN0cmluZ1tdO1xuXG4gIHByaXZhdGUgX2ZpZWxkczogUmVzdEZpZWxkW107XG4gIHByaXZhdGUgX2xpc3RDb25maWc6IExpc3RDb25maWc7XG4gIHByaXZhdGUgX2FkZENvbmZpZzogQWRkQ29uZmlnO1xuICBwcml2YXRlIF9lZGl0Q29uZmlnOiBFZGl0Q29uZmlnO1xuICBwcml2YXRlIF9kZXRhaWxDb25maWc6IERldGFpbENvbmZpZztcblxuICBwcml2YXRlIF9xdWVyeVBhcmFtczogYW55O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIG1haW5Db25maWc6IE1haW5Db25maWcsXG4gICAgZmllbGRzOiBSZXN0RmllbGRbXSxcbiAgICBsaXN0Q29uZmlnOiBMaXN0Q29uZmlnLFxuICAgIGFkZENvbmZpZzogQWRkQ29uZmlnLFxuICAgIGVkaXRDb25maWc6IEVkaXRDb25maWcsXG4gICAgZGV0YWlsQ29uZmlnOiBEZXRhaWxDb25maWdcbiAgKSB7XG4gICAgdGhpcy5fbmFtZSA9IG1haW5Db25maWcubmFtZTtcbiAgICB0aGlzLl9pY29uID0gbWFpbkNvbmZpZy5pY29uO1xuICAgIHRoaXMuX2Rlc2NyaXB0aW9uID0gbWFpbkNvbmZpZy5kZXNjcmlwdGlvbjtcbiAgICB0aGlzLl9hcGkgPSBtYWluQ29uZmlnLmFwaTtcbiAgICB0aGlzLl9hdXRoUmVxdWlyZWQgPSBtYWluQ29uZmlnLmF1dGhSZXF1aXJlZDtcbiAgICB0aGlzLl9zaG93SW5NZW51ID0gbWFpbkNvbmZpZy5zaG93SW5NZW51O1xuXG4gICAgdGhpcy5fZmllbGRzID0gZmllbGRzO1xuICAgIHRoaXMuX2xpc3RDb25maWcgPSBsaXN0Q29uZmlnO1xuICAgIHRoaXMuX2FkZENvbmZpZyA9IGFkZENvbmZpZztcbiAgICB0aGlzLl9lZGl0Q29uZmlnID0gZWRpdENvbmZpZztcbiAgICB0aGlzLl9kZXRhaWxDb25maWcgPSBkZXRhaWxDb25maWc7XG4gIH1cblxuICAvLyBHZXR0ZXJzXG5cbiAgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgfVxuXG4gIGdldCBhcGkoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fYXBpID09IG51bGwgPyB0aGlzLm5hbWUudG9Mb3dlckNhc2UoKSArICdzJyA6IHRoaXMuX2FwaTtcbiAgfVxuXG4gIGdldCBhdXRoUmVxdWlyZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2F1dGhSZXF1aXJlZCA9PSBudWxsID8gZmFsc2UgOiB0aGlzLl9hdXRoUmVxdWlyZWQ7XG4gIH1cblxuICBnZXQgc2hvd0luTWVudSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc2hvd0luTWVudSA9PSBudWxsID8gdHJ1ZSA6IHRoaXMuX3Nob3dJbk1lbnU7XG4gIH1cblxuICBnZXQgaWNvbigpOiBzdHJpbmcgfCBDdXN0b21JY29uIHtcbiAgICBpZiAodGhpcy5faWNvbiA9PSBudWxsKSByZXR1cm4gJ2Jyb3dzZXItb3V0bGluZSc7XG4gICAgZWxzZSBpZiAodHlwZW9mIHRoaXMuX2ljb24gPT0gJ3N0cmluZycpIHJldHVybiB0aGlzLl9pY29uO1xuICAgIGVsc2UgcmV0dXJuIHsgaWNvbjogdGhpcy5faWNvbi5pY29uLCBwYWNrOiB0aGlzLl9pY29uLnBhY2sgfTtcbiAgfVxuXG4gIGdldCBmaWVsZHMoKTogUmVzdEZpZWxkW10ge1xuICAgIHJldHVybiB0aGlzLl9maWVsZHMubWFwKChmaWVsZCkgPT4gKHtcbiAgICAgIG5hbWU6IGZpZWxkLm5hbWUsXG4gICAgICB0eXBlOiBmaWVsZC50eXBlID8gZmllbGQudHlwZSA6IFJFU1RfRklFTERfVFlQRVMuU1RSSU5HLFxuICAgICAgbm90ZTogZmllbGQubm90ZSA/IGZpZWxkLm5vdGUgOiAnJyxcbiAgICAgIGxhYmVsOiBmaWVsZC5sYWJlbCA/IGZpZWxkLmxhYmVsIDogZmllbGQubmFtZSxcbiAgICAgIGluRm9ybTogZmllbGQuaW5Gb3JtICE9PSB1bmRlZmluZWQgPyBmaWVsZC5pbkZvcm0gOiB0cnVlLFxuICAgICAgbWV0YURhdGE6XG4gICAgICAgIGZpZWxkLm1ldGFEYXRhPy5hdHRyaWJ1dGVzICE9PSB1bmRlZmluZWRcbiAgICAgICAgICA/IGZpZWxkLm1ldGFEYXRhXG4gICAgICAgICAgOiB7IC4uLmZpZWxkPy5tZXRhRGF0YSwgYXR0cmlidXRlczoge30gfSxcbiAgICAgIGkxOG46IGZpZWxkLmkxOG4gIT09IHVuZGVmaW5lZCA/IGZpZWxkLmkxOG4gOiBmYWxzZSxcbiAgICB9KSk7XG4gIH1cblxuICBnZXQgaGFzRmlsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5maWVsZHMuZmluZEluZGV4KChmaWVsZCkgPT5cbiAgICAgICAgW1xuICAgICAgICAgIFJFU1RfRklFTERfVFlQRVMuSU1BR0UsXG4gICAgICAgICAgUkVTVF9GSUVMRF9UWVBFUy5QREYsXG4gICAgICAgICAgUkVTVF9GSUVMRF9UWVBFUy5GSUxFLFxuICAgICAgICBdLmluY2x1ZGVzKGZpZWxkLnR5cGUpXG4gICAgICApID49IDBcbiAgICApO1xuICB9XG5cbiAgZ2V0IHBlcm1pc3Npb25zKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5fcGVybWlzc2lvbnMgPT0gbnVsbCA/IFtdIDogdGhpcy5fcGVybWlzc2lvbnM7XG4gIH1cblxuICAvLyBEZWZpbmkgYWZpbiBkZSB0ZXN0ZXIgbGVzIHZhbGV1cnMgZGVzIG1ldGFkYXRhc1xuICAvLyBnZXQgbWV0YURhdGEoKTogUkVTVF9GSUVMRF9NRVRBREFUQSB7XG4gIC8vICAgY29uc3QgbWV0YURhdGE6IFJFU1RfRklFTERfTUVUQURBVEEgPSB7fTtcblxuICAvLyAgIHRoaXMuX2ZpZWxkcy5mb3JFYWNoKChmaWVsZCkgPT4ge1xuICAvLyAgICAgaWYgKGZpZWxkLm1ldGFEYXRhICYmIGZpZWxkLm1ldGFEYXRhLmFkZENvbmZpZykge1xuICAvLyAgICAgICBpZiAoZmllbGQubWV0YURhdGEuYWRkQ29uZmlnLm1hcENvbmZpZykge1xuICAvLyAgICAgICAgIG1ldGFEYXRhLmFkZENvbmZpZy5tYXBDb25maWcubGF0dGl1ZGVLZXlGaWVsZCA9IGZpZWxkLm1ldGFEYXRhXG4gIC8vICAgICAgICAgICAuYWRkQ29uZmlnLm1hcENvbmZpZy5sYXR0aXVkZUtleUZpZWxkXG4gIC8vICAgICAgICAgICA/IGZpZWxkLm1ldGFEYXRhLmFkZENvbmZpZy5tYXBDb25maWcubGF0dGl1ZGVLZXlGaWVsZFxuICAvLyAgICAgICAgICAgOiAnbGF0aXR1ZGUnO1xuICAvLyAgICAgICAgIG1ldGFEYXRhLmFkZENvbmZpZy5tYXBDb25maWcubG9uZ2l0dWRlS2V5RmllbGQgPSBmaWVsZC5tZXRhRGF0YVxuICAvLyAgICAgICAgICAgLmFkZENvbmZpZy5tYXBDb25maWcubG9uZ2l0dWRlS2V5RmllbGRcbiAgLy8gICAgICAgICAgID8gZmllbGQubWV0YURhdGEuYWRkQ29uZmlnLm1hcENvbmZpZy5sb25naXR1ZGVLZXlGaWVsZFxuICAvLyAgICAgICAgICAgOiAnbG9uZ2l0dWRlJztcbiAgLy8gICAgICAgfVxuICAvLyAgICAgfVxuICAvLyAgICAgc3dpdGNoIChtZXRhRGF0YS5hZGRDb25maWcpIHtcbiAgLy8gICAgICAgLy8gY2FzZSBtZXRhRGF0YS5hZGRDb25maWc/LmJlbG9uZ1RvT3B0aW9uczpcbiAgLy8gICAgICAgLy8gICBtZXRhRGF0YS5hZGRDb25maWcuYmVsb25nVG9PcHRpb25zID0ge1xuICAvLyAgICAgICAvLyAgICAgLi4ubWV0YURhdGEuYWRkQ29uZmlnPy5iZWxvbmdUb09wdGlvbnMsXG4gIC8vICAgICAgIC8vICAgICB2YWx1ZTogZmllbGQ/Lm1ldGFEYXRhPy5hZGRDb25maWcuYmVsb25nVG9PcHRpb25zPy52YWx1ZVxuICAvLyAgICAgICAvLyAgICAgICA/IGZpZWxkPy5tZXRhRGF0YT8uYWRkQ29uZmlnPy5iZWxvbmdUb09wdGlvbnM/LnZhbHVlXG4gIC8vICAgICAgIC8vICAgICAgIDogXCJpZFwiLFxuICAvLyAgICAgICAvLyAgICAgdGVtcGxhdGU6IGZpZWxkLm1ldGFEYXRhLmFkZENvbmZpZy5iZWxvbmdUb09wdGlvbnMudGVtcGxhdGVcbiAgLy8gICAgICAgLy8gICAgICAgPyBmaWVsZC5tZXRhRGF0YS5hZGRDb25maWcuYmVsb25nVG9PcHRpb25zLnRlbXBsYXRlXG4gIC8vICAgICAgIC8vICAgICAgIDogZmllbGQubWV0YURhdGEuYWRkQ29uZmlnLmJlbG9uZ1RvT3B0aW9ucy5maWx0ZXJLZXlzWzBdLFxuICAvLyAgICAgICAvLyAgICAgZmlsdGVyS2V5czogZmllbGQubWV0YURhdGEuYWRkQ29uZmlnLmJlbG9uZ1RvT3B0aW9ucy5maWx0ZXJLZXlzXG4gIC8vICAgICAgIC8vICAgICAgID8gZmllbGQubWV0YURhdGEuYWRkQ29uZmlnLmJlbG9uZ1RvT3B0aW9ucy5maWx0ZXJLZXlzXG4gIC8vICAgICAgIC8vICAgICAgIDogW1wibmFtZVwiXSxcbiAgLy8gICAgICAgLy8gICB9O1xuICAvLyAgICAgICAvLyAgIGJyZWFrO1xuXG4gIC8vICAgICAgIGRlZmF1bHQ6XG4gIC8vICAgICAgICAgYnJlYWs7XG4gIC8vICAgICB9XG4gIC8vICAgfSk7XG5cbiAgLy8gICByZXR1cm4gbWV0YURhdGE7XG4gIC8vIH1cblxuICBnZXQgbGlzdENvbmZpZygpOiBMaXN0Q29uZmlnIHtcbiAgICBjb25zdCByZXN0OiBMaXN0Q29uZmlnID0ge307XG5cbiAgICBpZiAodGhpcy5fbGlzdENvbmZpZy5jb2x1bW5zKSByZXN0LmNvbHVtbnMgPSB0aGlzLl9saXN0Q29uZmlnLmNvbHVtbnM7XG4gICAgZWxzZSB7XG4gICAgICByZXN0LmNvbHVtbnMgPSB0aGlzLmZpZWxkcy5yZWR1Y2U8c3RyaW5nW10+KChjdW11bCwgaXRlbSkgPT4ge1xuICAgICAgICBjdW11bC5wdXNoKGl0ZW0ubmFtZSk7XG4gICAgICAgIHJldHVybiBjdW11bDtcbiAgICAgIH0sIFtdKTtcbiAgICB9XG4gICAgcmVzdC5hcGkgPSB0aGlzLl9saXN0Q29uZmlnLmFwaSA/IHRoaXMuX2xpc3RDb25maWcuYXBpIDogdGhpcy5hcGk7XG4gICAgcmVzdC5ncm91cCA9IHRoaXMuX2xpc3RDb25maWcuZ3JvdXAgPyB0aGlzLl9saXN0Q29uZmlnLmdyb3VwIDogbnVsbDtcblxuICAgIHJlc3QuaGlkZUFkZFN1YkhlYWRlciA9IHRoaXMuX2xpc3RDb25maWcuaGlkZUFkZFN1YkhlYWRlclxuICAgICAgPyB0aGlzLl9saXN0Q29uZmlnLmhpZGVBZGRTdWJIZWFkZXJcbiAgICAgIDogZmFsc2U7XG4gICAgcmVzdC5xdWVyeVBhcmFtcyA9IHRoaXMuX2xpc3RDb25maWcucXVlcnlQYXJhbXNcbiAgICAgID8gdGhpcy5fbGlzdENvbmZpZy5xdWVyeVBhcmFtc1xuICAgICAgOiB0aGlzLnF1ZXJ5UGFyYW1zO1xuICAgIHJlc3QuZGVzY3JpcHRpb24gPSB0aGlzLl9saXN0Q29uZmlnLmRlc2NyaXB0aW9uXG4gICAgICA/IHRoaXMuX2xpc3RDb25maWcuZGVzY3JpcHRpb25cbiAgICAgIDogJ2xpc3Qgb2YgJyArIHRoaXMubmFtZTtcbiAgICByZXN0LnBlclBhZ2UgPSB0aGlzLl9saXN0Q29uZmlnLnBlclBhZ2UgPyB0aGlzLl9saXN0Q29uZmlnLnBlclBhZ2UgOiAyNTtcbiAgICByZXN0LnRpdGxlID0gdGhpcy5fbGlzdENvbmZpZy50aXRsZVxuICAgICAgPyB0aGlzLl9saXN0Q29uZmlnLnRpdGxlXG4gICAgICA6ICdMaXN0IG9mICcgKyB0aGlzLm5hbWU7XG4gICAgcmVzdC5zZWFyY2hGaWx0ZXIgPSB0aGlzLl9saXN0Q29uZmlnLnNlYXJjaEZpbHRlclxuICAgICAgPyB0aGlzLl9saXN0Q29uZmlnLnNlYXJjaEZpbHRlclxuICAgICAgOiB7IGZpbHRlckJ5OiBbXSB9O1xuICAgIGlmIChyZXN0Lmdyb3VwKSB7XG4gICAgICByZXN0Lmdyb3VwID0gdGhpcy5fbGlzdENvbmZpZy5ncm91cDtcbiAgICAgIHJlc3QuZ3JvdXAucHJpb3JpdHkgPSByZXN0Lmdyb3VwLnByaW9yaXR5ID8gcmVzdC5ncm91cC5wcmlvcml0eSA6IDA7XG4gICAgICByZXN0Lmdyb3VwLmljb24gPSByZXN0Lmdyb3VwLmljb24gPyByZXN0Lmdyb3VwLmljb24gOiAnZm9sZGVyLW91dGxpbmUnO1xuICAgIH0gZWxzZVxuICAgICAgcmVzdC5ncm91cCA9IHtcbiAgICAgICAgcHJpb3JpdHk6IDAsXG4gICAgICAgIG5hbWU6ICdkZWZhdWx0JyxcbiAgICAgICAgdHlwZTogVFlQRV9HUk9VUC5ERUZBVUxULFxuICAgICAgfTtcblxuICAgIHJldHVybiByZXN0O1xuICB9XG5cbiAgZ2V0IGFkZENvbmZpZygpOiBBZGRDb25maWcge1xuICAgIGNvbnN0IHJlc3Q6IEFkZENvbmZpZyA9IHt9O1xuXG4gICAgcmVzdC5hcGkgPSB0aGlzLl9hZGRDb25maWcuYXBpID8gdGhpcy5fYWRkQ29uZmlnLmFwaSA6IHRoaXMuYXBpO1xuICAgIHJlc3QudGl0bGUgPSB0aGlzLl9hZGRDb25maWcudGl0bGVcbiAgICAgID8gdGhpcy5fYWRkQ29uZmlnLnRpdGxlXG4gICAgICA6ICdBZGQgJyArIHRoaXMubmFtZTtcblxuICAgIHJlc3QubWV0aG9kID0gdGhpcy5fYWRkQ29uZmlnLm1ldGhvZFxuICAgICAgPyB0aGlzLl9hZGRDb25maWcubWV0aG9kXG4gICAgICA6IFRZUEVfTUVUSE9EX1JFUVVFU1QuUE9TVDtcblxuICAgIHJlc3QuYm9keSA9IHRoaXMuX2FkZENvbmZpZy5ib2R5ID8gdGhpcy5fYWRkQ29uZmlnLmJvZHkgOiB7fTtcbiAgICByZXN0LmhlYWRlciA9IHRoaXMuX2FkZENvbmZpZy5oZWFkZXIgPyB0aGlzLl9hZGRDb25maWcuaGVhZGVyIDoge307XG4gICAgcmV0dXJuIHJlc3Q7XG4gIH1cblxuICBnZXQgZWRpdENvbmZpZygpOiBFZGl0Q29uZmlnIHtcbiAgICBjb25zdCByZXN0OiBFZGl0Q29uZmlnID0ge307XG4gICAgcmVzdC5hcGkgPSB0aGlzLl9lZGl0Q29uZmlnLmFwaSA/IHRoaXMuX2VkaXRDb25maWcuYXBpIDogdGhpcy5hcGk7XG4gICAgcmVzdC5pc0xhcmF2ZWwgPSB0aGlzLl9lZGl0Q29uZmlnLmlzTGFyYXZlbFxuICAgICAgPyB0aGlzLl9lZGl0Q29uZmlnLmlzTGFyYXZlbFxuICAgICAgOiBmYWxzZTtcbiAgICB0aGlzLl9oYXNGaWxlID0gdGhpcy5oYXNGaWxlO1xuXG4gICAgcmVzdC5tZXRob2QgPSB0aGlzLl9lZGl0Q29uZmlnLm1ldGhvZFxuICAgICAgPyB0aGlzLl9lZGl0Q29uZmlnLm1ldGhvZFxuICAgICAgOiBUWVBFX01FVEhPRF9SRVFVRVNULlBPU1Q7XG5cbiAgICByZXN0LmJvZHkgPSB0aGlzLl9lZGl0Q29uZmlnLmJvZHkgPyB0aGlzLl9lZGl0Q29uZmlnLmJvZHkgOiB7fTtcbiAgICByZXN0LmhlYWRlciA9IHRoaXMuX2VkaXRDb25maWcuaGVhZGVyID8gdGhpcy5fZWRpdENvbmZpZy5oZWFkZXIgOiB7fTtcblxuICAgIHJlc3QudGl0bGUgPSB0aGlzLl9lZGl0Q29uZmlnLnRpdGxlXG4gICAgICA/IHRoaXMuX2VkaXRDb25maWcudGl0bGVcbiAgICAgIDogJ0VkaXQgJyArIHRoaXMubmFtZTtcbiAgICByZXN0LnF1ZXJ5UGFyYW1zID0gdGhpcy5fZWRpdENvbmZpZy5xdWVyeVBhcmFtc1xuICAgICAgPyB0aGlzLl9lZGl0Q29uZmlnLnF1ZXJ5UGFyYW1zXG4gICAgICA6IHRoaXMucXVlcnlQYXJhbXM7XG4gICAgcmV0dXJuIHJlc3Q7XG4gIH1cblxuICBnZXQgZGV0YWlsQ29uZmlnKCk6IERldGFpbENvbmZpZyB7XG4gICAgY29uc3QgcmVzdDogRGV0YWlsQ29uZmlnID0ge307XG4gICAgcmVzdC5hcGkgPSB0aGlzLl9kZXRhaWxDb25maWcuYXBpID8gdGhpcy5fZGV0YWlsQ29uZmlnLmFwaSA6IHRoaXMuYXBpO1xuICAgIHJlc3QudGl0bGUgPSB0aGlzLl9kZXRhaWxDb25maWcudGl0bGUgPyB0aGlzLl9kZXRhaWxDb25maWcudGl0bGUgOiAnJztcbiAgICByZXN0LnRhYnNDb25maWcgPSB0aGlzLl9kZXRhaWxDb25maWcudGFic0NvbmZpZ1xuICAgICAgPyB0aGlzLl9kZXRhaWxDb25maWcudGFic0NvbmZpZ1xuICAgICAgOiBudWxsO1xuICAgIHJlc3QucXVlcnlQYXJhbXMgPSB0aGlzLl9kZXRhaWxDb25maWcucXVlcnlQYXJhbXNcbiAgICAgID8gdGhpcy5fZGV0YWlsQ29uZmlnLnF1ZXJ5UGFyYW1zXG4gICAgICA6IHRoaXMucXVlcnlQYXJhbXM7XG5cbiAgICByZXN0LnByZXBhcmVkU3RhdGVtZW50UXVlcnkgPSB0aGlzLl9kZXRhaWxDb25maWcucHJlcGFyZWRTdGF0ZW1lbnRRdWVyeVxuICAgICAgPyB0aGlzLl9kZXRhaWxDb25maWcucHJlcGFyZWRTdGF0ZW1lbnRRdWVyeVxuICAgICAgOiBudWxsO1xuICAgIHJldHVybiByZXN0O1xuICB9XG5cbiAgZ2V0IGRlc2NyaXB0aW9uKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2Rlc2NyaXB0aW9uID09IG51bGxcbiAgICAgID8gJ21hbmFnZSAnICsgdGhpcy5uYW1lXG4gICAgICA6IHRoaXMuX2Rlc2NyaXB0aW9uO1xuICB9XG5cbiAgZ2V0IHF1ZXJ5UGFyYW1zKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX3F1ZXJ5UGFyYW1zID09IG51bGwgPyB7fSA6IHRoaXMuX3F1ZXJ5UGFyYW1zO1xuICB9XG5cbiAgLy8gU2V0dGVyc1xuICBzZXQgbmFtZSh2OiBzdHJpbmcpIHtcbiAgICB0aGlzLl9uYW1lID0gdjtcbiAgfVxuXG4gIHNldCBmaWVsZHModjogUmVzdEZpZWxkW10pIHtcbiAgICB0aGlzLl9maWVsZHMgPSB2O1xuICB9XG5cbiAgc2V0IGxpc3RDb25maWcodjogTGlzdENvbmZpZykge1xuICAgIHRoaXMuX2xpc3RDb25maWcgPSB2O1xuICB9XG5cbiAgc2V0IGVkaXRDb25maWcodjogRWRpdENvbmZpZykge1xuICAgIHRoaXMuX2VkaXRDb25maWcgPSB2O1xuICB9XG5cbiAgc2V0IGRldGFpbENvbmZpZyh2OiBEZXRhaWxDb25maWcpIHtcbiAgICB0aGlzLl9kZXRhaWxDb25maWcgPSB2O1xuICB9XG5cbiAgc2V0IGFwaSh2OiBzdHJpbmcpIHtcbiAgICB0aGlzLl9hcGkgPSB2O1xuICB9XG5cbiAgc2V0IGljb24odjogc3RyaW5nIHwgQ3VzdG9tSWNvbikge1xuICAgIHRoaXMuX2ljb24gPSB2O1xuICB9XG5cbiAgc2V0IGRlc2NyaXB0aW9uKHY6IHN0cmluZykge1xuICAgIHRoaXMuX2Rlc2NyaXB0aW9uID0gdjtcbiAgfVxuXG4gIHNldCBxdWVyeVBhcmFtcyh2OiBhbnkpIHtcbiAgICB0aGlzLl9xdWVyeVBhcmFtcyA9IHY7XG4gIH1cblxuICBzZXQgYXV0aFJlcXVpcmVkKHY6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9hdXRoUmVxdWlyZWQgPSB2O1xuICB9XG5cbiAgc2V0IHNob3dJbk1lbnUodjogYm9vbGVhbikge1xuICAgIHRoaXMuX3Nob3dJbk1lbnUgPSB2O1xuICB9XG5cbiAgc2V0IHBlcm1pc3Npb25zKHY6IHN0cmluZ1tdKSB7XG4gICAgdGhpcy5fcGVybWlzc2lvbnMgPSB2O1xuICB9XG59XG4iXX0=