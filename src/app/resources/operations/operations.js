angular.module('resources.operations', [
    'resources.operations.categorygetbycode',
    'resources.operations.categorygetbyidandcode',
    /*
    'resources.operations.documentfile.getbyid',
    'resources.operations.listing.getall',
    'resources.operations.listing.get',
    'resources.operations.listing.getbycategoryid',
    'resources.operations.mutualfund.get',
    */
    'marketdata.models.resources',
    'marketdata.models.operations'
])
    .config(function ($stateProvider, $mdIconProvider) {
        $stateProvider
            .state('marketdata.resources.operations', {
                url: 'resources/:resource',
                views: {
                    'operations@': {
                        templateUrl: 'src/app/resources/operations/operations.tmpl.html',
                        controller: 'OperationsListCtrl as operationsListCtrl'
                    }
                }
            });
        $mdIconProvider.icon('share', './src/assets/svg/share.svg', 24);
    })
    .controller('OperationsListCtrl', function OperationsListCtrl($state, $stateParams, ResourcesModel, OperationsModel) {
        var operationsListCtrl = this;

        ResourcesModel.setCurrentResource($stateParams.resource);

        OperationsModel.getOperations()
            .then(function (operations) {
                operationsListCtrl.operations = operations;
            });

        function callOperation(operation) {
          switch (operation.absolutename) {
            case 'Category_GetByCode':
              $state.go('marketdata.resources.operations.categorygetbycode', {
                operationId: operation.id
              })
              break;
            case 'Category_GetSubCategoryByShareCompanyListingIdAndCategoryCode':
              $state.go('marketdata.resources.operations.categorygetbyidandcode', {
                operationId: operation.id
              })
              break;
            /*
            case 'DocumentFile_GetById':
              $state.go('marketdata.resources.operations.documentfile.getbyid', {
                operationId: operation.id
            })
            case 'Listing_GetAll':
              $state.go('marketdata.resources.operations.listing.getall', {
                operationId: operation.id
            })
            case 'Listing_Get':
              $state.go('marketdata.resources.operations.listing.get', {
                operationId: operation.id
            })
            case 'Listing_GetByCategoryId':
              $state.go('marketdata.resources.operations.listing.getbycategoryid', {
                operationId: operation.id
            })
            case 'MutualFund_Get':
              $state.go('marketdata.resources.operations.mutualfund.get', {
                operationId: operation.id
            })
            */
          }
        }

        operationsListCtrl.getCurrentResource = ResourcesModel.getCurrentResource;
        operationsListCtrl.getCurrentResourceName = ResourcesModel.getCurrentResourceName;
        operationsListCtrl.callOperation = callOperation;
    });
