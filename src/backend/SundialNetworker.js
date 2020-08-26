import preval from 'preval.macro';
import jquery from 'jquery';

import SundialCookies from './sipsCookies';

class SundialNetworker {
  static baseURL() {
    const url = preval`module.exports = process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL : 'https://sundialclick.herokuapp.com'`;
    return url;
  }

  log(msg) {
    if (preval`module.exports = process.env.REACT_APP_BASE_URL != null`) {
      console.log(`[SundialNetworker-DEBUG] ${msg}`);
    }
  }

  post(url, body, headers={}) {
    return new Promise((resolve, reject) => {
      this.log(`sending off POST url ${url} body ${JSON.stringify(body)}`);
      jquery.ajax({
        method: 'POST',
        url: url,
        data: JSON.stringify(body),
        type: 'jsonp',
        headers: headers,
        success: (response) => {
          this.log(`success from POST url ${url} body ${JSON.stringify(body)} response ${JSON.stringify(response)}`);

          if (response && response.data && response.success) {
            resolve(response);
          } else {
            reject(response);
          }
        },
        error: (error) => {
          this.log(`failure from POST url ${url} body ${JSON.stringify(body)} error ${JSON.stringify(error)}`);
          reject(error);
        },
      });
    });
  }

  getItems(token) {
    const baseURL = SundialNetworker.baseURL();
    const reqURL = baseURL + '/items/get';
    const requestHeaders = {
      'token': token
    };

    return this.post(reqURL, {}, requestHeaders);
  }

}

export default SundialNetworker;
