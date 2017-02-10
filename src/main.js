import { getWelcomeMessage } from './modules/exampleModule';
import './styles/core.scss';

const MOUNT_NODE = document.getElementById('root');

let render = () => {
  if ((typeof __STYLEGUIDE__ !== 'undefined' && __STYLEGUIDE__)) {
    // Do not do anything when on the styleguide.
    return;
  }

  MOUNT_NODE.innerHTML = getWelcomeMessage();
};

if (__DEV__ && (typeof __STYLEGUIDE__ === 'undefined' || !__STYLEGUIDE__)) {
  if (module.hot) {
    // Development render functions.
    const renderApp = render;
    const renderError = (error) => {
      MOUNT_NODE.innerHTML = error.message;
    };

    // Wrap render in try/catch.
    render = () => {
      try {
        renderApp();
      } catch (error) {
        console.error(error);
        renderError(error);
      }
    };

    // Setup hot module replacement.
    module.hot.accept(() => {
      render();
    });

    // Hot module replacement can be set up more complex here. For example, if using react:
    //
    // module.hot.accept('./routes/index', () =>
    //   setImmediate(() => {
    //     ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    //     render();
    //   });
    // );
  }
}

render();
