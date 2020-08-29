import preval from "preval.macro";
import jquery from "jquery";
import moment from "moment";

import SundialCookies from "./SundialCookies";

const SUNDIAL_AUTH_HEADER_KEY = "Sundial-Token";

class SundialNetworker {

    static baseURL () {

        const url = preval`module.exports = process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL : 'https://sundialclick.herokuapp.com'`;
        return url;

    }

    log (msg) {

        if (preval`module.exports = process.env.REACT_APP_BASE_URL != null`) {

            console.log(`[SundialNetworker-DEBUG] ${msg}`);

        }

    }

    post (url, body, headers = {}) {

        return new Promise((resolve, reject) => {

            this.log(`sending off POST url ${url} body ${JSON.stringify(body)}`);
            jquery.ajax({
                "method": "POST",
                url,
                "data": body,
                "type": "jsonp",
                headers,
                "success": (response) => {

                    this.log(`success from POST url ${url} body ${JSON.stringify(body)} response ${JSON.stringify(response)}`);

                    if (response && response.data && response.success) {

                        resolve(response);

                    } else {

                        reject(response);

                    }

                },
                "error": (error) => {

                    this.log(`failure from POST url ${url} body ${JSON.stringify(body)} error ${JSON.stringify(error)}`);
                    reject(error);

                }
            });

        });

    }

    login ({token, metadata}) {

        const baseURL = SundialNetworker.baseURL(),
            reqURL = `${baseURL}/login`,
            reqHeaders = {
            },

            reqBody = {token,
                metadata};
        return this.post(
            reqURL,
            reqBody,
            reqHeaders
        );

    }

    newItem ({token, name, date, metadata}) {

        const baseURL = SundialNetworker.baseURL(),
            reqURL = `${baseURL}/item/new`,
            reqHeaders = {};
        reqHeaders[SUNDIAL_AUTH_HEADER_KEY] = token;

        const reqBody = {
            "itemName": name,
            "itemMetadata": metadata,
            "itemDate": date
        };

        return this.post(
            reqURL,
            reqBody,
            reqHeaders
        );

    }

    getItems ({token}) {

        const baseURL = SundialNetworker.baseURL(),
            reqURL = `${baseURL}/items/get`,
            reqHeaders = {};
        reqHeaders[SUNDIAL_AUTH_HEADER_KEY] = token;

        return this.post(
            reqURL,
            {},
            reqHeaders
        );

    }

    editItem ({token, id, name, date, metadata}) {

        const baseURL = SundialNetworker.baseURL(),
            reqURL = `${baseURL}/item/edit`,
            reqHeaders = {};
        reqHeaders[SUNDIAL_AUTH_HEADER_KEY] = token;

        const reqBody = {
            "itemId": id,
            "itemName": name,
            "itemDate": date,
            "itemMetadata": metadata
        };

        return this.post(
            reqURL,
            reqBody,
            reqHeaders
        );

    }

    deleteItem ({token, id}) {

        const baseURL = SundialNetworker.baseURL(),
            reqURL = `${baseURL}/item/delete`,
            reqHeaders = {};
        reqHeaders[SUNDIAL_AUTH_HEADER_KEY] = token;

        const reqBody = {
            "itemId": id
        };

        return this.post(
            reqURL,
            reqBody,
            reqHeaders
        );

    }

}

export default SundialNetworker;
