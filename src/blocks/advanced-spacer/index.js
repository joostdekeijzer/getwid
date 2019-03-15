import edit from './edit';
import save from './save.js';
import attributes from './attributes';

const { __ } = wp.i18n;

const {
	registerBlockType,
} = wp.blocks;

export default registerBlockType(
	'getwid/advanced-spacer',
	{
		title: __('Advanced Spacer', 'getwid'),
		category: 'getwid-blocks',
		icon: <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g><path d="M13 4v2h3.59L6 16.59V13H4v7h7v-2H7.41L18 7.41V11h2V4h-7"></path></g></svg>,
		attributes,
		save,
        edit,
	}
);