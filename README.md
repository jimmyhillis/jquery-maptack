# Maptack

An HTML form widget for allowing users to find the latitude and longitude
of any location visually with a Google Map. Users can manually any location
on the visual Google Map or by entering a written address.

## Getting Started

Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/jimmyhillis/maptack/master/dist/maptack.min.js
[max]: https://raw.github.com/jimmyhillis/maptack/master/dist/maptack.js

In your web page:

```html
<script src="jquery.js"></script>
<script src="dist/maptack.min.js"></script>
<script>
jQuery(function($) {
  $('.maptack').maptack();
});
</script>
```

## Examples

To attach the Maptack widget to a working form with two existign text
fields for latitude on longitude you can use the following settings:

```javascript
$(document).ready(function () {
    $('#maptack').maptack({
        'logger': $('#maptack-log'),
        'form': {
            'latitude': $('#maptack-lat'),
            'longitude': $('#maptack-lng')
        }
    });
});
```

The `form` setting allows you to set a `latitude` and `logitude` setting which
should be a jQuery selector to an input element like
`<input type="text" id="maptack-lat" name="lat" />`.

## Release History

- v0.2.1 Added support for onTack event to provide users the ability of
  customize behavior on every user map click.
- v0.2.0 A port to CoffeeScript with a lot better support, documentation, and
  settings for better support on custom forms.
- v0.1.0 A simple, and untested, JavaScript tool for mapping clicks on a google
  map into latitude and longitude values.
