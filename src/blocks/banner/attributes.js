const attributes = {
	id: {
		type: 'number',
	},
	url: {
		type: 'string',
		source: 'attribute',
		selector: '.wp-block-getwid-banner__source',
		attribute: 'src',
	},	
	type: {
		type: 'string',
		default: 'image',
	},	
	title: {
		type: 'string',
		source: 'html',
		selector: 'span',
	},
	text: {
		type: 'string',
		source: 'html',
		selector: 'p',
	},	
	link: {
		type: 'string',
		source: 'attribute',
		selector: '.wp-block-getwid-banner a',
		attribute: 'href',
	},
	newWindow: {
		type: 'boolean',
		default: false,
	},		
	align: {
		type: 'string',
	},
	minHeight: {
		type: 'string',
	},	
	verticalAlign: {
		type: 'string',
		default: 'center',
	},
	horizontalAlign: {
		type: 'string',
		default: 'center',
	},

	textColor: {
		type: 'string',
	},
	overlayColor: {
		type: 'string',
	},
	backgroundOpacity: {
		type: 'number',
		default: 35,
	},

	blockAnimation: {
		type: 'string',
		default: 'style4',
	},
	textAnimation: {
		type: 'string',
		default: 'text-opacity-bottom',
	},
};

export default attributes;