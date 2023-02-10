# Withings Test

*Estimate duration:*  2h/3h
*Languages:* PHP 7.X or 8.X in backend, ReactJS in frontend

## Introduction

This test has 2 steps:

- 1st step for testing backend development
- 2nd step for testing frontend development

### Result

- Send a github with your result (or at least send an archive by email)

- To evaluate your result we will assess:
  - Topic understanding
  - Resourcefulness
  - Code quality

- Don't forget to reread, clean and nicely format your code: **we give priority to quality over quantity**

- If you want, you can add an IMPROVEMENTS.md file to specify how you would improve your code with more working time.

- Please contact us if you are facing any blocking situation.

## Instructions

### Backend (estimate duration: 1h)

Withings has a public API making possible for developers to retrieve customer Withings data after being authorized by the customer to access it. The Withings public API is using the OAuth2.0 protocol to authenticate the calls.

In this test, you will have to **write a simple HTML webview and a script in PHP** to use the OAuth2.0 protocol and get the demo-user weight measurements using the Withings public API.

We already registered to the Withings public API and got the following credentials:

- **clientid**: a16837aaa8f536b229ce20fa8e90a2739885b640ff67de7b84562b6fe0e27513
- **secret**: ****************************************************************
- **authorized callback url**: http://localhost:7070

Put your development files inside the following folder: *backend-oauth2*

1/ Consult our documentation about the [OAuth2.0 protocol](https://developer.withings.com/developer-guide/v3/integration-guide/public-health-data-api/get-access/oauth-web-flow) (you are allowed to consult other sources).

2/ Write a simple HTML webview to make a partner app request customer authorization and a script in PHP (you can use objects or just write a script) to retrieve the OAuth2.0 access_token. To help you starting: the HTML webview will have to display a button targeting the following link: <https://account.withings.com/oauth2_user/authorize2?response_type=code&client_id=a16837aaa8f536b229ce20fa8e90a2739885b640ff67de7b84562b6fe0e27513&redirect_uri=http://localhost:7070&state=withings_test&scope=user.metrics&mode=demo>.

3/ Improve your PHP script to get the last weight measurements of the user using the [Measure - Getmeas API](https://developer.withings.com/api-reference#operation/measure-getmeas) and display them in a webview.

Notices:

- To simplify the usage of the Withings public API, [a demo mode](https://developer.withings.com/developer-guide/v3/integration-guide/public-health-data-api/get-access/oauth-web-flow#demo-user) exists. We suggest you to use it.

- You can consult our [Postman collection](https://developer.withings.com/developer-guide/v3/integration-guide/public-health-data-api/data-api/additional-resources)

- You DON'T need to follow the [signature hash protocol](https://developer.withings.com/developer-guide/v3/integration-guide/public-health-data-api/get-access/sign-your-requests)

- You DON'T need to implement the [notification system](https://developer.withings.com/developer-guide/v3/integration-guide/public-health-data-api/maintain-your-integration/understand-our-timeline-for-notice)

- You DON'T need to implement a complex architecture with a bdd, etc..

- You can test your PHP script by running a local server (cf. *How to install* section below) and then follow the link in Backend step 2.

  ### Frontend (estimate duration: 1h-2h)

  In this test, you will create a Quiz in React with the help of the API https://the-trivia-api.com/

  What we want:

  1. A Quiz with 5 questions from Trivia API
  2. A component that will display one question and its possible answers
  3. Check the answer is correct when the user selects one and validates
  4. Highlight the good answer
  5. Update the score of the user and go to next question
  6. At the end of the Quiz, display the final score and propose to retry a new quiz

  Notices:

  - We propose to you the foundation of the project. Check the *How to install* section to run the project in local.
  - You can rewrite the code and structure the project like you want.
  - Go to frontend-quiz/src/App.js and begin the development. Good luck!
  - For you information, you can find an [example here](https://withings-quiz.netlify.app/)
  - Bonus: propose to the user a config before beginning the quiz : number of questions, categories, difficulty ... Then use the API with the good parameters to fetch questions.
  - Bonus: Add a timer to answer

## How to Install

### Backend

- PHP 7.X or 8.X on your computer

- Set the environment variable
    - `WITHINGS_SECRET` with the secret
      ```bash
      # From the same terminal session that you will launch the server from
      export WITHINGS_SECRET=********************************
      ```

The `backend-oauth2` folder is the folder for the Backend test. Go to this folder and launch the server in local with the command : `php -S localhost:7070`. Then go to your browser and open `http://localhost:7070`.

### Frontend

- NodeJS 14.X or 16.X
- Yarn or NPM (we prefer yarn)

The `frontend-quiz` folder is the folder for the Frontend test. Do `yarn install` in this folder to install node_modules. Then do `yarn start` to launch the local server `http://localhost:9000` and watch your changes.

Thanks for the time you take!
