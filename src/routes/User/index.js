import _ from 'lodash';
import { injectReducer } from '../../store/reducers';
import { injectMultipleSagas } from '../../store/sagas';
import { requireAuthentication } from 'containers/AuthenticatedComponent';
import ProfileRoute from './routes/Profile';
import { fetchUser } from './modules/user';

export default (store) => ({
  path : 'user',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const User = require('./containers/UserContainer').default;
      const reducer = require('./modules/user').default;
      const sagas = require('./modules/user').sagas;

      /*  Add the reducer to the store on key 'user'  */
      injectReducer(store, { key: 'user', reducer });

      /* Add the sagas */
      injectMultipleSagas(store, sagas);

      /*  Return getComponent   */
      cb(null, requireAuthentication(User));

    /* Webpack named bundle   */
    }, 'user')
  },
  indexRoute: ProfileRoute,
  childRoutes: [

  ],
  onEnter: (nextState, replace, callback) => {
    console.log(store.getState());
    store.dispatch(fetchUser(store.getState().auth.user.id));
    callback();
  }
});
