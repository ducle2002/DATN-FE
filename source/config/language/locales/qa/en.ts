const state: {[key: string]: string} = {
  all: 'All',
  accept: 'Accept',
  denied: 'Denied',
  new: 'New',
  state: 'State',
};

const qa = {
  question: 'Question',
  creator: 'Creator',
  crationTime: 'Creation Time',
  content: 'Content',
  state,
  commentState_interval: '(0)[Unanswered];(1-inf)[Answered]',
  answer: 'Answer',
  respondent: 'Respondent',
};

export default qa;
