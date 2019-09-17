<?php 

	$product_id = get_page_meta($page_id,"product_id");
	$shopify_drag_and_drop_element = array();
	if($product_id != ""){
		// require_once 'includes/shopify.php';
		// $sc = new ShopifyClient($_SESSION[ SESSIONNAME ]['shop'], $_SESSION[ SESSIONNAME ]['token'], SHOPIFY_API_KEY, SHOPIFY_SECRET);
		// $shopify_product = $sc->call('GET', '/admin/products/' . $product_id . '.json');
		$shopify_product = $this_product;
		// echo '<pre>';
		// var_dump($shopify_product['vendor']);
		// echo '</pre>';

		$total_option = array();
		$div = array('tag' => 'div','endtag' => 1,'attributes' => array(),'content'	=> '','nodes'=> array());
		$img = array('tag' => 'img','endtag' => 1,'attributes' => array('style'=>'height:450px;width:500px;text-align:center;'));
		$p = array('tag' => 'span','endtag' => 1,'attributes' => array('class'=>'span_but_p_tag'),'content'	=> '');
		$span = array('tag' => 'span','endtag' => 1,'attributes' => array('class'=>''),'content'	=> '');
		$h2 = array('tag' => 'span','endtag' => 1,'attributes' => array('class'=>'span_but_h2_tag'),'content'	=> '');
		$br = array('tag' => 'br','endtag' => 0,'attributes' => array());
		$select = array('tag' => 'select','endtag' => 1,'attributes' => array('class'=>'form-control','onchange'=>'change_variant(this)'),'content'	=> '','nodes'	=> array());
		$select_option = array('tag' => 'option','endtag' => 1,'attributes' => array('value'=>''),'content'	=> '');

		$id_number = 0;
		$variant_div = $div;
		$variant_div['attributes']['class'] = "shopify_product_variants_div text-left";
		$variant_div['attributes']['style'] = "padding: 15px;";
		foreach ($shopify_product['options'] as $option) {
			$temp_select = $select;
			 if(count($option['values']) > 1){
			 	$label = array('tag' => 'label','endtag' => 1,'attributes' => array("style"=>"display: block;"),'content'	=> $option['name']);
			 	$temp_select['attributes']['class'] .= ' variant_'.str_replace(' ', '-', $option['name']);
			 }else{
				$label = array('tag' => 'label','endtag' => 1,'attributes' => array("class"=>"hidden","style"=>"display: block;"),'content'	=> $option['name']);
				$temp_select['attributes']['class'] .= ' variant_'.str_replace(' ', '-', $option['name']).' hidden';
			}
			$temp_select['attributes']['onchange'] = 'change_product_variant(this);';
		    $id_number++;
		    $temp_select_option = $select_option;

		    foreach ($option['values'] as $value) {
		    	$temp_select_option['attributes']['value'] = $value;
		    	$temp_select_option['content'] = $value;
		        $temp_select['nodes'][] = $temp_select_option;
		    }
		    $variant_div['nodes'][] = $label;
		    $variant_div['nodes'][] = $temp_select;		    
		}
		$quantity = '{"tag":"div","endtag":1,"attributes":{"style":"padding: 0px;"},"content":"","nodes":[{"tag":"label","endtag":1,"attributes":{"class":"","style":"display: block;"},"content":"Quantity"},{"tag":"select","endtag":1,"attributes":{"class":"form-control shopify_product_quantity","onchange":"shopify_change_product_quantity(this);"},"content":"","nodes":[{"tag":"option","endtag":1,"attributes":{"value":"1"},"content":"1"},{"tag":"option","endtag":1,"attributes":{"value":"2"},"content":"2"},{"tag":"option","endtag":1,"attributes":{"value":"3"},"content":"3"},{"tag":"option","endtag":1,"attributes":{"value":"4"},"content":"4"},{"tag":"option","endtag":1,"attributes":{"value":"5"},"content":"5"},{"tag":"option","endtag":1,"attributes":{"value":"6"},"content":"6"},{"tag":"option","endtag":1,"attributes":{"value":"7"},"content":"7"},{"tag":"option","endtag":1,"attributes":{"value":"8"},"content":"8"},{"tag":"option","endtag":1,"attributes":{"value":"9"},"content":"9"},{"tag":"option","endtag":1,"attributes":{"value":"10"},"content":"10"}]}]}';
		

		$temp_variant_msg = $div;
		$temp_variant_msg['content'] = '<span style="color:green; font-size:13px; margin-top: 10px; display: block;"  class="text-center"><i class="fa fa-shopping-basket" aria-hidden="true">&nbsp;</i> Product available. </span>';
		$temp_variant_msg['attributes']['class'] = 'variant_message';

		$add_to_cart_btn_with_variant = '{"tag":"div","endtag":1,"attributes":{"class":"text-center"},"content":"","nodes":[{"tag":"button","endtag":1,"attributes":{"type":"button","class":"btn btn-success btn-md btn-block","onclick":"shopify_add_to_cart(this,\'\');","style":"margin-top: 10px; white-space: normal;"},"content":"Yes! I Need This In My Life >>"}]}';
		
		$variant_div['nodes'][] = json_decode($quantity);
		$variant_div['nodes'][] = $temp_variant_msg;
		$variant_div['nodes'][] = json_decode($add_to_cart_btn_with_variant,true);
		$total_option['Variants'] = $variant_div;
		
		
		foreach ($total_option as $key => $value) {
			$temp = array();
			$temp['id']= str_replace(' ', '-', $key);
			$temp['icon'] = "glyphicon glyphicon-asterisk";
			$temp['html']= $value;
			$temp['name']= $key;
			$shopify_drag_and_drop_element[] = $temp;
		}

		$add_to_cart_btn = '{"tag":"button","endtag":1,"attributes":{"type":"button","class":"btn btn-success btn-md btn-block","onclick":"shopify_add_to_cart(this,\'\')","style":"white-space: normal;"},"content":"Yes! I Need This In My Life >>"}';
		$temp = array();
		$temp['id']= 'add_to_cart_btn';
		$temp['icon'] = "fa fa-cart-plus";
		$temp['html']= json_decode($add_to_cart_btn,true);
		$temp['name']= "Add to cart button";
		$shopify_drag_and_drop_element[] = $temp;

		if ($shopify_product['vendor'] == 'CustomCat'){
			$customcat_customize_btn = '{"tag":"div","endtag":1,"attributes":{"class":""},"nodes":[{"tag":"button","endtag":1,"attributes":{"type":"button","class":"btn btn-success btn-md btn-block","onclick":"process_customize();","style":"margin-top: 10px; white-space: normal;"},"content":"Customize"} , {"tag":"div","endtag":1,"attributes":{"id":"cc-custom" ,"class":"do_not_add_empty_button","style":"display: none;"},"content":""}]}';
			$temp = array();
			$temp['id']= 'customcat_customize_btn';
			$temp['icon'] = "fa fa-cc";
			$temp['html']= json_decode($customcat_customize_btn,true);
			$temp['name']= "Customcat customize button";
			$shopify_drag_and_drop_element[] = $temp;
		}
		$rc_token= get_shop_meta($shop_id , 'rc_token');
	    //~echo '<pre>';
	    //~var_dump($product_metafields);
	    //~echo '</pre>';
	    if ( $rc_token !='' ) {
			$sc = new ShopifyClient($_SESSION[ SESSIONNAME ]['shop'], $_SESSION[ SESSIONNAME ]['token'], SHOPIFY_API_KEY, SHOPIFY_SECRET);
			$product_metafields = $sc->call('GET', '/admin/products/'.$product_id.'/metafields.json');

			foreach ($product_metafields as $product_metafield) {
				if ( $product_metafield['key'] == 'is_subscription_only') {
					$is_subscription_only = $product_metafield['value'] ;
				}
				if ($product_metafield['key'] == 'subscription_id' && $product_metafield['value'] != ''){
					$recharge_customize_btn = '{"tag":"div","endtag":1,"attributes":{"class":"rc-custom-main-div"},"nodes":[ {"tag":"div","endtag":1,"attributes":{"id":"rc-custom" ,"class":"rc-custom do_not_add_empty_button", "title":"is_subscription_only_'.$is_subscription_only.'","style":"display: _none;"},"content":""} , {"tag":"button","endtag":1,"attributes":{"type":"button","class":"btn btn-success btn-md btn-block rc_add_to_cart","onclick":"process_rc_customize();","style":"margin-top: 10px; white-space: normal;"},"content":"Add to cart"}]}';
					$temp = array();
					$temp['id']= 'recharge_customize_btn';
					$temp['icon'] = "fa fa-retweet";
					$temp['html']= json_decode($recharge_customize_btn,true);
					$temp['name']= "Recharge customize button";
					$shopify_drag_and_drop_element[] = $temp;
					break;
				}
			}
		}
		$decline_btn = '{"tag":"button","endtag":1,"attributes":{"type":"button","class":"btn btn-danger btn-md btn-block","onclick":"shopify_decline(this);","style":"white-space: normal;"},"content":"I Don\'t Want This Product"}';
		$temp = array();
		$temp['id']= 'decline_btn';
		$temp['icon'] = "fa fa-window-close";
		$temp['html']= json_decode($decline_btn,true);
		$temp['name']= "Decline Button";
		$shopify_drag_and_drop_element[] = $temp;

		$product_title = $h2;
		$product_title["attributes"]["class"] = "shopify_product_title span_but_h2_tag";
		$product_title['content'] = $shopify_product['title'];
		/*$product_title['attributes']['class'] = "";*/
		$temp = array();
		$temp['id']= 'product_title';
		$temp['icon'] = "fa fa-header";
		$temp['html']= $product_title;
		$temp['name']= "Product Title";
		$shopify_drag_and_drop_element[] = $temp;

		$product_description = $p;
		$product_description["attributes"]["class"] = "shopify_product_description span_but_p_tag";
		$product_description['content'] = strip_tags($shopify_product['body_html']);
		/*$product_description['attributes']['class'] = "";*/
		$temp = array();
		$temp['id']= 'product_description';
		$temp['icon'] = "fa fa-paragraph";
		$temp['html']= $product_description;
		$temp['name']= "Product Description";
		$shopify_drag_and_drop_element[] = $temp;

		$product_price = $span;
		$product_price["attributes"]["class"] = "shopify_product_price headline span_but_h1_tag";
		$product_price["attributes"]["style"] = "text-align: center; overflow: visible; font-size: 23px; margin-top: -5px; margin-bottom: -9px;";
		//$product_price["content"] = $shopify_product['variants'][0]['price'];
		$product_price["content"] = '<strike class="sortable_disabled" style="max-height: 100%; max-width: 100%; cursor: default;">[COMPARE_AT_PRICE]</strike> On Sale Now: <b class="sortable_disabled" style="max-height: 100%; max-width: 100%; cursor: default;"><font color="red" class="sortable_disabled" style="cursor: default;">Just [PRICE]!</font></b>';
		$temp = array();
		$temp['id']= 'shopify_product_price';
		$temp['icon'] = "fa fa-usd";
		$temp['html']= $product_price;
		$temp['name']= "Product price";
		$shopify_drag_and_drop_element[] = $temp;

		$cart_bump = json_decode('{"tag":"div","endtag":1,"attributes":{"class":"shopify_cart_bump_div"},"content":"","nodes":[{"tag":"div","endtag":1,"attributes":{"class":"do_not_show_my_menu do_not_add_empty_button cart_bump_div","id":"cart_bump_div"},"content":"","nodes":[]}]}');
		$temp = array();
		$temp['id']= 'cart_bump_shopify';
		$temp['icon'] = "fa fa-cart-plus";
		$temp['html']= $cart_bump;
		$temp['name']= "Cart bump";
		$shopify_drag_and_drop_element[] = $temp;

		$product_primary_img = $img;
		$product_primary_img['attributes']['src'] = $shopify_product['image']['src'];
		$product_primary_img['attributes']['style'] = "max-width: 100%;";
		//$product_primary_img['attributes']['class'] = 'primary_image-'.$shopify_product['image']['id'];
		$product_primary_img['attributes']['class'] = 'primary_image_for_variant';
		$temp = array();
		$temp['id']= 'product_primary_img';
		$temp['icon'] = "fa fa-file-image-o";
		$temp['html']= $product_primary_img;
		$temp['name']= "Primary Image";
		$shopify_drag_and_drop_element_primary_image = $temp;

		$shopify_drag_and_drop_element_images = array();
	    foreach ($shopify_product['images'] as $image) {
	    	$product_img = $img;
			$product_img['attributes']['src'] = $image['src'];
			$product_img['attributes']['style'] = "max-width: 100%;";
			$temp = array();
			$temp['id']= 'product_img-'.$image['id'];
			$temp['icon'] = "fa fa-paragraph";
			$temp['html']= $product_img;
			$temp['name']= "Product Image";
			$shopify_drag_and_drop_element_images[] = $temp;
	    }
	}
?>
