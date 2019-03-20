
import Inspector from './inspector';

import './editor.scss';

import {
	filter,
	pick,
	map,
	get,
	chunk
} from "lodash";

const { __ } = wp.i18n;

const {
	Fragment,
	Component
} = wp.element;

const {
	BlockControls,
	AlignmentToolbar,
	InnerBlocks,
	MediaPlaceholder,
	MediaUpload,
	MediaUploadCheck,

	RichText
} = wp.editor;

const {
	Toolbar,
	IconButton
} = wp.components;


class Edit extends Component{

	constructor(){
		super( ...arguments );

		this.onSelectMedia = this.onSelectMedia.bind(this);
	}

	render(){
		const {
			attributes:{
				title,
				subtitle,
				content,
				imgId,
				imgUrl,
				imgSize
			},
			className,
			setAttributes
		} = this.props;

			
		return(
			<Fragment>
				<BlockControls key={'toolbar'}>
					{ !! imgUrl && (
						<Fragment>
							<MediaUploadCheck>
								<Toolbar>
									<MediaUpload
										onSelect={ this.onSelectMedia }
										allowedTypes={ ['image'] }
										value={ imgId }
										render={ ( { open } ) => (
											<IconButton
												className="components-toolbar__control"
												label={ __( 'Edit Media', 'getwid' ) }
												icon="edit"
												onClick={ open }
											/>
										) }
									/>
								</Toolbar>
							</MediaUploadCheck>
						</Fragment>
					) }
				</BlockControls>

				<Inspector {...this.props} key={'inspector'}/>

				<div className={className} key={'edit'}>
					<div className={'wp-block-getwid-testimonial__wrapper'}>
						<div className={'wp-block-getwid-testimonial__header'}>
							{ ! imgUrl && (
								<MediaPlaceholder
									icon={'format-image'}
									// className={className}
									labels={{
										title: __('Testimonial', 'getwid'),
									}}
									onSelect={this.onSelectMedia}
									accept="image/*"
									allowedTypes={ ['image'] }
								/>
							)}
							{imgUrl &&
								<div className={'wp-block-getwid-testimonial__image-wrapper'}>
									<div className={'wp-block-getwid-testimonial__image'}>
										<img
											src={imgUrl}
										/>
									</div>
								</div>
							}

							<div className={'wp-block-getwid-testimonial__heading'}>
								<RichText
									tagName="h4"
									className= {`wp-block-getwid-testimonial__title`}
									placeholder={ __( 'Write heading…', 'getwid' ) }
									value={ title }
									onChange={title => setAttributes({title})}
								/>
								<RichText
									tagName="span"
									className= {`wp-block-getwid-testimonial__subtitle`}
									placeholder={ __( 'Write subtitle…', 'getwid' ) }
									value={ subtitle }
									onChange={subtitle => setAttributes({subtitle})}
									formattingControls={ [ 'bold', 'italic', 'strikethrough' ] }
								/>
							</div>
						</div>
						<div className={'wp-block-getwid-testimonial__content-wrapper'}>

							<RichText
								tagName="p"
								className= {`wp-block-getwid-testimonial__content`}
								placeholder={ __( 'Write text…', 'getwid' ) }
								value={ content }
								onChange={content => setAttributes({content})}
								formattingControls={ [ 'bold', 'italic', 'strikethrough' ] }
							/>
						</div>
					</div>
				</div>

			</Fragment>
		)

	}

	onSelectMedia(media){

		this.props.setAttributes({
			imgId: media.id,
			imgUrl: media.sizes.full.url
		})

	}
}

export default Edit;