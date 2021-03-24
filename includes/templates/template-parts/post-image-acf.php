<?php

//extract styles & classes
extract( $extra_attr );

?>

<div class="<?php echo esc_attr( $wrapper_class ); ?>">
	<?php
		$field = get_field_object( $attributes[ 'customField' ], get_the_ID() );

	 	if ( $field ) :
	 		$output 	 = '';
	 		$fieldType   = $field[ 'type' ];
	 		$filedFormat = $field[ 'return_format' ];

			switch ( $fieldType ) {
				case 'image' :
					$image = get_field( $attributes[ 'customField' ], get_the_ID() );

					switch ( $filedFormat ) {
						case 'id' :
							$output = wp_get_attachment_image( $image, $imageSize );

							break;
						case 'url' :
							$img_id = attachment_url_to_postid( $image );
							$output = wp_get_attachment_image( $img_id, $imageSize );

							break;
						case 'array' :
							$img_id = $image[ 'ID' ];
							$output = wp_get_attachment_image( $img_id, $imageSize );

							break;
					}

					break;
	 		}

	 		echo $output;
		endif;
	?>
</div>
