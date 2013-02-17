###

MAP TACK COFFEE SCRIPT/ JAVASCRIPT LIBRARY

This code has been developed by JIMMY HILLIS
@see http://jimmy.hillis.me

REQUIRED THIRD PARTY LIBRARIES
@required jquery (v1.8.0+)
@reqired google maps api v3

###

###global google###
###"laxcomma": true, "laxbreak": true, "browser": true###

class Maptack
    ###*
     * Returns Maptack object with defaults set.
     * @param {dom}     element HTML dom element which holds Maptack object
     * @param {object}  options User options for setting default behavior
     * @return {dom}            Maptack object for chaining
    ###
    constructor: (@element, options) ->
        @$element = $(element)
        map_opts = $.extend {
            zoom: 11,
            center: new google.maps.LatLng (options.lat ? -31.935391),
                                           (options.lng ? 115.858512)
            mapTypeId: google.maps.MapTypeId.ROADMAP,
        }, options
        @options = $.extend {
            logger: false,
            form: {
                latitude: false,
                longitude: false
            }
        }, options
        @options.logger = false if not @options.logger.length
        @gm = new google.maps.Map element, map_opts
        @current_tack = new google.maps.Marker { map: @gm, visible: false }
        # Take Google Map event and place tack from clicked point
        google.maps.event.addListener @gm, 'click', (event) =>
            @placeTack event.latLng
        return @

    ###*
     * Geocodes an address string, and if successful, pins a tack at the
     *   specified coordinates.
     * @param {string} address A street address to be geoencoded to lat/lng
     * @return {dom}           Maptack object for chaining
    ###
    placeTackByAddress: (address) =>
        geocoder = new google.maps.Geocoder()
        onGeocode = (results, status) =>
            if (status == google.maps.GeocoderStatus.OK)
                if (status != google.maps.GeocoderStatus.ZERO_RESULTS)
                    @placeTack results[0].geometry.location
                else
                    alert "Address could not be found. Please try again"
        if typeof address == "string"
            geocoder.geocode { 'address': address }, onGeocode
        return @

    ###*
     * Places a coordinate pin on the map and logs provided location if
     *   requested. Takes Google LatLng point.
     * @param {google.maps.LatLng} location A lat/lng position to place on the
     *   map and log in the history
     * @return {dom}                        Maptack object for chaining
    ###
    placeTack: (location) =>
        latitude = location.lat()
        longitude = location.lng()
        @current_tack.setOptions {
            visible: true,
            position: new google.maps.LatLng latitude, longitude
        }
        # Set provided form elements with new value
        @options.form.latitude.val latitude if @options.form.latitude
        @options.form.longitude.val longitude if @options.form.longitude
        # Log when requested
        @options.logger.append "<div>#{location.toString()}</div>" if @options.logger
        return @

###*
 * jQuery Maptack plugin for attaching and launching a Maptack controlled
 *   map on each provided HTML element.
 * @param  {object} options User options for setting default behavior
 * @return {dom}            Provided dom elements for chaining
###
$.fn.maptack = (options) ->
    $(@).each (i) ->
        $_ = $(@)
        maptack = $_.data('maptack')
        $_.data('maptack',
                  (maptack = new Maptack @, options)) if not maptack?
    return @

