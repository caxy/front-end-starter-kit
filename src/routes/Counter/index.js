import _ from 'lodash';
import { injectReducer } from '../../store/reducers';
import { injectMultipleSagas } from '../../store/sagas';

export default (store) => ({
  path : 'counter',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Counter = require('./containers/CounterContainer').default;
      const reducer = require('./modules/counter').default;
      const sagas = require('./modules/counter').sagas;

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'counter', reducer });

      /* Add the sagas */
      injectMultipleSagas(store, sagas);

      /*  Return getComponent   */
      cb(null, Counter);

    /* Webpack named bundle   */
    }, 'counter')
  }
});
