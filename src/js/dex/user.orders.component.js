(function () {
    'use strict';

    var types = {
        buy: 'Buy',
        sell: 'Sell'
    };

    function denormalizeUserOrders(orders) {
        if (!orders || !orders.length) {
            return [];
        }

        return orders.map(function (order) {
            var price = order.price.toTokens(),
                amount = order.amount.toTokens();
            return {
                id: order.id,
                status: order.status,
                type: types[order.orderType],
                price: price,
                amount: amount,
                total: price * amount
            };
        });
    }

    function UserOrdersController() {
        var ctrl = this;

        ctrl.cancel = function (obj) {
            ctrl.cancelOrder(obj.order);
        };

        ctrl.$onChanges = function () {
            ctrl.orders = denormalizeUserOrders(ctrl.rawOrders);
        };
    }

    angular
        .module('app.dex')
        .component('wavesDexUserOrders', {
            controller: UserOrdersController,
            bindings: {
                pair: '<',
                rawOrders: '<orders',
                cancelOrder: '<'
            },
            templateUrl: 'dex/user.orders.component'
        });
})();
