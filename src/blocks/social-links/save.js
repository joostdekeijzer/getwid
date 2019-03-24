import classnames from 'classnames';
/**
 * Internal block libraries
 */
const {__} = wp.i18n;

const {Component, Fragment} = wp.element;

const {jQuery: $} = window;

const {
	getColorClassName
} = wp.editor;

const className = 'wp-block-getwid-social-links';

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Edit extends Component {

	constructor() {
		super(...arguments);

		this.icon_render = this.icon_render.bind(this);
		this.icon_block = this.icon_block.bind(this);
	}

	icon_block(item) {
		const {
			attributes: {
				iconsStyle,
			},
			backgroundColor,
			textColor,
			customBackgroundColor,
			customTextColor				
		} = this.props;

		const textClass = getColorClassName( 'color', textColor );
		const backgroundClass = getColorClassName( 'background-color', backgroundColor );

		return(
			<Fragment>
				<span
					className={
						classnames(`${className}__wrapper`,{			
							'has-text-color': textColor || customTextColor,
							[ textClass ]: textClass,
							'has-background': (backgroundColor || customBackgroundColor) && 'stacked' == iconsStyle,
							[ backgroundClass ]: (backgroundClass) && 'stacked' == iconsStyle,
						})
					}
					style={{
						color: (customTextColor ? customTextColor : undefined),
						backgroundColor : (iconsStyle == 'stacked' ? (customBackgroundColor ? customBackgroundColor : undefined) : undefined)
					}}							
				>
					<i
					/* style={{
						color: (item.color ? item.color : undefined),
						backgroundColor : (iconsStyle == 'stacked' ? (item.background ? item.background : undefined) : undefined)
					}} */
					className={item.icon}
					/* data-color={(item.color ? item.color : undefined)}
					data-bg-color={(item.background ? item.background : undefined)} */
					></i>
				</span>
			</Fragment>
		);
	};

	icon_render(item, el_index) {
		return (
			<Fragment>		
				<a
					className={`${className}__link`}
					href={(item.link !='' ? item.link : '#')}
					target={ (item.linkTarget == '_blank' ? item.linkTarget : undefined ) }
					rel={ (item.rel ? item.rel : undefined ) }
					>
					{this.icon_block(item)}
				</a>
			</Fragment>
		);
	};

	render() {

		const {
			attributes: {
				textAlignmentDesktop,
				textAlignmentTablet,
				textAlignmentMobile,
				icons,
				iconsStyle,
				iconsSize,
				iconsSpacing,
			},
		} = this.props;

		return (
			<div className={classnames(className,
				`is-${iconsSpacing}-spacing`,
				{
					[`is-stacked`]: iconsStyle === 'stacked',
					[`is-framed`]: iconsStyle === 'framed',
				}
			)}
			style={{
				fontSize: iconsSize,
			}}>
				<ul className={classnames(
					`${className}__list`,
					{
						//Desktop
						[`getwid-justify-content-flex-start`]: 'left' === textAlignmentDesktop,
						[`getwid-justify-content-center`]: 'center' === textAlignmentDesktop,
						[`getwid-justify-content-flex-end`]: 'right' === textAlignmentDesktop,
	
						//Tablet
						[`getwid-justify-content-tablet-flex-start`]: 'left' === textAlignmentTablet,
						[`getwid-justify-content-tablet-center`]: 'center' === textAlignmentTablet,
						[`getwid-justify-content-tablet-flex-end`]: 'right' === textAlignmentTablet,
						
						//Mobile
						[`getwid-justify-content-mobile-flex-start`]: 'left' === textAlignmentMobile,
						[`getwid-justify-content-mobile-center`]: 'center' === textAlignmentMobile,
						[`getwid-justify-content-mobile-flex-end`]: 'right' === textAlignmentMobile,	
					}	
				)}>
					{icons.map((item, index) => {

						const item_classes = classnames(`${className}__item`);

						return(
							<li	className={item_classes}>
								{this.icon_render(item, index)}
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
}