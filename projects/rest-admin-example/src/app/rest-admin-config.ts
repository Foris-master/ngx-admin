import { PERMISSION, REST_CONFIG, STRATEGY_AUTH } from 'rest-admin';
import { resources } from './resources';

export const RESOURCES_CONFIG: REST_CONFIG = {
  name: 'My admin',
  baseUrl: 'https://api.example.com/api',
  resources: resources,
  authConfig: {
    strategy: STRATEGY_AUTH.EMAIL,
    loginEndPoint: '/auth/signin',
    logoutEndPoint: '/auth/logout',
    // userInfoEndPoint: '/users/me',
    // profileNameEndPoint: 'name',
    // profilePictureEndPoint: 'picture',
    redirectRouteAfterLogin: '/address', //just put the resource name
  },
  googleMapApiKey: 'googleMaspKeyss',
  permissions: [
    {
      type: PERMISSION.CANLOGIN,
      fieldKey: {
        api: '/users/me',
        fieldForNextQuery: ['original.is_c'],
      },
    },
  ],
};
