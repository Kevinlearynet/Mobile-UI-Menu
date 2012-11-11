JSON Mobile UI Menu
=============================

Create a mobile UI menu from JSON using [jQuery](http://jquery.com/) and [dust.js](https://github.com/linkedin/dustjs).

The `css` directory stores the [LESS powered](http://lesscss.org/) OOCSS.

* Author:    Kevin Leary (<info@kevinleary.net>)
* Date:      November, 2012
* Last mod.: November, 2012
* Version:   0.1
* Website:   <http://www.kevinleary.net/>
* GitHub:    <https://github.com/Kevinlearynet/mobile-ui-menu>

## Online Example

At the most basic level, the character count script can be used right out of the box:

`$('textarea.wordcount-field').characterCount();`

This will automatically add a `span` element after the provided `textarea` field.

## Advanced Usage

A series of settings have been included for advanced scenarios and customizations:

	$('textarea.wordcount-field').characterCount({
		'countType'		: 'characters', 		// Other option is "words"
		'countClass'	: 'wordcount-total',	// Classname used for the counter span
		'limit' 		: 150
	});

## License

This free software is copyleft licensed under the same terms as WordPress, or, at your option, under version 2 of the [GPL license](http://wordpress.org/about/gpl/).