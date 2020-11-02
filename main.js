var placeSearch;
var autocomplete;
const componentForm = {
    street_number: "short_name",
    route: "long_name",
    locality: "long_name",
    administrative_area_level_1: "short_name",
    country: "long_name",
    postal_code: "short_name",
    administrative_area_level_2: "long_name"
};

function initAutocomplete() {
    // Create the autocomplete object, restricting the search predictions to
    // geographical location types.
    var defaultPlace = new google.maps.LatLng(39.1667, 35.6667);
    var options =
    {
        location: defaultPlace,
        radius: 20000,
        types: ["geocode"],
        componentRestrictions: {
            country: 'tr'
        }
    };

    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById("autocomplete"),
        options
    );
    // Avoid paying for data that you don't need by restricting the set of
    // place fields that are returned to just the address components.
    autocomplete.setFields(["address_component"]);
    // When the user selects an address from the drop-down, populate the
    // address fields in the form.
    autocomplete.addListener("place_changed", fillInAddress);
}

function fillInAddress() {
    // Get the place details from the autocomplete object.
    const place = autocomplete.getPlace();
	console.log(place);

    for (const component in componentForm) {
        document.getElementById(component).value = "";
        document.getElementById(component).disabled = false;
    }

    // Get each component of the address from the place details,
    // and then fill-in the corresponding field on the form.
    for (const component of place.address_components) {
        const addressType = component.types[0];

        if (componentForm[addressType]) {
            const val = component[componentForm[addressType]];
            document.getElementById(addressType).value = val;
        }
    }
}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
// function geolocate() {
    // if (navigator.geolocation) {
        // navigator.geolocation.getCurrentPosition((position) => {
            // const geolocation = {
                // lat: position.coords.latitude,
                // lng: position.coords.longitude,
            // };
            // const circle = new google.maps.Circle({
                // center: geolocation,
                // radius: position.coords.accuracy,
            // });
            // autocomplete.setBounds(circle.getBounds());
        // });
    // }
// }
