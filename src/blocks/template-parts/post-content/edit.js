/**
* External dependencies
*/
import Inspector from './inspector';
import classnames from 'classnames';
import './editor.scss';


/**
* WordPress dependencies
*/
const {
	Component,
	Fragment,
} = wp.element;
const {
	withFallbackStyles
} = wp.components;
import { __ } from 'wp.i18n';
const {jQuery: $} = window;
const {
	BlockAlignmentToolbar,
	AlignmentToolbar,
	BlockControls,
	withColors,
	withFontSizes,
} = wp.blockEditor || wp.editor;

const { compose } = wp.compose;
const { getComputedStyle } = window;


const applyFallbackStyles = withFallbackStyles( ( node, ownProps ) => {
	const { textColor, backgroundColor, fontSize, customFontSize } = ownProps.attributes;
	const editableNode = node.querySelector( '[contenteditable="true"]' );
	//verify if editableNode is available, before using getComputedStyle.
	const computedStyles = editableNode ? getComputedStyle( editableNode ) : null;
	return {
		fallbackBackgroundColor: backgroundColor || ! computedStyles ? undefined : computedStyles.backgroundColor,
		fallbackTextColor: textColor || ! computedStyles ? undefined : computedStyles.color,
		fallbackFontSize: fontSize || customFontSize || ! computedStyles ? undefined : parseInt( computedStyles.fontSize ) || undefined,
	};
} );


/**
* Create an Component
*/
class Edit extends Component {
	constructor() {
		super( ...arguments );
	}

	render() {
		const {
			attributes: {
				textAlignment,
				showContent,
			},
			textColor,
			fontSize,

			className,

			setAttributes,
		} = this.props;

		var text = '';
		if (showContent == 'excerpt'){
			text = __('Post Content (excerpt)', 'getwid');
		} else if (showContent == 'content'){
			text = __('Post Content (content)', 'getwid');
		} else if (showContent == 'full'){
			text = __('Post Content (full content)', 'getwid');
		}

		return (
			<Fragment>
				<Inspector {...{
					...this.props,
				}} key='inspector'/>
				<BlockControls>
					<AlignmentToolbar
						value={ textAlignment }
						onChange={ textAlignment => setAttributes({textAlignment}) }
					/>
				</BlockControls>

				<div
					className={ classnames(
						className,
						{
							[ fontSize.class ]: fontSize.class,
						}
					)}
					style={{
						color: textColor.color,
						textAlign: textAlignment,
						fontSize: fontSize.size ? fontSize.size + 'px' : undefined,
					}}
				>
					{text}
				</div>

			</Fragment>
		);

	}
}

export default compose([
	withColors('backgroundColor', { textColor: 'color' }),
	withFontSizes( 'fontSize' ),
	applyFallbackStyles,
])(Edit);
