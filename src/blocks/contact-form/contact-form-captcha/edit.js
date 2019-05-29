/**
* External dependencies
*/
import { __ } from 'wp.i18n';
import { isEqual } from 'lodash';
import { addScript } from 'GetwidUtils/help-functions';

/**
* WordPress dependencies
*/
const {
	Component,
	Fragment
} = wp.element;

const {
	Button,
	TextControl,
	Disabled,
	PanelBody,
	ButtonGroup,
	BaseControl,
	ExternalLink,
	SelectControl
} = wp.components;

const {
	InspectorControls
} = wp.editor;

/**
* Create an Component
*/
class Edit extends Component {

	constructor() {
		super(...arguments);

		this.getState 	 = this.getState.bind(this);
		this.changeState = this.changeState.bind(this);

		this.manageRecaptchaAPIKey 	  = this.manageRecaptchaAPIKey.bind(this);
		this.removeRecaptchaAPIScript = this.removeRecaptchaAPIScript.bind(this);
		this.addRecaptchaAPIScript 	  = this.addRecaptchaAPIScript.bind(this);
		this.addCaptchaElement 		  = this.addCaptchaElement.bind(this);
		this.deleteCaptchaElement 	  = this.deleteCaptchaElement.bind(this);
		this.renderCaptcha 			  = this.renderCaptcha.bind(this);

		this.state = {
			recaptchaSiteKey  : Getwid.settings.recaptcha_site_key   != '' ? Getwid.settings.recaptcha_site_key  : '',
			recaptchaSecretKey: Getwid.settings.recaptcha_secret_key != '' ? Getwid.settings.recaptcha_secret_key: '',

			checkSiteKey  : Getwid.settings.recaptcha_site_key   != '' ? Getwid.settings.recaptcha_site_key  : ' ',
			checkSecretKey: Getwid.settings.recaptcha_secret_key != '' ? Getwid.settings.recaptcha_secret_key: '',

			updateCaptcha: false
		};
	}

	/* #region manage captcha */
	manageRecaptchaAPIKey(event, option) {
		event.preventDefault();

		const getState    = this.getState;
		const changeState = this.changeState;

		const deleteCaptchaElement = this.deleteCaptchaElement;

		const data = {
			'action': 'getwid_recaptcha_api_key',
			'data': {
				'site_api_key': getState('checkSiteKey'),
				'secret_api_key': getState('checkSecretKey')
			},
			'option': option
		};

		deleteCaptchaElement();

		if (option == 'set') {

			Getwid.settings.recaptcha_site_key   = getState('checkSiteKey'  );
			Getwid.settings.recaptcha_secret_key = getState('checkSecretKey');

		} else if (option == 'delete') {

			Getwid.settings.recaptcha_site_key   = '';
			Getwid.settings.recaptcha_secret_key = '';
		}

		changeState('updateCaptcha', true);

		$.post(Getwid.ajax_url, data, () => { });
	}

	renderCaptcha() {
		const { attributes: { theme }, baseClass } = this.props;

		const changeState = this.changeState;
		const getState    = this.getState;

		grecaptcha.ready(() => {
			const captcha = $(`.${baseClass}__reCAPTCHA`).get(0);
			this.captchaId = grecaptcha.render(captcha, {
				'sitekey': getState('checkSiteKey'),
				'theme': theme
			});
			changeState('updateCaptcha', false);
		});
	}

	addRecaptchaAPIScript() {

		const addCaptchaElement = this.addCaptchaElement;
		const renderCaptcha     = this.renderCaptcha;

		addCaptchaElement();
		addScript('https://www.google.com/recaptcha/api.js?render=explicit&hl=en', (script) => {
			script.id = 'reCAPTCHA_api_js';
			renderCaptcha();
		});
	}

	removeRecaptchaAPIScript() {
		const $main_google_js = $('#reCAPTCHA_api_js');

		if ($main_google_js.length) {
			$main_google_js.remove();
		}

		const $other_google_js = $('script[src*=\'www.gstatic.com\']');

		if ($other_google_js.length) {
			$.each($other_google_js, (index, value) => {
				$(value).remove();
			});
		}

		window.grecaptcha = {};
	}
	/* #endregion */

	/* #region manage captcha element */
	addCaptchaElement() {
		const { className, baseClass } = this.props;
		const captchaElement = document.createElement('div');

		$(captchaElement).addClass(`${baseClass}__reCAPTCHA`);
		$(`.${className}`).find(`.${className}__wrapper`).after($(captchaElement));
	}

	deleteCaptchaElement() {
		const { baseClass } = this.props;
		$(`.${baseClass}__reCAPTCHA`).remove();
	}
	/* #endregion */

	changeState(param, value) {
		this.setState({ [param]: value });
	}

	getState(value) {
		return this.state[value];
	}

	render() {
		const {
			attributes: {
				theme
			},

			className,
			setAttributes

		} = this.props;

		const getState    = this.getState;
		const changeState = this.changeState;

		const deleteCaptchaElement  = this.deleteCaptchaElement;
		const manageRecaptchaAPIKey = this.manageRecaptchaAPIKey;

		return (
			<Fragment>
				<div className={`${className}`}>
					<Disabled>
						<div className={`${className}__wrapper`}></div>
					</Disabled>
				</div>

				<InspectorControls>
					<PanelBody title={__('Recaptcha(V_2) Settings', 'jetpack')}>

						<BaseControl>
							<SelectControl
								label={__('Color Theme', 'getwid')}
								value={theme}
								onChange={(theme) => {
									deleteCaptchaElement();
									setAttributes({ theme });
								}}
								options={[
									{ value: 'dark', label: __('Dark', 'getwid') },
									{ value: 'light', label: __('Light', 'getwid') }
								]}
							/>
							<TextControl
								label={__('Recaptcha Site Key', 'getwid')}
								value={getState('checkSiteKey')}
								onChange={value => {
									changeState('checkSiteKey', value);
								}}
							/>
							<TextControl
								label={__('Recaptcha Secret Key', 'getwid')}
								value={getState('checkSecretKey')}
								onChange={value => {
									changeState('checkSecretKey', value);
								}}
							/>
						</BaseControl>

						<BaseControl>
							<ButtonGroup>
								<Button
									isPrimary
									disabled={((getState('checkSiteKey') != '' && getState('checkSecretKey') != '') ? null : true)}
									onClick={
										(event) => {
											manageRecaptchaAPIKey(event, 'set');
										}
									}>
									{__('Update', 'getwid')}
								</Button>

								<Button isDefault onClick={
									(event) => {
										changeState('checkSiteKey', ' ');
										changeState('checkSecretKey', '');

										manageRecaptchaAPIKey(event, 'delete');
									}
								}>
									{__('Delete', 'getwid')}
								</Button>
							</ButtonGroup>
						</BaseControl>

						<BaseControl>
							<ExternalLink href='https://www.google.com/recaptcha/intro/v3.html'> {__('Get your key.', 'getwid')} </ExternalLink>
						</BaseControl>

					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	}

	componentDidMount() {
		const addRecaptchaAPIScript = this.addRecaptchaAPIScript;
		addRecaptchaAPIScript();
	}

	componentDidUpdate(prevProps, prevState) {

		const addCaptchaElement = this.addCaptchaElement;
		const renderCaptcha     = this.renderCaptcha;
		const getState 			= this.getState;

		const { attributes: { theme } } = this.props;

		if (prevProps.isSelected === this.props.isSelected) {
			if (getState('updateCaptcha') || !isEqual(theme, prevProps.attributes.theme)) {
				addCaptchaElement();
				renderCaptcha();
			}
		}
	}

	componentWillUnmount() {
		this.removeRecaptchaAPIScript();
	}
}

export default (Edit);