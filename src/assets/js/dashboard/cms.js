var Cms = function(){
	var slider = function(){
		jQuery('.SlideToolHeader').on('click', function (e) {
			if (jQuery(e.target).is('.form-check input[type="checkbox"]') || jQuery(e.target).is('.form-check label')) {
					e.stopPropagation();
			}
			else{
				var el = jQuery(this).find('.handle').hasClass('expand');
				if(el)
				{
					jQuery(this).find('.handle').removeClass('expand').addClass('collapse');				
					jQuery(this).closest('.cm-content-box').find('.cm-content-body').slideUp(300);				
					jQuery(this).closest('.content-title').addClass('collapse');
					
				} 
				else 
				{
					jQuery(this).find('.handle').removeClass('collapse').addClass('expand');
					jQuery(this).closest('.cm-content-box').find('.cm-content-body').slideDown(300);
					jQuery(this).closest('.content-title').removeClass('collapse');
				}
			}
	   });
	   
	   $(document).ready(function(){
		   $('.open').on('click',function(){
			   $('.main-check').slideToggle('slow');
			   
		   });
	   });
		
	}
   
	   

   /* Function ============ */
   return {
	   init:function(){
		   slider();
		   
	   },

	   
	   load:function(){
		   
	   },
	   
	   resize:function(){
		   //vHeight();
		   
	   },
   }
}();

/* Document.ready Start */	
jQuery(document).ready(function() {
   $('[data-bs-toggle="popover"]').popover();
   'use strict';
   Cms.init();
   
   // Default 
   jQuery('.SlideToolHeader').each(function() {
	jQuery(this).find('.handle').removeClass('expand').addClass('collapse');				
	jQuery(this).closest('.cm-content-box').find('.cm-content-body').slideUp(300);				
	jQuery(this).closest('.content-title').addClass('collapse');
	});

});
/* Document.ready END */

/* Window Load START */
jQuery(window).on('load',function () {
   'use strict'; 
   Cms.load();

   
});
/*  Window Load END */
/* Window Resize START */
jQuery(window).on('resize',function () {
   'use strict'; 
   Cms.resize();

});
/*  Window Resize END */