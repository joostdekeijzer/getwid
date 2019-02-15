import classnames from 'classnames';
import { times, escape, unescape} from 'lodash';
import './editor.scss'
import './style.scss'

const {
	Component,
	Fragment,
} = wp.element;
const {
	InnerBlocks,
	RichText,
} = wp.editor;

class Save extends Component {
	stripStringRender( string ) {
		return string.toLowerCase().replace( /[^0-9a-z-]/g,'' );
	}
	render() {
		const {
			attributes: {
				mapHeight,
				mapCenter,
				mapZoom,
				interaction,
				zoomControl,
				mapTypeControl,
				streetViewControl,
				fullscreenControl,
				mapStyle,
				customStyle,
				blockAlignment,
				mapMarkers,
			}
		} = this.props;
		const className = 'wp-block-getwid-map';

		const mapMarkersParsed = (mapMarkers != '' ? JSON.parse(mapMarkers) : []);

		const wrapperClasses = classnames(
			className,
			blockAlignment ? `align${ blockAlignment }` : null,
		);

		const mapData = {
			'data-map-zoom' : mapZoom,
			'data-interaction' : interaction,
			'data-map-style' : mapStyle,
			'data-custom-style' : customStyle,
		};

		const mapOptions = {
			'data-map-center' : JSON.stringify(mapCenter),
		};

		const mapControls = {
			'data-zoom-control' : zoomControl,
			'data-type-control' : mapTypeControl,
			'data-street-view-control' : streetViewControl,
			'data-full-screen-control' : fullscreenControl,
		};

		const mapMarkerArr = {
			'data-map-markers' : escape(mapMarkers),
		};

		const markersPoints = ( index ) => {
			if (typeof mapMarkersParsed[ index ] !== 'undefined') {

				return (
					<Fragment>
						<li><a href={`https://maps.google.com/?q=${mapMarkersParsed[ index ].coords.lat},${mapMarkersParsed[ index ].coords.lng}&ll=${mapMarkersParsed[ index ].coords.lat},${mapMarkersParsed[ index ].coords.lng}&z=${mapZoom}`}>{`${mapMarkersParsed[ index ].name}`}</a></li>
					</Fragment>
				);
			}
		};

				// <div {...mapData} {...mapOptions} {...mapControls} {...mapMarkerArr} className={wrapperClasses}>
		return (
			<Fragment>
				<div {...mapData} {...mapOptions} {...mapControls} {...mapMarkerArr} className={wrapperClasses}>
					<div style={{height: (mapHeight + 'px')}} className={`${className}__container`}></div>

						{(mapMarkersParsed.length != 0) && (
							<Fragment>
								<ul className={`${className}__points`}>
									{ times( mapMarkersParsed.length, n => markersPoints( n ) ) }
								</ul>
							</Fragment>
						)}
					
				</div>
			</Fragment>
		);
	}
}
export default Save;