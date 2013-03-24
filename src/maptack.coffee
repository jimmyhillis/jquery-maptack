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
     *
     * OPTIONS:
     *
     *   Standard Google Map options from `google.maps.MapOptions`
     *   @see  https://developers.google.com/maps/documentation/javascript/reference#MapOptions
     *   Each availabl method will be passed to the build a google.maps.Map
     *   object on initilaztion.
     *
     *   logger:: Provide an HTML DOM element to have a log of all tack
     *   points to be added -- a history of XXX.XXXXXX, XX.XXXXXX locations.
     *
     *   form:: JSON object { 'latitude', 'longitude' } allows users to
     *   provide jQuery selectors $('.xx') which will be update with the
     *   latest user Tack lat/lng.
     *
     * EVENTS
     *
     *   onTack:: Provide the Latitude, Longitude value on each user tack.
     *
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
            },
            onTack: false
        }, options
        @options.logger = false if not @options.logger.length
        @gm = new google.maps.Map element, map_opts
        @current_tack = new google.maps.Marker { map: @gm, visible: false }
        # Take Google Map event and place tack from clicked point
        google.maps.event.addListener @gm, 'click', (event) =>
            window.console.log "Yeah"
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
                    # Center on new position, you get lost otherwise
                    @gm.panTo(results[0].geometry.location)
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
        pos = location
        @current_tack.setOptions {
            visible: true,
            position: pos
        }
        if @options.onTack
            @options.onTack.call(@, latitude, longitude)
        # Set provided form elements with new value
        if @options.form.latitude
            @options.form.latitude.val latitude
        if @options.form.longitude
            @options.form.longitude.val longitude
        # Log when requested
        if @options.logger
            @options.logger.append "<div>#{location.toString()}</div>"
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
        $_.data('maptack', (maptack = new Maptack @, options)) if not maptack?
    return @

