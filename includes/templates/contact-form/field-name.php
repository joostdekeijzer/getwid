<?php
    $class = 'wp-block-getwid-field-name';
    $block_name = $class;
    if ( isset( $attributes[ 'className' ] ) ) {
        $class .= ' ' . $attributes[ 'className' ];
    }
	$uid   = isset( $attributes[ 'id' ] )    ? esc_attr( $attributes[ 'id' ] ) : 'name-' . uniqid();
    $label = isset( $attributes[ 'label' ] ) ? $attributes[ 'label' ] : __( 'Name', 'getwid' );
?>
<p class='<?php echo esc_attr( $class );?>'>
    <label
        for='<?php echo $uid ?>'
        class='<?php echo esc_attr( $block_name . '__label' );?>'
    ><?php
        echo $label;

        if ( isset( $attributes[ 'required' ] ) ) {
        ?><span class='required'><?php
            echo __( ' (required)', 'getwid' );
        ?></span><?php
        }
    ?></label>
    
    <input id='<?php echo $uid ?>' type='text' name='name'<?php
        if ( isset( $attributes[ 'placeholder' ] ) ) { ?>
            placeholder='<?php echo esc_attr( $attributes[ 'placeholder' ] ); ?>' <?php
        } else { ?>
            placeholder='<?php echo __( 'Name', 'getwid' ); ?>'<?php
        } ?>

        <?php if ( isset( $attributes[ 'required' ] ) ) { ?>
            required='<?php "" ?>'
        <?php } ?>
    />
</p>