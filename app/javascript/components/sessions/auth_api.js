import axios from 'axios';

const loginPath = '/api/v1/login';

let AuthAPI = {
  login(email, password) {
    return new Promise(function(resolve, reject) {
      axios.post(loginPath, {email: email, password: password})
        .then((resp) => {
            console.log(resp)
            resolve(resp)
        })
        .catch((errResp) => {
            console.log("errResponse: ", errResp)
            reject(errResp)
        });
    });
  }
};

export default AuthAPI;
