import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';
import RestAngular from 'restangular';
import uiBootstrap from 'angular-ui-bootstrap';
import satellizer from 'satellizer';

angular.module('app', [
    uiRouter,
    Common,
    Components,
    RestAngular,
    uiBootstrap,
    satellizer
  ])
  .config(($locationProvider) => {
    "ngInject";
    // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
    // #how-to-configure-your-server-to-work-with-html5mode
    $locationProvider.html5Mode(true).hashPrefix('!');
  })
    .config(function($authProvider) {
        "ngInject"
        $authProvider.httpInterceptor = function() { return true; };
        $authProvider.withCredentials = false;
        $authProvider.tokenRoot = null;
        $authProvider.baseUrl = 'http://localhost:8000';
        $authProvider.loginUrl = '/api/login_check';
    })

    .component('app', AppComponent)
    .config(['RestangularProvider', function(RestangularProvider) {
        // The URL of the API endpoint
        RestangularProvider.setBaseUrl('http://localhost:8000/api');

        // JSON-LD @id support
        RestangularProvider.setRestangularFields({
            id: '@id',
            selfLink: '@id'
        });
        RestangularProvider.setSelfLinkAbsoluteUrl(false);

        // Hydra collections support
        RestangularProvider.addResponseInterceptor(function(data, operation) {
            // Remove trailing slash to make Restangular working
            function populateHref(data) {
                if (data['@id']) {
                    data.href = data['@id'].substring(1);
                }
            }

            // Populate href property for the collection
            populateHref(data);

            if ('getList' === operation) {
                var collectionResponse = data['hydra:member'];
                collectionResponse.metadata = {};

                // Put metadata in a property of the collection
                angular.forEach(data, function(value, key) {
                    if ('hydra:member' !== key) {
                        collectionResponse.metadata[key] = value;
                    }
                });

                // Populate href property for all elements of the collection
                angular.forEach(collectionResponse, function(value) {
                    populateHref(value);
                });

                return collectionResponse;
            }

            return data;
        });
    }])




;
