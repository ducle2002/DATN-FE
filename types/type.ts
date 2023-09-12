export type TPermission =
  | 'Pages.About'
  | 'Pages.About.Edit'
  | 'Pages.Admin.Organization_Units'
  | 'Pages.Admin.Tenant_Settings'
  | 'Pages.Admin.Type_Administrative'
  | 'Pages.Admin.Type_Local_Service'
  | 'Pages.Administration'
  | 'Pages.Administrative'
  | 'Pages.Citizen'
  | 'Pages.Citizens.Information'
  | 'Pages.Citizens.Verification'
  | 'Pages.Forum'
  | 'Pages.Government'
  | 'Pages.Government.ChatCitizen'
  | 'Pages.Government.Citizens.Reflects'
  | 'Pages.Government.Citizens.Reflects.AssignDepartment'
  | 'Pages.Government.Citizens.Reflects.AssignHandler'
  | 'Pages.Government.Citizens.Reflects.Chat'
  | 'Pages.Government.Citizens.Reflects.Create'
  | 'Pages.Government.Citizens.Reflects.Delete'
  | 'Pages.Government.Citizens.Reflects.Handle'
  | 'Pages.Government.Citizens.Reflects.Update'
  | 'Pages.Government.Citizens.Reflects.View'
  | 'Pages.Government.Citizens.Vote'
  | 'Pages.Government.Digital.Notices'
  | 'Pages.Government.DigitalDaily'
  | 'Pages.Government.Question_Answer'
  | 'Pages.Home'
  | 'Pages.Management'
  | 'Pages.Management.ChatCitizen'
  | 'Pages.Management.Citizens.Reflects'
  | 'Pages.Management.Citizens.Vote'
  | 'Pages.Management.Digital.Notices'
  | 'Pages.Management.Hotline'
  | 'Pages.Management.Internal.CityNotifications'
  | 'Pages.Management.Newsfeed'
  | 'Pages.Management.Question_Answer'
  | 'Pages.Management_Common'
  | 'Pages.Management_Position'
  | 'Pages.Management_Staff'
  | 'Pages.News_Web_Imax'
  | 'Pages.ParkingManagement'
  | 'Pages.Partner'
  | 'Pages.Partner.Create_Store'
  | 'Pages.Partner.Management_Store'
  | 'Pages.Resident'
  | 'Pages.Residents.Information'
  | 'Pages.Residents.Verification'
  | 'Pages.Roles'
  | 'Pages.Services.Economy'
  | 'Pages.Services.Economy.Entertainment'
  | 'Pages.Services.Economy.Health_Care'
  | 'Pages.Services.Economy.Repair'
  | 'Pages.Services.Economy.Shopping'
  | 'Pages.Services.Economy.Work'
  | 'Pages.Services.Local_Amenities'
  | 'Pages.Services.Local_Amenities.Approve_Store'
  | 'Pages.Services.Local_Amenities.Create_Store'
  | 'Pages.Services.Local_Amenities.Report_User'
  | 'Pages.Services.Society'
  | 'Pages.Services.Society.Education'
  | 'Pages.Services.Society.Health'
  | 'Pages.Services.Society.Relics_Village'
  | 'Pages.Services.Society.Sport'
  | 'Pages.Services.Society.Stay'
  | 'Pages.Services.Society.Transport'
  | 'Pages.Services.Society.Travel'
  | 'Pages.Settings'
  | 'Pages.Settings.Images'
  | 'Pages.SmartCommunity.Apartment'
  | 'Pages.SmartCommunity.Building'
  | 'Pages.SmartCommunity.Fees'
  | 'Pages.SmartCommunity.Fees.Citizen'
  | 'Pages.SmartCommunity.Fees.Electrics'
  | 'Pages.SmartCommunity.Fees.Light'
  | 'Pages.SmartCommunity.Fees.Management'
  | 'Pages.SmartCommunity.Fees.Others'
  | 'Pages.SmartCommunity.Fees.Parkings'
  | 'Pages.SmartCommunity.Fees.Waters'
  | 'Pages.SmartCommunity.Management.Urban'
  | 'Pages.SmartCommunity.Urban'
  | 'Pages.SmartDevice'
  | 'Pages.SmartSocial'
  | 'Pages.SmartSocial.Education'
  | 'Pages.SmartSocial.Food'
  | 'Pages.SmartSocial.Goods'
  | 'Pages.SmartSocial.Health_Care'
  | 'Pages.SmartSocial.Repair'
  | 'Pages.SmartSocial.Sport'
  | 'Pages.SmartSocial.Tradition_Village'
  | 'Pages.SmartSocial.Transport'
  | 'Pages.SmartSocial.Travel'
  | 'Pages.SmartSocial.Work'
  | 'Pages.Tenants'
  | 'Pages.User.Detail'
  | 'Pages.Users'
  | 'Pages.Users.Activation'
  | 'Pages.SmartCommunity.OperationManagement'
  | 'Pages.SmartCommunity.OperationManagement.Material'
  | 'Pages.SmartCommunity.OperationManagement.Material.Delivery'
  | 'Pages.SmartCommunity.OperationManagement.Material.Inventory'
  | 'Pages.SmartCommunity.OperationManagement.Material.List'
  | 'Pages.SmartCommunity.OperationManagement.Material.Statistical'
  | 'Pages.SmartCommunity.OperationManagement.MaterialCategory'
  | 'Pages.SmartCommunity.OperationManagement.MaterialCategory.Group'
  | 'Pages.SmartCommunity.OperationManagement.MaterialCategory.Inventory'
  | 'Pages.SmartCommunity.OperationManagement.MaterialCategory.Producer'
  | 'Pages.SmartCommunity.OperationManagement.MaterialCategory.Type'
  | 'Pages.SmartCommunity.OperationManagement.MaterialCategory.Unit';

export type TPagingParams = {
  skipCount?: number;
  maxResultCount?: number;
};
