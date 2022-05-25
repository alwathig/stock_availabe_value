odoo.define('stock_sold_qty.stock_sold_qty_action_button', function (require) {
"use strict";
/**
 * Button 'Create' is replaced by Custom Button 
**/

var core = require('web.core');
var ListController = require('web.ListController');
ListController.include({
   renderButtons: function($node) {
   this._super.apply(this, arguments);
       if (this.$buttons) {
         this.$buttons.find('.oe_print_custom_stock_sold_qty_button').click(this.proxy('stock_sold_qty_action_def'));
       }
    },
      
    //--------------------------------------------------------------------------
    // Define Handler for new Custom Button
    //--------------------------------------------------------------------------

    /**
     * @private
     * @param {MouseEvent} event
     */
    stock_sold_qty_action_def: function (e) {
        var self = this;
        var active_id = this.model.get(this.handle).getContext()['active_ids'];
        var model_name = this.model.get(this.handle).getContext()['active_model'];
        
        var searchQuery = this._controlPanel ? this._controlPanel.getSearchQuery() : {};
        var record = self.model.get(self.handle, {raw: true});
        var domain = record.getDomain();
        this._rpc({
            model: 'stock.sold.qty',
            method: 'printProductSoldQty',
            args: ["", model_name, active_id, domain, searchQuery],
        }).then(function (result) {
            self.do_action(result);
        });
   },
});
});
