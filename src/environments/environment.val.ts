import * as npm  from '../../package.json';

export const environment = {
  production: true,
  VERSION: npm.version,
  aplicativo: 'SIM',
  dataServiceUrl: 'https://api-sim-val.azurewebsites.net',
  dataServiceMisionalUrl: 'https://api-sim-val.azurewebsites.net',
  urls: {
    SIM: 'https://valsim.z21.web.core.windows.net',
    DAI: 'https://valdai.z21.web.core.windows.net',
    GCDI: 'https://valgcdi.z21.web.core.windows.net',
    SICEQ: 'https://valsiceq.z21.web.core.windows.net',
    PCR: 'https://valpcr.z21.web.core.windows.net',
    CDJ: 'https://valcdj.z21.web.core.windows.net',
    SICAAC: 'https://valsicaac.z21.web.core.windows.net'
  }
};
