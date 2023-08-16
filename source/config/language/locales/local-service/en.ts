const status: {[key: string]: string} = {
  all: 'All',
  expired: 'Expired',
  requesting: 'Requesting',
  accepted: 'Accepted',
  cancel: 'Canceled',
  complete: 'Completed',
  denied: 'Denied',
};

const booking = {
  creationTime: 'Creation Time',
  customerName: 'Customer Name',
  customerPhoneNumber: 'Customer Phone Number',
  buildingCode: 'Building Code',
  address: 'Address',
  bookingDate: 'Booking Date',
  bookingTime: 'Booking Time',
  refuseReason: 'Refuse Reason',
  service: 'Service',
};

const localService = {
  status,
  booking,
};

export default localService;
