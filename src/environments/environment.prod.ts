import * as npm  from '../../package.json';

export const environment = {
  production: true,
  VERSION: npm.version,
  aplicativo: 'SIM',
  dataServiceUrl: 'https://api-sim.azurewebsites.net',
  dataServiceMisionalUrl: 'https://api-sim.azurewebsites.net',
  urls: {
    SIM: 'https://integracionsim.z21.web.core.windows.net',
    DAI: 'https://frontdai.z21.web.core.windows.net',
    GCDI: 'https://gcdi.z21.web.core.windows.net',
    SICEQ: 'https://siceq.z21.web.core.windows.net',
    PCR: 'https://integracionpcr.z21.web.core.windows.net',
    CDJ: 'https://integracioncdj.z21.web.core.windows.net',
    SICAAC: 'https://integracionsicaac.z21.web.core.windows.net'
  }
};
