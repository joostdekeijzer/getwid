/**
* Internal dependencies
*/
import Edit from './edit';
import Save from './save';
import Save_deprecated from './save_deprecated';
import attributes from './attributes';
import Attributes_deprecated from './attributes_deprecated';

/**
* External dependencies
*/
import { __ } from 'wp.i18n';
const {jQuery: $} = window;

const { registerBlockType } = wp.blocks;

/**
* Module Constants
*/
const baseClass = 'wp-block-getwid-media-text-slider-slide';

/**
* Register the block
*/
registerBlockType( 'getwid/media-text-slider-slide', {
	title: __( 'Slide', 'getwid' ),
	icon: {	
		src: 'format-gallery',
	},
	keywords: [ ],	
	category: 'getwid-blocks',
	parent: [ 'getwid/media-text-slider' ],
	attributes,
	deprecated: [
		{
			attributes: Attributes_deprecated,     
			save: Save_deprecated
		}
	],	
	getEditWrapperProps( attributes ) {
		return { 'data-slide': attributes.id };
	},
	edit: Edit,
	save: props => (
		<Save {...{
			...props,
			baseClass
		}}/>
	)
} );