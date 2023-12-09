import { alertAction } from "../Store/alertManager";
import { loadingAction } from "../Store/loadingManager";
import environment from "./../../environment/environment";
import axios from "axios";
import { UnknownAction } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { UUID } from "crypto";
import { AppAlertType } from "./App-Alert";
class DataService {
  dispatch: Dispatch<UnknownAction>;
  id: string;
  constructor(dispatch: Dispatch<UnknownAction>, id: UUID|string) {
    this.dispatch = dispatch;
    this.id = id;
  }
  async GetMethodIndependent(resource: RequestInfo | URL, options?: RequestInit) {
    this.dispatch(loadingAction.isLoading({ valueState: true, id: this.id }));
    return await fetch(resource, options).then((res1) => {
      this.dispatch(
        loadingAction.isLoading({ valueState: false, id: this.id })
      );
      return res1.json().then((res) => {
        if (res1.ok) {
          return res;
        } else {
          this.dispatch(
            alertAction.alertConfig({
              config: {
                time: 20,
                msg: res.error.message,
                type: AppAlertType.danger,
              },
            })
          );
          throw new Error(res.error.message)
          return res.error;
        }
      });
    });
  }

  async GetMulti(urls: string[]) {
    const requests = urls.map((s) => axios.get(s));
    this.dispatch(loadingAction.isLoading({ valueState: true, id: this.id }));
    return Promise.all(requests);
  }
  async Get(url: string, params?: { [x: string]: any; }) {

    let urlValue = `${environment.baseUrl}${url}`;
    if (params) {
      var keyVAlus: string[] = [];
      urlValue += "?";
      var paramsValue = Object.keys(params);
      paramsValue.forEach((keyParam, index) => {
        keyVAlus.push(`${keyParam}=${params[keyParam]}`);
      });
      urlValue += keyVAlus.join("&");
    }
    return this.GetMethodIndependent(urlValue, {
      headers: {
        Accept: "application/json",
      },
    });
  }

  async Get2(url: any) {

    return this.GetMethodIndependent(`${environment.baseUrl}${url}`, {
      headers: {
        Accept: "application/json",
      },
    }).then((md) => {
      // loadingAction.isLoading({  valueState: false, id: this.id })
      // this.dispatch({ type: "isLoading", valueState: false, id: this.id });

      if (!md.ok) {
        throw new Error("error");
      }
      // const myBlob = md.blob();
      // return myBlob;

      // await md.json();
      return md.json();
    });
  }
  GetMethod(url: string, stateUpdate: (arg0: (pre: any) => any) => any, prop: string | number) {
    const fetchdata = this.GetMethodIndependent(
      `${environment.baseUrl}${url}`,
      {}
    )
      .then((md) => {
        if (!md.ok) {
          throw new Error("error");
        }

        return md.json();
      })
      .then((rd) => {
        let resultData: any[] = [];
        for (const property in rd) {
          let val1 = rd[property];
          let val2 = { id: property };

          resultData.push({ ...val1, val2 });
        }

        prop &&
          stateUpdate((pre) => {
            pre[prop] = resultData;
            return pre;
          });
      })
      .catch((cd) => {
        // this.alert("Data Update Succesfully", AlertType.danger);
      });
    return fetchdata;
  }
  // Example POST method implementation:
  async post(url = "", data = {}) {
    try {
      const bodyData = JSON.stringify(data);
      // Default options are marked with *
      const response = await this.GetMethodIndependent(
        `${environment.baseUrl}${url}`,
        {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          //mode: "cors", // no-cors, *cors, same-origin
          //cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          //credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
            //"Access-Control-Allow-Headers": "Authorization",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          //redirect: "follow", // manual, *follow, error
          //referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: bodyData, //JSON.stringify(data), // body data type must match "Content-Type" header
        }
      );
      // /this.alert("has error", AlertType.danger);

      const result = await response.json(); // parses JSON response into native JavaScript objects
      // this.alert("data addet seccessfully", AlertType.success);
      return result;
    } catch (er) {
      console.log(er);
      throw new Error();
    }

  }
}
export default DataService;
