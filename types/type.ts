const allPermissions = {
  'Pages.TenantName': 'true',
  'Pages.Citizens': 'true',
  'Pages.Digitals': 'true',
  'Pages.AdministrationService': 'true',
  'Pages.Invoices': 'true',
  'Pages.Assets': 'true',
  'Pages.LocalAmenities': 'true',
  'Pages.Operations': 'true',
  'Pages.SystemAdministration': 'true',
  'Pages.Reporting': 'true',
  'Pages.DocumentManagement': 'true',
  'Pages.Resident': 'true',
  'Pages.Government': 'true',
  'Pages.Administration': 'true',
  'Pages.Settings': 'true',
  'Pages.TenantName.About': 'true',
  'Pages.TenantName.About.Get': 'true',
  'Pages.TenantName.About.Edit': 'true',
  'Pages.TenantName.Urbans': 'true',
  'Pages.TenantName.Urbans.GetAll': 'true',
  'Pages.TenantName.Urbans.GetDetail': 'true',
  'Pages.TenantName.Urbans.Create': 'true',
  'Pages.TenantName.Urbans.Edit': 'true',
  'Pages.TenantName.Urbans.Delete': 'true',
  'Pages.TenantName.Buildings': 'true',
  'Pages.TenantName.Buildings.GetAll': 'true',
  'Pages.TenantName.Buildings.GetDetail': 'true',
  'Pages.TenantName.Buildings.Create': 'true',
  'Pages.TenantName.Buildings.Edit': 'true',
  'Pages.TenantName.Buildings.Delete': 'true',
  'Pages.TenantName.Blocks': 'true',
  'Pages.TenantName.Blocks.GetAll': 'true',
  'Pages.TenantName.Blocks.GetDetail': 'true',
  'Pages.TenantName.Blocks.Create': 'true',
  'Pages.TenantName.Blocks.Edit': 'true',
  'Pages.TenantName.Blocks.Delete': 'true',
  'Pages.TenantName.Floors': 'true',
  'Pages.TenantName.Floors.GetAll': 'true',
  'Pages.TenantName.Floors.GetDetail': 'true',
  'Pages.TenantName.Floors.Create': 'true',
  'Pages.TenantName.Floors.Edit': 'true',
  'Pages.TenantName.Floors.Delete': 'true',
  'Pages.TenantName.Apartments': 'true',
  'Pages.TenantName.Apartments.GetAll': 'true',
  'Pages.TenantName.Apartments.GetDetail': 'true',
  'Pages.TenantName.Apartments.Create': 'true',
  'Pages.TenantName.Apartments.Edit': 'true',
  'Pages.TenantName.Apartments.Delete': 'true',
  'Pages.TenantName.ApartmentTypes': 'true',
  'Pages.TenantName.ApartmentTypes.GetAll': 'true',
  'Pages.TenantName.ApartmentTypes.GetDetail': 'true',
  'Pages.TenantName.ApartmentTypes.Create': 'true',
  'Pages.TenantName.ApartmentTypes.Edit': 'true',
  'Pages.TenantName.ApartmentTypes.Delete': 'true',
  'Pages.TenantName.ApartmentStatuses': 'true',
  'Pages.TenantName.ApartmentStatuses.GetAll': 'true',
  'Pages.TenantName.ApartmentStatuses.GetDetail': 'true',
  'Pages.TenantName.ApartmentStatuses.Create': 'true',
  'Pages.TenantName.ApartmentStatuses.Edit': 'true',
  'Pages.TenantName.ApartmentStatuses.Delete': 'true',
  'Pages.Citizens.List': 'true',
  'Pages.Citizens.List.GetAll': 'true',
  'Pages.Citizens.List.GetDetail': 'true',
  'Pages.Citizens.List.Create': 'true',
  'Pages.Citizens.List.Edit': 'true',
  'Pages.Citizens.List.Delete': 'true',
  'Pages.Citizen.Verifications': 'true',
  'Pages.Citizen.Verifications.GetAll': 'true',
  'Pages.Citizen.Verifications.GetDetail': 'true',
  'Pages.Citizen.Verifications.Create': 'true',
  'Pages.Citizen.Verifications.Edit': 'true',
  'Pages.Citizen.Verifications.Delete': 'true',
  'Pages.Citizen.Verifications.Approve': 'true',
  'Pages.Citizen.Verifications.Request': 'true',
  'Pages.Citizen.Verifications.Decline': 'true',
  'Pages.Digitals.Notifications': 'true',
  'Pages.Digitals.Notifications.GetAll': 'true',
  'Pages.Digitals.Notifications.GetDetail': 'true',
  'Pages.Digitals.Notifications.Create': 'true',
  'Pages.Digitals.Notifications.Edit': 'true',
  'Pages.Digitals.Notifications.Delete': 'true',
  'Pages.Digitals.Reflects': 'true',
  'Pages.Digitals.Reflects.GetAll': 'true',
  'Pages.Digitals.Reflects.GetDetail': 'true',
  'Pages.Digitals.Reflects.Create': 'true',
  'Pages.Digitals.Reflects.Edit': 'true',
  'Pages.Digitals.Reflects.Delete': 'true',
  'Pages.Digitals.Surveys': 'true',
  'Pages.Digitals.Surveys.GetAll': 'true',
  'Pages.Digitals.Surveys.GetDetail': 'true',
  'Pages.Digitals.Surveys.Create': 'true',
  'Pages.Digitals.Surveys.Edit': 'true',
  'Pages.Digitals.Surveys.Delete': 'true',
  'Pages.Digitals.Forums': 'true',
  'Pages.Digitals.Forums.GetAll': 'true',
  'Pages.Digitals.Forums.GetDetail': 'true',
  'Pages.Digitals.Forums.Create': 'true',
  'Pages.Digitals.Forums.Edit': 'true',
  'Pages.Digitals.Forums.Approve': 'true',
  'Pages.Digitals.Forums.Delete': 'true',
  'Pages.Digitals.Communications': 'true',
  'Pages.Digitals.QnA': 'true',
  'Pages.Digitals.QnA.GetAll': 'true',
  'Pages.Digitals.QnA.GetDetail': 'true',
  'Pages.Digitals.QnA.Create': 'true',
  'Pages.Digitals.QnA.Edit': 'true',
  'Pages.Digitals.QnA.Approve': 'true',
  'Pages.Digitals.QnA.Decline': 'true',
  'Pages.Digitals.QnA.Delete': 'true',
  'Pages.Digitals.Hotline': 'true',
  'Pages.Digitals.Hotline.GetAll': 'true',
  'Pages.Digitals.Hotline.GetDetail': 'true',
  'Pages.Digitals.Hotline.Create': 'true',
  'Pages.Digitals.Hotline.Edit': 'true',
  'Pages.Digitals.Hotline.Delete': 'true',
  'Pages.Digitals.Economic': 'true',
  'Pages.Digitals.Economic.Shopping': 'true',
  'Pages.Digitals.Economic.Work': 'true',
  'Pages.Digitals.Economic.Repair': 'true',
  'Pages.Digitals.Economic.Entertainment': 'true',
  'Pages.AdministrationService.Configurations': 'true',
  'Pages.AdministrationService.Vehicles': 'true',
  'Pages.AdministrationService.Vehicles.GetAll': 'true',
  'Pages.AdministrationService.Vehicles.Create': 'true',
  'Pages.AdministrationService.Vehicles.Edit': 'true',
  'Pages.AdministrationService.Vehicles.Delete': 'true',
  'Pages.AdministrationService.ParkingSpots': 'true',
  'Pages.Invoices.Monthly': 'true',
  'Pages.Invoices.Monthly.GetAll': 'true',
  'Pages.Invoices.Monthly.GetDetail': 'true',
  'Pages.Invoices.Monthly.Create': 'true',
  'Pages.Invoices.Monthly.Edit': 'true',
  'Pages.Invoices.Monthly.Delete': 'true',
  'Pages.Invoices.Payments': 'true',
  'Pages.Invoices.Payments.GetAll': 'true',
  'Pages.Invoices.Payments.GetDetail': 'true',
  'Pages.Invoices.Payments.Create': 'true',
  'Pages.Invoices.Payments.Edit': 'true',
  'Pages.Invoices.Payments.Delete': 'true',
  'Pages.Invoices.Debt': 'true',
  'Pages.Invoices.Debt.GetAll': 'true',
  'Pages.Invoices.Debt.GetDetail': 'true',
  'Pages.Invoices.Debt.Create': 'true',
  'Pages.Invoices.Debt.Edit': 'true',
  'Pages.Invoices.Debt.Delete': 'true',
  'Pages.Invoices.ServiceFees': 'true',
  'Pages.Invoices.ServiceFees.GetAll': 'true',
  'Pages.Invoices.ServiceFees.GetDetail': 'true',
  'Pages.Invoices.ServiceFees.Create': 'true',
  'Pages.Invoices.ServiceFees.Edit': 'true',
  'Pages.Invoices.ServiceFees.Delete': 'true',
  'Pages.Invoices.PaymentAccounts': 'true',
  'Pages.Invoices.PaymentAccounts.GetAll': 'true',
  'Pages.Invoices.PaymentAccounts.GetDetail': 'true',
  'Pages.Invoices.PaymentAccounts.Create': 'true',
  'Pages.Invoices.PaymentAccounts.Edit': 'true',
  'Pages.Invoices.PaymentAccounts.Delete': 'true',
  'Pages.Invoices.StatementVerification': 'true',
  'Pages.Invoices.StatementVerification.GetAll': 'true',
  'Pages.Invoices.StatementVerification.Create': 'true',
  'Pages.Invoices.StatementVerification.Edit': 'true',
  'Pages.Invoices.StatementVerification.Delete': 'true',
  'Pages.Assets.AssetCatalog': 'true',
  'Pages.Assets.AssetCatalog.GetAll': 'true',
  'Pages.Assets.AssetCatalog.GetDetail': 'true',
  'Pages.Assets.AssetCatalog.Create': 'true',
  'Pages.Assets.AssetCatalog.Edit': 'true',
  'Pages.Assets.AssetCatalog.Delete': 'true',
  'Pages.Assets.AssetParameters': 'true',
  'Pages.Assets.AssetParameters.GetAll': 'true',
  'Pages.Assets.AssetParameters.GetDetail': 'true',
  'Pages.Assets.AssetParameters.Create': 'true',
  'Pages.Assets.AssetParameters.Edit': 'true',
  'Pages.Assets.AssetParameters.Delete': 'true',
  'Pages.LocalAmenities.List': 'true',
  'Pages.LocalAmenities.List.GetAll': 'true',
  'Pages.LocalAmenities.List.GetDetail': 'true',
  'Pages.LocalAmenities.List.Create': 'true',
  'Pages.LocalAmenities.List.Edit': 'true',
  'Pages.LocalAmenities.List.Delete': 'true',
  'Pages.Operations.OrganizationStructure': 'true',
  'Pages.Operations.OrganizationStructure.GetAll': 'true',
  'Pages.Operations.OrganizationStructure.GetDetail': 'true',
  'Pages.Operations.OrganizationStructure.Create': 'true',
  'Pages.Operations.OrganizationStructure.Edit': 'true',
  'Pages.Operations.OrganizationStructure.Delete': 'true',
  'Pages.Operations.OrganizationUnits': 'true',
  'Pages.Operations.OrganizationUnits.GetAll': 'true',
  'Pages.Operations.OrganizationUnits.GetDetail': 'true',
  'Pages.Operations.OrganizationUnits.Create': 'true',
  'Pages.Operations.OrganizationUnits.Edit': 'true',
  'Pages.Operations.OrganizationUnits.Delete': 'true',
  'Pages.Operations.Personnel': 'true',
  'Pages.Operations.Personnel.GetAll': 'true',
  'Pages.Operations.Personnel.GetDetail': 'true',
  'Pages.Operations.Personnel.Create': 'true',
  'Pages.Operations.Personnel.Edit': 'true',
  'Pages.Operations.Personnel.Delete': 'true',
  'Pages.Operations.TaskManagement': 'true',
  'Pages.Operations.TaskManagement.GetAll': 'true',
  'Pages.Operations.TaskManagement.GetDetail': 'true',
  'Pages.Operations.TaskManagement.Create': 'true',
  'Pages.Operations.TaskManagement.Edit': 'true',
  'Pages.Operations.TaskManagement.Delete': 'true',
  'Pages.Operations.TaskTypeManagement': 'true',
  'Pages.Operations.TaskTypeManagement.GetAll': 'true',
  'Pages.Operations.TaskTypeManagement.GetDetail': 'true',
  'Pages.Operations.TaskTypeManagement.Create': 'true',
  'Pages.Operations.TaskTypeManagement.Edit': 'true',
  'Pages.Operations.TaskTypeManagement.Delete': 'true',
  'Pages.SystemAdministration.AccountManagement': 'true',
  'Pages.SystemAdministration.AccountManagement.GetAll': 'true',
  'Pages.SystemAdministration.AccountManagement.GetDetail': 'true',
  'Pages.SystemAdministration.AccountManagement.Create': 'true',
  'Pages.SystemAdministration.AccountManagement.Edit': 'true',
  'Pages.SystemAdministration.AccountManagement.Delete': 'true',
  'Pages.SystemAdministration.Roles': 'true',
  'Pages.SystemAdministration.Roles.GetAll': 'true',
  'Pages.SystemAdministration.Roles.GetDetail': 'true',
  'Pages.SystemAdministration.Roles.Create': 'true',
  'Pages.SystemAdministration.Roles.Edit': 'true',
  'Pages.SystemAdministration.Roles.Delete': 'true',
  'Pages.DocumentManagement.List': 'true',
  'Pages.DocumentManagement.List.GetAll': 'true',
  'Pages.DocumentManagement.List.GetDetail': 'true',
  'Pages.DocumentManagement.List.Create': 'true',
  'Pages.DocumentManagement.List.Edit': 'true',
  'Pages.DocumentManagement.List.Delete': 'true',
  'Pages.DocumentManagement.Type': 'true',
  'Pages.DocumentManagement.Type.GetAll': 'true',
  'Pages.DocumentManagement.Type.GetDetail': 'true',
  'Pages.DocumentManagement.Type.Create': 'true',
  'Pages.DocumentManagement.Type.Edit': 'true',
  'Pages.DocumentManagement.Type.Delete': 'true',
  'Pages.Residents.Verification': 'true',
  'Pages.Residents.Information': 'true',
  'Pages.Government.ChatCitizen': 'true',
  'Pages.Government.Citizens.Reflects': 'true',
  'Pages.Government.Citizens.Reflects.View': 'true',
  'Pages.Government.Citizens.Reflects.Create': 'true',
  'Pages.Government.Citizens.Reflects.Update': 'true',
  'Pages.Government.Citizens.Reflects.Delete': 'true',
  'Pages.Government.Citizens.Reflects.Chat': 'true',
  'Pages.Government.Citizens.Reflects.Handle': 'true',
  'Pages.Government.Citizens.Reflects.AssignDepartment': 'true',
  'Pages.Government.Citizens.Reflects.AssignHandler': 'true',
  'Pages.Government.Citizens.Vote': 'true',
  'Pages.Government.Digital.Notices': 'true',
  'Pages.Government.DigitalDaily': 'true',
  'Pages.Government.Question_Answer': 'true',
  'Pages.Users': 'true',
  'Pages.Roles': 'true',
  'Pages.Tenants': 'true',
  'Pages.Admin.Type_Local_Service': 'true',
  'Pages.Admin.Organization_Units': 'true',
  'Pages.Admin.Type_Administrative': 'true',
  'Pages.Admin.Tenant_Settings': 'true',
  'Pages.Admin.Organization_Structure': 'true',
  'Pages.Settings.Images': 'true',
};

export type TPermission = keyof typeof allPermissions;

export type TPagingParams = {
  skipCount?: number;
  maxResultCount?: number;
};
