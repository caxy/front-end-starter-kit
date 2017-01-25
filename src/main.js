import './styles/core.scss'

const MOUNT_NODE = document.getElementById('root');

let render = () => {
  MOUNT_NODE.innerHTML = 'Caxy Front End Starter Kit!';
};

if (__DEV__) {
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
