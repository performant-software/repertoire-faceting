/*
* Repertoire faceting ajax widgets
*
* Copyright (c) 2009 MIT Hyperstudio
* Christopher York, 09/2009
*
* Requires jquery 1.3.2+
* Support: Firefox 3+ & Safari 4+.  IE emphatically not supported.
*
*
* A barebones faceting results widget.  HTML rendering is done on the server side.
*
* Usage:
*
*   $('#my_results').results(<options>)
*
* Options:  As for basic faceting widgets
*           - type:  return type for ajax query
*           None are required.
*/

//= require "facet_widget"


repertoire.results = function($results, options) {
  // inherit basic facet widget behaviour
  var self = repertoire.facet_widget($results, options);

  //
  // Update results from webservice
  //
  // By default, the url is '/<context>/counts/<facet>'
  //
  self.update = function(state, callback) {
    // default url is '<context>/results'
    var url = self.default_url([self.context_name(), 'results']);
    // package up the faceting state and send back to results rendering service
    self.fetch(state, url, options.type, callback);
  }

  //
  // Render only fetched html
  //
  var $template_fn = self.render;
  self.render = function(data) {
    var $markup = $template_fn();

    // if html returned, use it; otherwise defer to a custom injector
    if (options.type == 'html')
      $markup.append(data);

    // opacity mask (for loading)
    $markup.append('<div class="mask"/>')

    return $markup;
  }

  // end of results factory function
  return self;
};

// Results plugin
$.fn.results = repertoire.plugin(repertoire.results);
$.fn.results.defaults = {
  type: 'html'          /* jquery ajax type: html, json, xml */
};