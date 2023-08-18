const header = {
  create: 'Create Survey',
  update: 'Update Survey',
  detail: 'Survey Details',
};

const create = {
  create: 'Create New Survey',
  update: 'Update Survey',
  name: 'Survey Name',
  description: 'Survey Description',
  time: 'Survey Time',
  to: 'To',
  options: 'Survey Options',
  add: 'Add Option',
  delete: 'Delete Option',
};

const toastNoti = {
  createSuccess: 'Survey Created Successfully',
  createFail: 'Survey Creation Failed',
  updateSuccess: 'Survey Updated Successfully',
  updateFail: 'Survey Update Failed',
  optionRequired: 'Please add an option',
};

const main = {
  status: 'Survey Status',
};

const status = {
  all: 'All',
  expired: 'Expired',
  inProgress: 'In Progress',
  comming: 'Upcoming',
};

const detail = {
  name: 'Survey Name',
  description: 'Survey Description',
  scope: 'Survey Scope',
  totalVotes: 'Total Votes',
  timeVote: 'Survey Time',
  result: 'Survey Result',
  notParticipate: 'Not Participate',
};

const vote = {
  header,
  toastNoti,
  create,
  main,
  status,
  detail,
};

export default vote;
