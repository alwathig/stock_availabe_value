from odoo import models, fields, api, _
from odoo.exceptions import ValidationError
from odoo.tools.float_utils import float_is_zero


class StockQuant(models.Model):
    _inherit = 'stock.quant'
    available_value = fields.Monetary('Available Value', compute='_compute_av_value', groups='stock.group_stock_manager',store=True)

    @api.depends('company_id', 'location_id', 'owner_id', 'product_id', 'quantity', 'available_quantity')
    def _compute_av_value(self):
        self.currency_id = self.env.company.currency_id
        for quant in self:
            # If the user didn't enter a location yet while enconding a quant.
            if not quant.location_id:
                quant.available_value = 0
                return

            if not quant.location_id._should_be_valued() or\
                    (quant.owner_id and quant.owner_id != quant.company_id.partner_id):
                quant.available_value = 0
                continue
            if quant.product_id.cost_method == 'fifo':
                quantity = quant.product_id.quantity_svl
                if float_is_zero(quantity, precision_rounding=quant.product_id.uom_id.rounding):
                    quant.available_value = 0.0
                    continue
                average_cost = quant.product_id.value_svl / quantity
                quant.available_value = quant.available_quantity * average_cost
            else:
                quant.available_value = quant.available_quantity * quant.product_id.standard_price
