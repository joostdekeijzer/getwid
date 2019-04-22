/**
* External dependencies
*/
import classnames from 'classnames';
import './style.scss'
import attributes from './attributes';
import edit from './edit';


/**
* WordPress dependencies
*/
import { __ } from 'wp.i18n';
const {
	registerBlockType,
} = wp.blocks;
const {
	RichText
} = wp.editor;
const {
	SVG,
	Path
} = wp.components;
const { Fragment } = wp.element;


/**
* Module Constants
*/
const baseClass = 'wp-block-getwid-accordion';


/**
* Register the block
*/
registerBlockType('getwid/accordion', {
	title: __('Accordion', 'getwid'),
	icon: <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><Path d="M0,0v6h24V0H0z M22,4H2V2h20V4z"/></g><g><Path d="M0,18v6h24v-6H0z M22,22H2v-2h20V22z"/></g><g><Path d="M0,8v8h24V8H0z M22,14H2v-4h20V14z"/></g></SVG>,
	category: 'getwid-blocks',
	keywords: [
		__('toggle', 'getwid')
	],
	supports: {
		align: [ 'wide', 'full' ],
	},
	attributes: attributes,
	edit,
	save: props => {
		const {
			attributes: {
				titles,
				items,
				iconPosition,
				iconOpen,
				iconClose,
				active,
				headerTag,
				
				className
			}
		} = props;

		const Tag = headerTag;

		return (
			<div className={classnames(className, {
					'has-icon-left': iconPosition === 'left'
				})} 
				data-active-element={active}
			>
				{titles.map((item, index) => (
					<Fragment>
						<div className={`${baseClass}__header-wrapper`} key={'header'}>
							<Tag className={`${baseClass}__header`}>
								<a href="#">
									<RichText.Content tagName='span' className={`${baseClass}__header-title`} value={item.content}/>
									<span className={`${baseClass}__icon is-active`}><i className={iconClose}></i></span>
									<span className={`${baseClass}__icon is-passive`}><i className={iconOpen}></i></span>
								</a>
							</Tag>							
						</div>
						<div className={`${baseClass}__content`} key={'content'}>
							<RichText.Content value={items[index].content}/>
						</div>
					</Fragment>	
				))}
			</div>
		);
	},
});