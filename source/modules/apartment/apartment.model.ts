export type TApartment = {
  id: number;
  imageUrl?: string;
  apartmentCode: string;
  name: string;
  ownerName?: string;
  ownerPhoneNumber?: string;
  buildingId: number;
  buildingName?: string;
  urbanId: number;
  urbanName?: string;
  area?: number;
  blockId?: number;
  blockName?: string;
  floorId?: number;
  floorName?: string;
  typeId?: number;
  typeName?: string;
  statusId?: number;
  colorCode?: string;
  provinceCode?: string;
  districtCode?: string;
  wardCode?: string;
  address?: string;
  description?: string;
  numberOfMember?: number;
};
