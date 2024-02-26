import {
  EResidentFormId,
  EResidentState,
} from '@/screens/resident/services/resident.model';

const resident = {
  apartmentCode: 'Apartment Code',
  buildingCode: 'Building Code',
  dateOfBirth: 'Date of Birth',
  gender: 'Gender',
  fullName: 'Full Name',
  phoneNumber: 'Phone Number',
  email: 'Email Address',
  identityNumber: 'Identity Number',
  relationship: 'Relationship with Household Owner',
  nationality: 'Nationality',
  residentInformation: 'Resident Declaration Information',
  urban: 'Urban Area',
  building: 'Building',
  identityImages: 'ID Card Images',
  homeAddress: 'Hometown',
};

const formId = {
  [EResidentFormId.ALL]: 'All',
  [EResidentFormId.NEW]: 'New',
  [EResidentFormId.CANCELLED]: 'Cancelled',
  [EResidentFormId.MUST_EDIT]: 'Need to edit',
  [EResidentFormId.VERIFIED]: 'Verified',
};

const state = {
  [EResidentState.CANCELLED]: 'Cancelled',
  [EResidentState.MATCHED]: 'Matched',
  [EResidentState.MISS_MATCHED]: 'Miss matched',
  [EResidentState.MUST_EDIT]: 'Request for revision',
  [EResidentState.NEW]: 'New',
  [EResidentState.VERIFIED]: 'Verified',
};

const residentLanguage = {
  resident,
  state,
  formId,
};

export default residentLanguage;
