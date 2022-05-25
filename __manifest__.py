{
	'name': 'Stock Available Quantity Value', 
	'data': [
		# 'views/graph.xml',
		'views/views.xml',
		# 'views/assets.xml',
		# 'reports/report.xml',
		'security/ir.model.access.csv',
		],
	'depends': ['account','stock','stock_account'],
	'sequence': - 121,
	'application': True,

	'qweb': [
        "static/src/xml/buttons.xml",

    ],
}