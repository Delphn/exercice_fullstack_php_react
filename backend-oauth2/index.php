<html>

<head>
  <title>Withings Oauth2</title>
</head>

<body>

  <h1>Withings measurements</h1>
  <button>
    <a href="http://accountbeta.withings.com/oauth2_user/authorize2?response_type=code&client_id=a16837aaa8f536b229ce20fa8e90a2739885b640ff67de7b84562b6fe0e27513&redirect_uri=http://localhost:7070&state=withings_test&scope=user.metrics&mode=demo">
      Get the latest demo-user weight measurements
    </a>
  </button>
</body>

</html>

<?php

// Check if the code parameter is present in the URL.
if (!empty($_GET['code'])) {

  $access_token = getAccessToken($_GET['code']);

  $measuregrps = getMeasurements($access_token);

  if (!empty($measuregrps)) {
    echo "<h4>Lastest Demo User Measurements:</h4>";

    echo "<ul>";
    foreach ($measuregrps as $measuregrp) {
      $weight = $measuregrp['measures'][0]['value'];
      $unit_exponent = $measuregrp['measures'][0]['unit'];
      $weigh_with_unit = $weight * (10 ** $unit_exponent) . " Kg";
      echo "<li>" . $weigh_with_unit . "</li>";
    }
    echo "</ul>";
  }
}

function getAccessToken($code)
{
  // Get the client secret from the environment variable
  $client_id = "a16837aaa8f536b229ce20fa8e90a2739885b640ff67de7b84562b6fe0e27513";
  $client_secret = getenv("WITHINGS_CLIENT_SECRET");
  $url = "https://wbsapi.withings.net/v2/oauth2";

  // Build the request body and make the API call to retrieve the access token
  $http_header = [];
  $post_fields = [
    'action' => 'requesttoken',
    'grant_type' => 'authorization_code',
    'client_id' => $client_id,
    'client_secret' => $client_secret,
    'code' => $code,
    'redirect_uri' => 'http://localhost:7070'
  ];

  $response = makeApiCall($url, $http_header, $post_fields);

  // Return the access token
  return $response['body']['access_token'];
}

function getMeasurements($access_token)
{
  $url = "https://wbsapi.withings.net/measure";
  $http_header = [
    'Authorization: Bearer ' . $access_token
  ];
  $post_fields = [
    'action' => 'getmeas',
    'meastype' => 1
  ];

  $response = makeApiCall($url, $http_header, $post_fields);

  if (isset($response['body']['measuregrps'])) {
    $measurements = $response['body']['measuregrps'];
  } else {
    $measurements = [];
  }

  return $measurements;
}


function makeApiCall($url, $http_header, $post_fields)
{
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, $url);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
  curl_setopt($ch, CURLOPT_HTTPHEADER, $http_header);
  curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($post_fields));
  $response = curl_exec($ch);
  curl_close($ch);
  return json_decode($response, true);
}
?>