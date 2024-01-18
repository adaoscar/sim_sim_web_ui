import * as npm  from '../../package.json';

export const environment = {
  production: true,
  VERSION: npm.version,
  aplicativo: 'SIM',
  dataServiceUrl: 'http://201.217.213.248/api/sim',
  dataServiceMisionalUrl: 'http://201.217.213.248/api/sim',
  urls: {
  

  SIM: ' http://186.86.242.184:81',
  DAI: 'http://201.217.213.248:83',
  GCDI: 'http://201.217.213.248:82',
  SICEQ: 'http://186.86.242.184:86',
  PCR: 'http://186.86.242.184:85',
  CDJ: 'http://186.86.242.184:84',
  SICAAC: 'http://186.86.242.184:87'
  }
};
