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

  // Build the request body and make the API call to retrieve the access token
  $ch = curl_init();

  curl_setopt($ch, CURLOPT_URL, "https://wbsapi.withings.net/v2/oauth2");
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
  curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query([
    'action' => 'requesttoken',
    'grant_type' => 'authorization_code',
    'client_id' => $client_id,
    'client_secret' => $client_secret,
    'code' => $code,
    'redirect_uri' => 'http://localhost:7070'
  ]));

  $response = curl_exec($ch);
  curl_close($ch);

  // Decode the response
  $response = json_decode($response, true);

  // Return the access token
  return $response['body']['access_token'];
}

function getMeasurements($access_token)
{
  $ch = curl_init();

  curl_setopt($ch, CURLOPT_URL, "https://wbsapi.withings.net/measure");
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
  curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $access_token
  ]);

  curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query([
    'action' => 'getmeas',
    'offset' => 10,
    'meastype' => 1
  ]));

  $rsp = curl_exec($ch);
  curl_close($ch);

  $data = json_decode($rsp, true);

  if (isset($data['body']['measuregrps'])) {
    $measurements = $data['body']['measuregrps'];
  } else {
    $measurements = [];
  }

  return $measurements;
}
?>