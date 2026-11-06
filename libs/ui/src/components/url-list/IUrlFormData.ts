/** Editable web-link fields shared by feature forms. @public */
export interface IUrlFormData<TCategory extends string = string> {
    type: TCategory;
    label: string;
    url: string;
    isPrimary: boolean;
    isActive: boolean;
}
