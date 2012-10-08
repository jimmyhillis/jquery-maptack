/**
 * MAP TACK JAVASCRIPT LIBRARY
 *
 * PERMISSION IS HEREBY GRANTED, FREE OF CHARGE, TO ANY PERSON OBTAINING
 * A COPY OF THIS SOFTWARE AND ASSOCIATED DOCUMENTATION FILES (THE
 * "SOFTWARE"), TO DEAL IN THE SOFTWARE WITHOUT RESTRICTION, INCLUDING
 * WITHOUT LIMITATION THE RIGHTS TO USE, COPY, MODIFY, MERGE, PUBLISH,
 * DISTRIBUTE, SUBLICENSE, AND/OR SELL COPIES OF THE SOFTWARE, AND TO
 * PERMIT PERSONS TO WHOM THE SOFTWARE IS FURNISHED TO DO SO, SUBJECT TO
 * THE FOLLOWING CONDITIONS:
 *
 * THE ABOVE COPYRIGHT NOTICE AND THIS PERMISSION NOTICE SHALL BE
 * INCLUDED IN ALL COPIES OR SUBSTANTIAL PORTIONS OF THE SOFTWARE.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * This code has been developed by JIMMY HILLIS
 * @see http://jimmy.hillis.me
 *
 * REQUIRED
 * @required jquery (v1.7.0+)
 *
 * IMPORTS
 *
 * VALIDATION
 * All code must validate with JSHint (http://www.jshint.com/) to be launched
 * within a LIVE web application. NO debug code should remain in your final
 * versions e.g. remove EVERY reference to window.console.log().
 *
 * STYLE
 * All code should be within 79 characters WIDE to meet standard Hatchd
 * protocol. Reformat code cleanly to fit within this tool.
 *
 * jshint = { "laxcomma": true, "laxbreak": true, "browser": true }
 *
 */


/* MODULE DEFINITION */

;(function ($) {

    "use strict";

    var MapTack = function (element, options) {

        var that = this
          , gm_options = $.extend({
                'zoom': 11,
                center: new google.maps.LatLng((options.lat || -31.95391), (options.lng || 115.858512)),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }, options);

        // Ensure element provided exists
        if (!element || !((this.$element = $(element)).length)) {
            return false;
        }

        if (!google.maps) {
            return false;
        }

        this.gm = new google.maps.Map(element, gm_options);

        // Trigger click event
        google.maps.event.addListener(this.gm, 'click',
            function(event) {
                that.tack(event.latLng.lat(), event.latLng.lng());
            }
        );

        this.current_tack = new google.maps.Marker({
            'map': this.gm,
            'visible': false
        });

        return this;
    };

    /* MODULE PUBLIC METHODS */

    // Updates the UI to view the next element
    MapTack.prototype.tack = function (lat, lng) {
        this.current_tack.setOptions({
            'position': new google.maps.LatLng(lat, lng),
            'visible': true
        });
        $('#maptack-lat').val(lat);
        $('#maptack-lng').val(lng);
    };

    /* JQUERY PLUGIN */

    $.fn.mapTack = function (options) {
        return this.each(function () {
            var $this = $(this)
              , module = $this.data('module');
            // If we can't find an existing module, create a new one
            if (!module) {
                $this.data('module', (module = new MapTack(this, {})));
            }

            // Setup Google Map


            // ATTACH EVENTS
        });
    };

}(window.jQuery));
