import { REST_FIELD_TYPES, TYPE_GROUP, TYPE_METHOD_REQUEST, } from "./rest-resource.model";
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
        return this._api == null ? this.name.toLowerCase() + "s" : this._api;
    }
    get authRequired() {
        return this._authRequired == null ? false : this._authRequired;
    }
    get showInMenu() {
        return this._showInMenu == null ? true : this._showInMenu;
    }
    get icon() {
        if (this._icon == null)
            return "browser-outline";
        else if (typeof this._icon == "string")
            return this._icon;
        else
            return { icon: this._icon.icon, pack: this._icon.pack };
    }
    get fields() {
        return this._fields.map((field) => ({
            name: field.name,
            type: field.type ? field.type : REST_FIELD_TYPES.STRING,
            label: field.label ? field.label : field.name,
            inForm: field.inForm !== undefined ? field.inForm : true,
            metaData: field.metaData,
            i18n: field.i18n !== undefined ? field.i18n : false,
        }));
    }
    get hasFile() {
        return this.fields.findIndex((field) => ([REST_FIELD_TYPES.IMAGE, REST_FIELD_TYPES.PDF, REST_FIELD_TYPES.FILE].includes(field.type))) >= 0;
    }
    get permissions() {
        return this._permissions == null ? [] : this._permissions;
    }
    // Defini afin de tester les valeurs des metadatas
    // get metaData(): REST_FIELD_METADATA {
    //   const metaData: REST_FIELD_METADATA = {};
    //   this._fields.forEach((field) => {
    //     switch (metaData.addConfig) {
    //       case metaData.addConfig?.belongToOptions:
    //         metaData.addConfig.belongToOptions = {
    //           ...metaData.addConfig?.belongToOptions,
    //           value: field?.metaData?.addConfig.belongToOptions?.value
    //             ? field?.metaData?.addConfig?.belongToOptions?.value
    //             : "id",
    //           template: field.metaData.addConfig.belongToOptions.template
    //             ? field.metaData.addConfig.belongToOptions.template
    //             : field.metaData.addConfig.belongToOptions.filterKeys[0],
    //           filterKeys: field.metaData.addConfig.belongToOptions.filterKeys
    //             ? field.metaData.addConfig.belongToOptions.filterKeys
    //             : ["name"],
    //         };
    //         break;
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
            : "list of " + this.name;
        rest.perPage = this._listConfig.perPage ? this._listConfig.perPage : 25;
        rest.title = this._listConfig.title
            ? this._listConfig.title
            : "List of " + this.name;
        rest.searchFilter = this._listConfig.searchFilter
            ? this._listConfig.searchFilter
            : null;
        if (rest.group) {
            rest.group = this._listConfig.group;
            rest.group.priority = rest.group.priority ? rest.group.priority : 0;
            rest.group.icon = rest.group.icon ? rest.group.icon : "folder-outline";
        }
        else
            rest.group = {
                priority: 0,
                name: "default",
                type: TYPE_GROUP.DEFAULT,
            };
        return rest;
    }
    get addConfig() {
        const rest = {};
        rest.api = this._addConfig.api ? this._addConfig.api : this.api;
        rest.title = this._addConfig.title
            ? this._addConfig.title
            : "Add " + this.name;
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
        rest.body = this._editConfig.body
            ? this._editConfig.body
            : {};
        rest.header = this._editConfig.header
            ? this._editConfig.header
            : {};
        rest.title = this._editConfig.title
            ? this._editConfig.title
            : "Edit " + this.name;
        rest.queryParams = this._editConfig.queryParams
            ? this._editConfig.queryParams
            : this.queryParams;
        return rest;
    }
    get detailConfig() {
        const rest = {};
        rest.api = this._detailConfig.api ? this._detailConfig.api : this.api;
        rest.title = this._detailConfig.title ? this._detailConfig.title : "";
        rest.tabsConfig = this._detailConfig.tabsConfig
            ? this._detailConfig.tabsConfig
            : null;
        rest.queryParams = this._detailConfig.queryParams
            ? this._detailConfig.queryParams
            : this.queryParams;
        return rest;
    }
    get description() {
        return this._description == null
            ? "manage " + this.name
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdC1yZXNvdXJjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3Jlc3QtYWRtaW4vc3JjL2xpYi9yZXN0LWFkbWluL3Jlc3QtcmVzb3VyY2UvbW9kZWxzL3Jlc3QtcmVzb3VyY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUdMLGdCQUFnQixFQU9oQixVQUFVLEVBQ1YsbUJBQW1CLEdBQ3BCLE1BQU0sdUJBQXVCLENBQUM7QUFFL0IsTUFBTSxPQUFPLFlBQVk7SUFrQnZCLFlBQ0UsVUFBc0IsRUFDdEIsTUFBbUIsRUFDbkIsVUFBc0IsRUFDdEIsU0FBb0IsRUFDcEIsVUFBc0IsRUFDdEIsWUFBMEI7UUFsQnBCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFvQnZCLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztRQUM3QixJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUM7UUFDN0IsSUFBSSxDQUFDLFlBQVksR0FBRyxVQUFVLENBQUMsV0FBVyxDQUFDO1FBQzNDLElBQUksQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQztRQUMzQixJQUFJLENBQUMsYUFBYSxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUM7UUFDN0MsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDO1FBRXpDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO1FBQzlCLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQzVCLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO1FBQzlCLElBQUksQ0FBQyxhQUFhLEdBQUcsWUFBWSxDQUFDO0lBQ3BDLENBQUM7SUFFRCxVQUFVO0lBRVYsSUFBSSxJQUFJO1FBQ04sT0FBTyxJQUFJLENBQUMsS0FB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QWM7UUFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUVELElBQUksVUFBVSxDQUFDLENBQWE7UUFDMUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUVELElBQUksVUFBVSxDQUFDLENBQWE7UUFDMUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUVELElBQUksWUFBWSxDQUFDLENBQWU7UUFDOUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUVELElBQUksR0FBRyxDQUFDLENBQVM7UUFDZixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztJQUNoQixDQUFDO0lBRUQsSUFBSSxJQUFJLENBQUMsQ0FBc0I7UUFDN0IsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7SUFDakIsQ0FBQztJQUVELElBQUksV0FBVyxDQUFDLENBQVM7UUFDdkIsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVELElBQUksV0FBVyxDQUFDLENBQU07UUFDcEIsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVELElBQUksWUFBWSxDQUFDLENBQVU7UUFDekIsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUVELElBQUksVUFBVSxDQUFDLENBQVU7UUFDdkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUVELElBQUksV0FBVyxDQUFDLENBQVc7UUFDekIsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7SUFDeEIsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgUmVzdEZpZWxkLFxuICBMaXN0Q29uZmlnLFxuICBSRVNUX0ZJRUxEX1RZUEVTLFxuICBBZGRDb25maWcsXG4gIFJFU1RfRklFTERfTUVUQURBVEEsXG4gIE1haW5Db25maWcsXG4gIEVkaXRDb25maWcsXG4gIEN1c3RvbUljb24sXG4gIERldGFpbENvbmZpZyxcbiAgVFlQRV9HUk9VUCxcbiAgVFlQRV9NRVRIT0RfUkVRVUVTVCxcbn0gZnJvbSBcIi4vcmVzdC1yZXNvdXJjZS5tb2RlbFwiO1xuXG5leHBvcnQgY2xhc3MgUmVzdFJlc291cmNlIHtcbiAgcHJpdmF0ZSBfYXBpOiBzdHJpbmc7XG4gIHByaXZhdGUgX2Rlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIHByaXZhdGUgX2ljb246IHN0cmluZyB8IEN1c3RvbUljb247XG4gIHByaXZhdGUgX25hbWU6IHN0cmluZztcbiAgcHJpdmF0ZSBfYXV0aFJlcXVpcmVkOiBib29sZWFuO1xuICBwcml2YXRlIF9oYXNGaWxlID0gZmFsc2U7XG4gIHByaXZhdGUgX3Nob3dJbk1lbnU6IGJvb2xlYW47XG4gIHByaXZhdGUgX3Blcm1pc3Npb25zOiBzdHJpbmdbXTtcblxuICBwcml2YXRlIF9maWVsZHM6IFJlc3RGaWVsZFtdO1xuICBwcml2YXRlIF9saXN0Q29uZmlnOiBMaXN0Q29uZmlnO1xuICBwcml2YXRlIF9hZGRDb25maWc6IEFkZENvbmZpZztcbiAgcHJpdmF0ZSBfZWRpdENvbmZpZzogRWRpdENvbmZpZztcbiAgcHJpdmF0ZSBfZGV0YWlsQ29uZmlnOiBEZXRhaWxDb25maWc7XG5cbiAgcHJpdmF0ZSBfcXVlcnlQYXJhbXM6IGFueTtcbiAgXG4gIGNvbnN0cnVjdG9yKFxuICAgIG1haW5Db25maWc6IE1haW5Db25maWcsXG4gICAgZmllbGRzOiBSZXN0RmllbGRbXSxcbiAgICBsaXN0Q29uZmlnOiBMaXN0Q29uZmlnLFxuICAgIGFkZENvbmZpZzogQWRkQ29uZmlnLFxuICAgIGVkaXRDb25maWc6IEVkaXRDb25maWcsXG4gICAgZGV0YWlsQ29uZmlnOiBEZXRhaWxDb25maWdcbiAgKSB7XG4gICAgdGhpcy5fbmFtZSA9IG1haW5Db25maWcubmFtZTtcbiAgICB0aGlzLl9pY29uID0gbWFpbkNvbmZpZy5pY29uO1xuICAgIHRoaXMuX2Rlc2NyaXB0aW9uID0gbWFpbkNvbmZpZy5kZXNjcmlwdGlvbjtcbiAgICB0aGlzLl9hcGkgPSBtYWluQ29uZmlnLmFwaTtcbiAgICB0aGlzLl9hdXRoUmVxdWlyZWQgPSBtYWluQ29uZmlnLmF1dGhSZXF1aXJlZDtcbiAgICB0aGlzLl9zaG93SW5NZW51ID0gbWFpbkNvbmZpZy5zaG93SW5NZW51O1xuXG4gICAgdGhpcy5fZmllbGRzID0gZmllbGRzO1xuICAgIHRoaXMuX2xpc3RDb25maWcgPSBsaXN0Q29uZmlnO1xuICAgIHRoaXMuX2FkZENvbmZpZyA9IGFkZENvbmZpZztcbiAgICB0aGlzLl9lZGl0Q29uZmlnID0gZWRpdENvbmZpZztcbiAgICB0aGlzLl9kZXRhaWxDb25maWcgPSBkZXRhaWxDb25maWc7XG4gIH1cblxuICAvLyBHZXR0ZXJzXG5cbiAgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgfVxuXG4gIGdldCBhcGkoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fYXBpID09IG51bGwgPyB0aGlzLm5hbWUudG9Mb3dlckNhc2UoKSArIFwic1wiIDogdGhpcy5fYXBpO1xuICB9XG5cbiAgZ2V0IGF1dGhSZXF1aXJlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fYXV0aFJlcXVpcmVkID09IG51bGwgPyBmYWxzZSA6IHRoaXMuX2F1dGhSZXF1aXJlZDtcbiAgfVxuXG4gIGdldCBzaG93SW5NZW51KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9zaG93SW5NZW51ID09IG51bGwgPyB0cnVlIDogdGhpcy5fc2hvd0luTWVudTtcbiAgfVxuXG4gIGdldCBpY29uKCk6IHN0cmluZyB8IEN1c3RvbUljb24ge1xuICAgIGlmICh0aGlzLl9pY29uID09IG51bGwpIHJldHVybiBcImJyb3dzZXItb3V0bGluZVwiO1xuICAgIGVsc2UgaWYgKHR5cGVvZiB0aGlzLl9pY29uID09IFwic3RyaW5nXCIpIHJldHVybiB0aGlzLl9pY29uO1xuICAgIGVsc2UgcmV0dXJuIHsgaWNvbjogdGhpcy5faWNvbi5pY29uLCBwYWNrOiB0aGlzLl9pY29uLnBhY2sgfTtcbiAgfVxuXG4gIGdldCBmaWVsZHMoKTogUmVzdEZpZWxkW10ge1xuICAgIHJldHVybiB0aGlzLl9maWVsZHMubWFwKChmaWVsZCkgPT4gKHtcbiAgICAgIG5hbWU6IGZpZWxkLm5hbWUsXG4gICAgICB0eXBlOiBmaWVsZC50eXBlID8gZmllbGQudHlwZSA6IFJFU1RfRklFTERfVFlQRVMuU1RSSU5HLFxuICAgICAgbGFiZWw6IGZpZWxkLmxhYmVsID8gZmllbGQubGFiZWwgOiBmaWVsZC5uYW1lLFxuICAgICAgaW5Gb3JtOiBmaWVsZC5pbkZvcm0gIT09IHVuZGVmaW5lZCA/IGZpZWxkLmluRm9ybSA6IHRydWUsXG4gICAgICBtZXRhRGF0YTogZmllbGQubWV0YURhdGEsXG4gICAgICBpMThuOiBmaWVsZC5pMThuICE9PSB1bmRlZmluZWQgPyBmaWVsZC5pMThuIDogZmFsc2UsXG4gICAgfSkpO1xuICB9XG5cbiAgZ2V0IGhhc0ZpbGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZmllbGRzLmZpbmRJbmRleCgoZmllbGQpID0+IChcbiAgICAgIFtSRVNUX0ZJRUxEX1RZUEVTLklNQUdFLCBSRVNUX0ZJRUxEX1RZUEVTLlBERiwgUkVTVF9GSUVMRF9UWVBFUy5GSUxFXS5pbmNsdWRlcyhmaWVsZC50eXBlKVxuICAgICkpID49MDtcbiAgfVxuXG4gIGdldCBwZXJtaXNzaW9ucygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3Blcm1pc3Npb25zID09IG51bGwgPyBbXSA6IHRoaXMuX3Blcm1pc3Npb25zO1xuICB9XG5cbiAgLy8gRGVmaW5pIGFmaW4gZGUgdGVzdGVyIGxlcyB2YWxldXJzIGRlcyBtZXRhZGF0YXNcbiAgLy8gZ2V0IG1ldGFEYXRhKCk6IFJFU1RfRklFTERfTUVUQURBVEEge1xuICAvLyAgIGNvbnN0IG1ldGFEYXRhOiBSRVNUX0ZJRUxEX01FVEFEQVRBID0ge307XG5cbiAgLy8gICB0aGlzLl9maWVsZHMuZm9yRWFjaCgoZmllbGQpID0+IHtcbiAgLy8gICAgIHN3aXRjaCAobWV0YURhdGEuYWRkQ29uZmlnKSB7XG4gIC8vICAgICAgIGNhc2UgbWV0YURhdGEuYWRkQ29uZmlnPy5iZWxvbmdUb09wdGlvbnM6XG4gIC8vICAgICAgICAgbWV0YURhdGEuYWRkQ29uZmlnLmJlbG9uZ1RvT3B0aW9ucyA9IHtcbiAgLy8gICAgICAgICAgIC4uLm1ldGFEYXRhLmFkZENvbmZpZz8uYmVsb25nVG9PcHRpb25zLFxuICAvLyAgICAgICAgICAgdmFsdWU6IGZpZWxkPy5tZXRhRGF0YT8uYWRkQ29uZmlnLmJlbG9uZ1RvT3B0aW9ucz8udmFsdWVcbiAgLy8gICAgICAgICAgICAgPyBmaWVsZD8ubWV0YURhdGE/LmFkZENvbmZpZz8uYmVsb25nVG9PcHRpb25zPy52YWx1ZVxuICAvLyAgICAgICAgICAgICA6IFwiaWRcIixcbiAgLy8gICAgICAgICAgIHRlbXBsYXRlOiBmaWVsZC5tZXRhRGF0YS5hZGRDb25maWcuYmVsb25nVG9PcHRpb25zLnRlbXBsYXRlXG4gIC8vICAgICAgICAgICAgID8gZmllbGQubWV0YURhdGEuYWRkQ29uZmlnLmJlbG9uZ1RvT3B0aW9ucy50ZW1wbGF0ZVxuICAvLyAgICAgICAgICAgICA6IGZpZWxkLm1ldGFEYXRhLmFkZENvbmZpZy5iZWxvbmdUb09wdGlvbnMuZmlsdGVyS2V5c1swXSxcbiAgLy8gICAgICAgICAgIGZpbHRlcktleXM6IGZpZWxkLm1ldGFEYXRhLmFkZENvbmZpZy5iZWxvbmdUb09wdGlvbnMuZmlsdGVyS2V5c1xuICAvLyAgICAgICAgICAgICA/IGZpZWxkLm1ldGFEYXRhLmFkZENvbmZpZy5iZWxvbmdUb09wdGlvbnMuZmlsdGVyS2V5c1xuICAvLyAgICAgICAgICAgICA6IFtcIm5hbWVcIl0sXG4gIC8vICAgICAgICAgfTtcbiAgLy8gICAgICAgICBicmVhaztcblxuICAvLyAgICAgICBkZWZhdWx0OlxuICAvLyAgICAgICAgIGJyZWFrO1xuICAvLyAgICAgfVxuICAvLyAgIH0pO1xuXG4gIC8vICAgcmV0dXJuIG1ldGFEYXRhO1xuICAvLyB9XG5cbiAgZ2V0IGxpc3RDb25maWcoKTogTGlzdENvbmZpZyB7XG4gICAgY29uc3QgcmVzdDogTGlzdENvbmZpZyA9IHt9O1xuXG4gICAgaWYgKHRoaXMuX2xpc3RDb25maWcuY29sdW1ucykgcmVzdC5jb2x1bW5zID0gdGhpcy5fbGlzdENvbmZpZy5jb2x1bW5zO1xuICAgIGVsc2Uge1xuICAgICAgcmVzdC5jb2x1bW5zID0gdGhpcy5maWVsZHMucmVkdWNlPHN0cmluZ1tdPigoY3VtdWwsIGl0ZW0pID0+IHtcbiAgICAgICAgY3VtdWwucHVzaChpdGVtLm5hbWUpO1xuICAgICAgICByZXR1cm4gY3VtdWw7XG4gICAgICB9LCBbXSk7XG4gICAgfVxuICAgIHJlc3QuYXBpID0gdGhpcy5fbGlzdENvbmZpZy5hcGkgPyB0aGlzLl9saXN0Q29uZmlnLmFwaSA6IHRoaXMuYXBpO1xuICAgIHJlc3QuZ3JvdXAgPSB0aGlzLl9saXN0Q29uZmlnLmdyb3VwID8gdGhpcy5fbGlzdENvbmZpZy5ncm91cCA6IG51bGw7XG5cbiAgICByZXN0LmhpZGVBZGRTdWJIZWFkZXIgPSB0aGlzLl9saXN0Q29uZmlnLmhpZGVBZGRTdWJIZWFkZXJcbiAgICAgID8gdGhpcy5fbGlzdENvbmZpZy5oaWRlQWRkU3ViSGVhZGVyXG4gICAgICA6IGZhbHNlO1xuICAgIHJlc3QucXVlcnlQYXJhbXMgPSB0aGlzLl9saXN0Q29uZmlnLnF1ZXJ5UGFyYW1zXG4gICAgICA/IHRoaXMuX2xpc3RDb25maWcucXVlcnlQYXJhbXNcbiAgICAgIDogdGhpcy5xdWVyeVBhcmFtcztcbiAgICByZXN0LmRlc2NyaXB0aW9uID0gdGhpcy5fbGlzdENvbmZpZy5kZXNjcmlwdGlvblxuICAgICAgPyB0aGlzLl9saXN0Q29uZmlnLmRlc2NyaXB0aW9uXG4gICAgICA6IFwibGlzdCBvZiBcIiArIHRoaXMubmFtZTtcbiAgICByZXN0LnBlclBhZ2UgPSB0aGlzLl9saXN0Q29uZmlnLnBlclBhZ2UgPyB0aGlzLl9saXN0Q29uZmlnLnBlclBhZ2UgOiAyNTtcbiAgICByZXN0LnRpdGxlID0gdGhpcy5fbGlzdENvbmZpZy50aXRsZVxuICAgICAgPyB0aGlzLl9saXN0Q29uZmlnLnRpdGxlXG4gICAgICA6IFwiTGlzdCBvZiBcIiArIHRoaXMubmFtZTtcbiAgICByZXN0LnNlYXJjaEZpbHRlciA9IHRoaXMuX2xpc3RDb25maWcuc2VhcmNoRmlsdGVyXG4gICAgICA/IHRoaXMuX2xpc3RDb25maWcuc2VhcmNoRmlsdGVyXG4gICAgICA6IG51bGw7XG4gICAgaWYgKHJlc3QuZ3JvdXApIHtcbiAgICAgIHJlc3QuZ3JvdXAgPSB0aGlzLl9saXN0Q29uZmlnLmdyb3VwO1xuICAgICAgcmVzdC5ncm91cC5wcmlvcml0eSA9IHJlc3QuZ3JvdXAucHJpb3JpdHkgPyByZXN0Lmdyb3VwLnByaW9yaXR5IDogMDtcbiAgICAgIHJlc3QuZ3JvdXAuaWNvbiA9IHJlc3QuZ3JvdXAuaWNvbiA/IHJlc3QuZ3JvdXAuaWNvbiA6IFwiZm9sZGVyLW91dGxpbmVcIjtcbiAgICB9IGVsc2VcbiAgICAgIHJlc3QuZ3JvdXAgPSB7XG4gICAgICAgIHByaW9yaXR5OiAwLFxuICAgICAgICBuYW1lOiBcImRlZmF1bHRcIixcbiAgICAgICAgdHlwZTogVFlQRV9HUk9VUC5ERUZBVUxULFxuICAgICAgfTtcblxuICAgIHJldHVybiByZXN0O1xuICB9XG5cbiAgZ2V0IGFkZENvbmZpZygpOiBBZGRDb25maWcge1xuICAgIGNvbnN0IHJlc3Q6IEFkZENvbmZpZyA9IHt9O1xuXG4gICAgcmVzdC5hcGkgPSB0aGlzLl9hZGRDb25maWcuYXBpID8gdGhpcy5fYWRkQ29uZmlnLmFwaSA6IHRoaXMuYXBpO1xuICAgIHJlc3QudGl0bGUgPSB0aGlzLl9hZGRDb25maWcudGl0bGVcbiAgICAgID8gdGhpcy5fYWRkQ29uZmlnLnRpdGxlXG4gICAgICA6IFwiQWRkIFwiICsgdGhpcy5uYW1lO1xuXG4gICAgcmVzdC5tZXRob2QgPSB0aGlzLl9hZGRDb25maWcubWV0aG9kXG4gICAgICA/IHRoaXMuX2FkZENvbmZpZy5tZXRob2RcbiAgICAgIDogVFlQRV9NRVRIT0RfUkVRVUVTVC5QT1NUO1xuXG4gICAgcmVzdC5ib2R5ID0gdGhpcy5fYWRkQ29uZmlnLmJvZHkgPyB0aGlzLl9hZGRDb25maWcuYm9keSA6IHt9O1xuICAgIHJlc3QuaGVhZGVyID0gdGhpcy5fYWRkQ29uZmlnLmhlYWRlciA/IHRoaXMuX2FkZENvbmZpZy5oZWFkZXIgOiB7fTtcbiAgICByZXR1cm4gcmVzdDtcbiAgfVxuXG4gIGdldCBlZGl0Q29uZmlnKCk6IEVkaXRDb25maWcge1xuICAgIGNvbnN0IHJlc3Q6IEVkaXRDb25maWcgPSB7fTtcbiAgICByZXN0LmFwaSA9IHRoaXMuX2VkaXRDb25maWcuYXBpID8gdGhpcy5fZWRpdENvbmZpZy5hcGkgOiB0aGlzLmFwaTtcbiAgICByZXN0LmlzTGFyYXZlbCA9IHRoaXMuX2VkaXRDb25maWcuaXNMYXJhdmVsXG4gICAgICA/IHRoaXMuX2VkaXRDb25maWcuaXNMYXJhdmVsXG4gICAgICA6IGZhbHNlO1xuICAgIHRoaXMuX2hhc0ZpbGUgPSB0aGlzLmhhc0ZpbGU7XG4gICAgXG4gICAgcmVzdC5tZXRob2QgPSB0aGlzLl9lZGl0Q29uZmlnLm1ldGhvZFxuICAgICAgPyB0aGlzLl9lZGl0Q29uZmlnLm1ldGhvZFxuICAgICAgOiBUWVBFX01FVEhPRF9SRVFVRVNULlBPU1Q7XG5cbiAgICByZXN0LmJvZHkgPSB0aGlzLl9lZGl0Q29uZmlnLmJvZHlcbiAgICAgID8gdGhpcy5fZWRpdENvbmZpZy5ib2R5XG4gICAgICA6IHt9O1xuICAgIHJlc3QuaGVhZGVyID0gdGhpcy5fZWRpdENvbmZpZy5oZWFkZXJcbiAgICAgID8gdGhpcy5fZWRpdENvbmZpZy5oZWFkZXJcbiAgICAgIDoge307XG5cbiAgICByZXN0LnRpdGxlID0gdGhpcy5fZWRpdENvbmZpZy50aXRsZVxuICAgICAgPyB0aGlzLl9lZGl0Q29uZmlnLnRpdGxlXG4gICAgICA6IFwiRWRpdCBcIiArIHRoaXMubmFtZTtcbiAgICByZXN0LnF1ZXJ5UGFyYW1zID0gdGhpcy5fZWRpdENvbmZpZy5xdWVyeVBhcmFtc1xuICAgICAgPyB0aGlzLl9lZGl0Q29uZmlnLnF1ZXJ5UGFyYW1zXG4gICAgICA6IHRoaXMucXVlcnlQYXJhbXM7XG4gICAgcmV0dXJuIHJlc3Q7XG4gIH1cblxuICBnZXQgZGV0YWlsQ29uZmlnKCk6IERldGFpbENvbmZpZyB7XG4gICAgY29uc3QgcmVzdDogRGV0YWlsQ29uZmlnID0ge307XG4gICAgcmVzdC5hcGkgPSB0aGlzLl9kZXRhaWxDb25maWcuYXBpID8gdGhpcy5fZGV0YWlsQ29uZmlnLmFwaSA6IHRoaXMuYXBpO1xuICAgIHJlc3QudGl0bGUgPSB0aGlzLl9kZXRhaWxDb25maWcudGl0bGUgPyB0aGlzLl9kZXRhaWxDb25maWcudGl0bGUgOiBcIlwiO1xuICAgIHJlc3QudGFic0NvbmZpZyA9IHRoaXMuX2RldGFpbENvbmZpZy50YWJzQ29uZmlnXG4gICAgICA/IHRoaXMuX2RldGFpbENvbmZpZy50YWJzQ29uZmlnXG4gICAgICA6IG51bGw7XG4gICAgcmVzdC5xdWVyeVBhcmFtcyA9IHRoaXMuX2RldGFpbENvbmZpZy5xdWVyeVBhcmFtc1xuICAgICAgPyB0aGlzLl9kZXRhaWxDb25maWcucXVlcnlQYXJhbXNcbiAgICAgIDogdGhpcy5xdWVyeVBhcmFtcztcbiAgICByZXR1cm4gcmVzdDtcbiAgfVxuXG4gIGdldCBkZXNjcmlwdGlvbigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9kZXNjcmlwdGlvbiA9PSBudWxsXG4gICAgICA/IFwibWFuYWdlIFwiICsgdGhpcy5uYW1lXG4gICAgICA6IHRoaXMuX2Rlc2NyaXB0aW9uO1xuICB9XG5cbiAgZ2V0IHF1ZXJ5UGFyYW1zKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX3F1ZXJ5UGFyYW1zID09IG51bGwgPyB7fSA6IHRoaXMuX3F1ZXJ5UGFyYW1zO1xuICB9XG5cbiAgLy8gU2V0dGVyc1xuICBzZXQgbmFtZSh2OiBzdHJpbmcpIHtcbiAgICB0aGlzLl9uYW1lID0gdjtcbiAgfVxuXG4gIHNldCBmaWVsZHModjogUmVzdEZpZWxkW10pIHtcbiAgICB0aGlzLl9maWVsZHMgPSB2O1xuICB9XG5cbiAgc2V0IGxpc3RDb25maWcodjogTGlzdENvbmZpZykge1xuICAgIHRoaXMuX2xpc3RDb25maWcgPSB2O1xuICB9XG5cbiAgc2V0IGVkaXRDb25maWcodjogRWRpdENvbmZpZykge1xuICAgIHRoaXMuX2VkaXRDb25maWcgPSB2O1xuICB9XG5cbiAgc2V0IGRldGFpbENvbmZpZyh2OiBEZXRhaWxDb25maWcpIHtcbiAgICB0aGlzLl9kZXRhaWxDb25maWcgPSB2O1xuICB9XG5cbiAgc2V0IGFwaSh2OiBzdHJpbmcpIHtcbiAgICB0aGlzLl9hcGkgPSB2O1xuICB9XG5cbiAgc2V0IGljb24odjogc3RyaW5nIHwgQ3VzdG9tSWNvbikge1xuICAgIHRoaXMuX2ljb24gPSB2O1xuICB9XG5cbiAgc2V0IGRlc2NyaXB0aW9uKHY6IHN0cmluZykge1xuICAgIHRoaXMuX2Rlc2NyaXB0aW9uID0gdjtcbiAgfVxuXG4gIHNldCBxdWVyeVBhcmFtcyh2OiBhbnkpIHtcbiAgICB0aGlzLl9xdWVyeVBhcmFtcyA9IHY7XG4gIH1cblxuICBzZXQgYXV0aFJlcXVpcmVkKHY6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9hdXRoUmVxdWlyZWQgPSB2O1xuICB9XG5cbiAgc2V0IHNob3dJbk1lbnUodjogYm9vbGVhbikge1xuICAgIHRoaXMuX3Nob3dJbk1lbnUgPSB2O1xuICB9XG5cbiAgc2V0IHBlcm1pc3Npb25zKHY6IHN0cmluZ1tdKSB7XG4gICAgdGhpcy5fcGVybWlzc2lvbnMgPSB2O1xuICB9XG59XG4iXX0=