if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    fetchLocalilty(latitude, longitude);
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  });
} else {
  console.log("Geolocation is not supported by this browser.");
}

function fetchLocalilty(lat, long) {
  fetch(
    `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&apiKey=ab5f9b83fc424dc1bfc4217dc341cbba`
  )
    .then((resp) => resp.json())
    .then((result) => {
      let current_zone = document.getElementById("current_zone");
      createCurrentTimezone(result?.features[0]?.properties, current_zone);

      if (result.length) {
        console.log(result[0].timezone);
      } else {
        console.log("No location found");
      }
    });
}

function handlSubmit() {
  let input = document.getElementById("input").value;
  var requestOptions = {
    method: "GET",
  };
  console.log(input);
  fetch(
    `https://api.geoapify.com/v1/geocode/autocomplete?text=${input}&apiKey=ab5f9b83fc424dc1bfc4217dc341cbba`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      let current_zone = document.getElementById("result_zone");
      createCurrentTimezone(result?.features[0]?.properties, current_zone);
      console.log(result?.features[0]?.properties);
    })
    .catch((error) => console.log("error", error));
}

function createCurrentTimezone(data, placed_location) {
  if (data) {
    placed_location.innerHTML = `
    <div class="box_item">
        <span>Name Of Time Zone</span>
        <span class="comma_separeted" >:</span>
        <span>${data?.timezone?.name ?? ""}</span>
    </div>
    <div class="box_item lat_long ">
        <div>
            <span>Lat</span>
            <span class="comma_separeted" >:</span>
            <span>${data?.lat ?? ""}</span>
        </div>
        <div>
            <span>Long</span>
            <span class="comma_separeted" >:</span>
            <span>${data?.lon ?? ""}</span>
        </div>

    </div>
    <div class="box_item">
        <span>Offset STD</span>
        <span class="comma_separeted" >:</span>
        <span>${data?.timezone?.offset_STD ?? ""}</span>
    </div>
    <div class="box_item">
        <span>Offset STD Seconds</span>
        <span class="comma_separeted" >:</span>
        <span>${data?.timezone?.offset_STD_seconds ?? ""}</span>
    </div>
    <div class="box_item">
        <span>Offset DST</span>
        <span class="comma_separeted" >:</span>
        <span>${data?.timezone?.offset_DST ?? ""}</span>
    </div>
    <div class="box_item">
        <span>Offset DST Seconds </span>
        <span class="comma_separeted" >:</span>
        <span>${data?.timezone?.offset_DST_seconds ?? ""}</span>
    </div>
    <div class="box_item">
        <span>Country</span>
        <span class="comma_separeted" >:</span>
        <span>${data?.country ?? ""}</span>
    </div>
    <div class="box_item">
        <span>Postcode</span>
        <span class="comma_separeted" >:</span>
        <span>${data?.postcode ?? ""}</span>
    </div>
    <div class="box_item">
        <span>City</span>
        <span class="comma_separeted" >:</span>
        <span>${data?.county ?? ""}</span>
    </div>

`;
  } else {
    placed_location.innerHTML = `<div class="empty_box" >No Location Found </div>`;
  }
}
