<?php

//extract styles & classes
extract($extra_attr);
?>

<div class="<?php echo esc_attr( $wrapper_class ); ?>" <?php if ( ! empty( $wrapper_style ) ) { ?>style="<?php echo esc_attr( $wrapper_style )?>"<?php } ?>>
    <?php echo $content; //content of inner blocks, escaped earlier ?>
</div>
