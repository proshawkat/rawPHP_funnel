<div class="menu-div-misc side_panel_pull_left_border" id="menu-div-misc" >
    <div class="scrollbar shopify_elements" id="scrollbar">
        <?php foreach($shopify_drag_and_drop_element as $key => $value) { ?>
            <div class="img drag_me_panel_to_editor" id="<?php echo $value['id']; ?>" onclick="add_me_to_editor_preview(this)">
                    <i class="<?php echo $value['icon']; ?>  fa-2x"></i>
                  <div class="desc">
                        <b><?php echo $value['name'];?></b>
                  </div>
            </div>
        <?php } ?>
        	<div id="product_primary_img" class="img drag_me_panel_to_editor"  onclick="add_me_to_editor_preview(this)">
                    <img style="height: 50px;width: 100%;"  src="<?php echo $shopify_drag_and_drop_element_primary_image['html']['attributes']['src']; ?>">
                  <div class="desc">
                        <b>Primary Image</b>
                  </div>
            </div>
            <div class="img">
                    <i class="fa fa-file-image-o fa-2x drag_me_panel_to_editor" id="" onclick="show_shopify_image();"></i>
                  <div class="desc">
                        <b>Images</b>
                  </div>
            </div>
            
    </div>
    
    <?php
        $product_id = get_page_meta($page_id,"product_id");
        if($product_id != ""){
            echo '<div class="scrollbar all_shopify_product_image" id="scrollbar" hidden>';
            require_once 'includes/shopify.php';
            $sc = new ShopifyClient($_SESSION[ SESSIONNAME ]['shop'], $_SESSION[ SESSIONNAME ]['token'], SHOPIFY_API_KEY, SHOPIFY_SECRET);
            $shopify_product_images = $sc->call('GET', '/admin/products/' . $product_id . '/images.json');
    ?>
            <?php foreach($shopify_product_images as $image) { 
                $img_url = $image['src'];
                $img_url = str_replace('.png','_small.png',$img_url);
                $img_url = str_replace('.jpg','_small.jpg',$img_url);
                $img_url = str_replace('.jpeg','_small.jpeg',$img_url);
                $img_url = str_replace('.gif','_small.gif',$img_url);
            ?>
                <div id="<?php echo 'product_img-'.$image['id']; ?>" class="img drag_me_panel_to_editor"  onclick="add_me_to_editor_preview(this)">
                        <img style="height: 50px;width: 100%;"  src="<?php echo $img_url; ?>">
                      <div class="desc">
                            <b>Image</b>
                      </div>
                </div>
            <?php } ?>
            
                <div style="cursor: pointer; margin-bottom: 30px;" class="col-xs-12 col-sm-12 col-md-12">
                    <i class="fa fa-arrow-circle-left fa-2x" onclick=" show_shopify_image();"></i>
                </div>
            </div>
    <?php } ?>
    
</div>
<script type="text/javascript">
    function show_shopify_image(){
        $(".shopify_elements").toggle();
        $(".all_shopify_product_image").toggle();
    }
</script>