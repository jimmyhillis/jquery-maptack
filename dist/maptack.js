/*! Maptack - v0.2.0 - 2013-02-17
* https://github.com/jimmyhillis/maptack
* Copyright (c) 2013 Jimmy Hillis; Licensed MIT */

/*global google
*/


/*"laxcomma": true, "laxbreak": true, "browser": true
*/


(function() {
  var Maptack,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Maptack = (function() {
    /**
     * Returns Maptack object with defaults set.
     * @param {dom}     element HTML dom element which holds Maptack object
     * @param {object}  options User options for setting default behavior
     * @return {dom}            Maptack object for chaining
    */

    function Maptack(element, options) {
      var map_opts, _ref, _ref1,
        _this = this;
      this.element = element;
      this.placeTack = __bind(this.placeTack, this);

      this.placeTackByAddress = __bind(this.placeTackByAddress, this);

      this.$element = $(element);
      map_opts = $.extend({
        zoom: 11,
        center: new google.maps.LatLng((_ref = options.lat) != null ? _ref : -31.935391, (_ref1 = options.lng) != null ? _ref1 : 115.858512),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }, options);
      this.options = $.extend({
        logger: false,
        form: {
          latitude: false,
          longitude: false
        }
      }, options);
      if (!this.options.logger.length) {
        this.options.logger = false;
      }
      this.gm = new google.maps.Map(element, map_opts);
      this.current_tack = new google.maps.Marker({
        map: this.gm,
        visible: false
      });
      google.maps.event.addListener(this.gm, 'click', function(event) {
        return _this.placeTack(event.latLng);
      });
      return this;
    }

    /**
     * Geocodes an address string, and if successful, pins a tack at the
     *   specified coordinates.
     * @param {string} address A street address to be geoencoded to lat/lng
     * @return {dom}           Maptack object for chaining
    */


    Maptack.prototype.placeTackByAddress = function(address) {
      var geocoder, onGeocode,
        _this = this;
      geocoder = new google.maps.Geocoder();
      onGeocode = function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          if (status !== google.maps.GeocoderStatus.ZERO_RESULTS) {
            return _this.placeTack(results[0].geometry.location);
          } else {
            return alert("Address could not be found. Please try again");
          }
        }
      };
      if (typeof address === "string") {
        geocoder.geocode({
          'address': address
        }, onGeocode);
      }
      return this;
    };

    /**
     * Places a coordinate pin on the map and logs provided location if
     *   requested. Takes Google LatLng point.
     * @param {google.maps.LatLng} location A lat/lng position to place on the
     *   map and log in the history
     * @return {dom}                        Maptack object for chaining
    */


    Maptack.prototype.placeTack = function(location) {
      var latitude, longitude;
      latitude = location.lat();
      longitude = location.lng();
      this.current_tack.setOptions({
        visible: true,
        position: new google.maps.LatLng(latitude, longitude)
      });
      if (this.options.form.latitude) {
        this.options.form.latitude.val(latitude);
      }
      if (this.options.form.longitude) {
        this.options.form.longitude.val(longitude);
      }
      if (this.options.logger) {
        this.options.logger.append("<div>" + (location.toString()) + "</div>");
      }
      return this;
    };

    return Maptack;

  })();

  /**
   * jQuery Maptack plugin for attaching and launching a Maptack controlled
   *   map on each provided HTML element.
   * @param  {object} options User options for setting default behavior
   * @return {dom}            Provided dom elements for chaining
  */


  $.fn.maptack = function(options) {
    $(this).each(function(i) {
      var $_, maptack;
      $_ = $(this);
      maptack = $_.data('maptack');
      if (!(maptack != null)) {
        return $_.data('maptack', (maptack = new Maptack(this, options)));
      }
    });
    return this;
  };

}).call(this);
