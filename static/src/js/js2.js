odoo.define('stock_sold_qty.tree_view_button', function (require){
    "use strict";

    var ajax = require('web.ajax');
    var ListController = require('web.ListController');

    var rpc = require('web.rpc');
    var user = session.uid;

    ListController.include({
        renderButtons: function($node) {
            this._super.apply(this, arguments);
            var self = this;


            if (this.$buttons) {
                $(this.$buttons).find('.oe_print_custom_stock_sold_qty_button').on('click', function() {
                    rpc.query({
                        model: 'stock.sold.qty',
                        method: 'printProductSoldQty',
                        args: [[user],{'id':user}],
                    }).then(function(res){
                        // console.log(res);
                        self.reload();
                    })
                });
            }
        },
    });
});