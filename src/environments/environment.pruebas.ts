import * as npm  from '../../package.json';

export const environment = {
  production: true,
  VERSION: npm.version,
  aplicativo: 'SIM',
  dataServiceUrl: 'http://201.217.213.248/api/sim',
  dataServiceMisionalUrl: 'http://201.217.213.248/api/sim',
  urls: {
    SIM: 'http://201.217.213.248:81',
    DAI: 'http://201.217.213.248:83',
    GCDI: 'http://201.217.213.248:82',
    SICEQ: 'http://201.217.213.248:86',
    PCR: 'http://201.217.213.248:85',
    CDJ: 'http://201.217.213.248:84',
    SICAAC: 'http://201.217.213.248:87'
  }
};
