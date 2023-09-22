import {
  EResidentFormId,
  EResidentState,
} from '@/screens/resident/services/resident.model';

const resident = {
  apartmentCode: 'Apartment code',
  buildingCode: 'Building code',
  dateOfBirth: 'Date of birth',
  gender: 'Gender',
  fullName: 'Full name',
  phoneNumber: 'Phone number',
  email: 'Email address',
  identityNumber: 'Identity number',
  relationship: 'Relationship with the head of household',
  nationality: 'Nationality',
  residentInformation: 'Resident information',
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
