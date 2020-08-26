import preval from 'preval.macro';
import jquery from 'jquery';

import SundialCookies from './SundialCookies';

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
        data: body,
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

  login({ token, metadata }) {
    const baseURL = SundialNetworker.baseURL();
    const reqURL = baseURL + '/login';
    const reqHeaders = {
    };

    const reqBody = { token, metadata };
    return this.post(reqURL, reqBody, reqHeaders);
  }

}

export default SundialNetworker;
