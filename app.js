var CONFIG = require('./config.json');
var request = require('request');
const fs = require('fs');
const readline = require('readline');

function process() {
  // LOGIN
  var loginOptions = {
    method: 'POST',
    url: 'https://regist-api.vlu.edu.vn/api/Authen/Authenticate',
    headers: {
      accept: 'application/json, text/plain, */*',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      username: CONFIG.username,
      password: CONFIG.password,
    }),
  };

  request(loginOptions, function (error, response) {
    if (error) {
      console.error('Login error:', error.message);
      return;
    }

    try {
      var responseBody = JSON.parse(response.body);
      var token = responseBody["Token"];
      var fullName = responseBody["FullName"];
      console.log("Login success:", fullName);

      // GET STUDY PROGRAM ID
      var getProgramIdoptions = {
        method: 'GET',
        url: 'https://regist-api.vlu.edu.vn/api/Authen/GetAllStudyProgramRegist',
        headers: {
          authorization: 'Bearer ' + token,
        },
      };

      request(getProgramIdoptions, function (error, response) {
        if (error) {
          console.error('Error fetching study program ID:', error.message);
          return;
        }

        try {
          var responseBody = JSON.parse(response.body);
          var studyProgramId = responseBody[0]["StudyProgramID"];
          console.log("Study program ID:", studyProgramId);

          // GET Registration ID
          var getIdDotOptions = {
            method: 'GET',
            url: `https://regist-api.vlu.edu.vn/api/Regist/GetRegistSemesterCreditQuota?StudyProgramID=${studyProgramId}`,
            headers: {
              authorization: 'Bearer ' + token,
            },
          };

          request(getIdDotOptions, function (error, response) {
            if (error) {
              console.error('Error fetching registration ID:', error.message);
              return;
            }

            try {
              var responseBody = JSON.parse(response.body);
              var idDot = responseBody["IdDot"];
              console.log("Registration Period ID:", idDot);

              // Process LHP
              const fileStream = fs.createReadStream('MaLopHocPhan.txt', 'utf8');
              const rl = readline.createInterface({
                input: fileStream,
                crlfDelay: Infinity,
              });

              rl.on('line', (line) => {
                var registOptions = {
                  method: 'POST',
                  url: `https://regist-api.vlu.edu.vn/api/Regist/RegistScheduleStudyUnit?TurnID=${idDot}&Action=REGIST&StudyProgramID=${studyProgramId}`,
                  headers: {
                    authorization: 'Bearer ' + token,
                    'content-type': 'application/json',
                  },
                  body: JSON.stringify([
                    {
                      CurriculumID: line,
                    },
                  ]),
                };

                request(registOptions, function (error, response) {
                  if (error) {
                    console.error(`Error registering LHP ${line}:`, error.message);
                    return;
                  }

                  try {
                    if (response.statusCode !== 200) {
                      var errorMessage = JSON.parse(response.body).message;
                      console.error(`Error registering LHP ${line}:`, errorMessage);
                    } else {
                      console.log(`Successfully registered LHP ${line}`);
                    }
                  } catch (parseError) {
                    console.error('Error parsing registration response:', parseError.message);
                  }
                });
              });
            } catch (parseError) {
              console.error('Error parsing registration period response:', parseError.message);
            }
          });
        } catch (parseError) {
          console.error('Error parsing study program response:', parseError.message);
        }
      });
    } catch (parseError) {
      console.error('Error parsing login response:', parseError.message);
    }
  });
}

async function run() {
  for (let i = 0; i < 999999999; i++) {
    await new Promise((resolve) => {
      process();
      setTimeout(resolve, 500);
    });
  }
}

run();
