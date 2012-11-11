/**
 * ATG Core functionality
 *
 * Author: @kevinlearynet
 */

;(function ( $ ) {

	/**
     * Utility methods
     */
     
    // Setup namespace
	if ( !$.atg ) {
		$.atg = {};
	};
	
    $.atg.utils = function() {
	
		// Constants
		this.constants = {
			'TEMPLATE_DIR' : 'templates/',
			'MODEL_DIR'    : 'data/',
			'DEBUG' 	   : false
		};
		
		/**
		 * Console logging
		 */
		this.init = function() {
			$.atg.utils().loadViews();
		};
	
		/**
		 * Console logging
		 */
		this.log = function( notice ) {
			if ( window.console && window.console.log && notice ) 
				console.log( notice );
		};
		
		/**
		 * Cached, Chained $.getScript
		 *
		 * Extend jQuery $.getScript method to allow chaining of multiple scripts
		 */
		this.cachedScript = function( resources, callback ) {
		
			var // reference declaration & localization
			length = resources.length, 
			handler = function() { counter++; },
			deferreds = [],
			counter = 0, 
			idx = 0;
		
			for ( ; idx < length; idx++ ) {
				
				var load_script = $.ajax({
					url: resources[ idx ],
					dataType: "script",
					cache: true,
					success: handler
				});
				
				deferreds.push(load_script);
				
				delete load_script; 
			}
		
			jQuery.when.apply( null, deferreds ).then(function() {
				callback && callback();
			});
		};
		
		/**
		 * Get view template
		 */
		this.getTemplateAjax = function( template_name, path, data, callback ) {
			$.ajax({
				url : path,
				cache : $.atg.constants.DEBUG,
				success : function( template ) {
					
					// Compile template to cache
					var compiled = dust.compile( template, template_name );
					dust.loadSource( compiled );
					
					// Render data into template
					dust.render( template_name, data, function( error, output ) {
						if ( callback ) callback( error, output );
					});
				}
			});
		};
		
		/**
		 * Load Views
		 *
		 * Load the views dynamically using the `data-template`, `data-file`, and
		 * data-model attributes.
		 */
		this.loadViews = function() {
		
			// Views
			var view = $('[data-template][data-file][data-model]');
			if ( view.length > 0 ) {
				deps = [
					'js/dust-full-1.1.1.min.js'
				];
			
				this.cachedScript( deps, function() { 
				
					// JSON templating
					view.each(function(){
						
						// Params
						var template_name = $(this).data('template');
						var model = $(this).data('model');
						var file = $(this).data('file');
						var instance = $(this);
						
						// Get model data
						$.ajax({
							cache : $.atg.constants.DEBUG,
							success: function(data) {
								// Debugging
								if ( $.atg.constants.DEBUG )
									$.atg.utils().log(data);
								
								// Templating view from model
								$.atg.utils().getTemplateAjax( template_name, $.atg.utils().constants.TEMPLATE_DIR + file, data, function( error, output ){
									if ( error && $.atg.utils().constants.DEBUG )
										$.atg.utils().log(error);
									
									instance.html(output);
								});
							},
							url: $.atg.constants.MODEL_DIR + model
						});
						
					}); // end each()
				
				});
				
			} // end if
		}
		
		return this;
		
	} // end utils
	
	// Load utilities library
	$.atg.utils().init();
		
})(jQuery);