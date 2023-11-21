import * as npm  from '../../package.json';

export const environment = {
  production: false,
  VERSION: npm.version,
  aplicativo: 'SIM',
  dataServiceUrl: 'https://api-sim.azurewebsites.net',
  dataServiceMisionalUrl: 'https://api-sim.azurewebsites.net',
  // dataServiceUrl: 'https://localhost:5002',
  // dataServiceMisionalUrl: 'https://localhost:5002',
  urls: {
      SIM: 'http://localhost:4250',
      DAI: 'http://localhost:4260',
      GCDI: 'http://localhost:4270',
      SICEQ: 'http://localhost:4280',
      PCR: 'http://localhost:4290',
      CDJ: 'http://localhost:4300',
      SICAAC: 'http://localhost:4310'
  }
};
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
