/**
* External dependencies
*/
import { __ } from 'wp.i18n';

/**
* WordPress dependencies
*/
const {
	TextControl,
	ToggleControl
} = wp.components;

const {
	Component,
	Fragment
} = wp.element;

/**
* Create an Component
*/
class Edit extends Component {

	constructor() {
		super(...arguments);
	}

	render() {
		const {
			attributes: {
				isRequired,
				label,
				name
			},

			isSelected,

			baseClass,
			className,
			setAttributes

		} = this.props;

		const required = isRequired == 'true' ? true : false;

		return (
			<Fragment>
				<div className={`${className}`}>
					<div className={`${baseClass}__label-wrapper`}>
						<textarea
							className={`${baseClass}__label`}
							placeholder={__('Name', 'getwid')}
							value={label ? label : ''}
							onChange={event => {
								setAttributes({ label: event.target.value });
							}}
						></textarea>

						{ isSelected && (
								<ToggleControl
									label={__('Required', 'getwid')}
									className={`${baseClass}__required`}
									checked={required}
									onChange={value => {
										setAttributes({ isRequired: value ? 'true' : 'false' });
									}}
								/>
						) }
						{ ! isSelected && required && (
							<span className={'required'}>{__('(required)', 'getwid')}</span>
						)}
					</div>

					<div className={`${baseClass}__input`}>
						<TextControl
							type={'text'}
							value={name ? name : ''}
							onChange={value => {
								setAttributes({ name: value });
							}}
						/>
					</div>

				</div>
			</Fragment>
		);
	}
}

export default (Edit);