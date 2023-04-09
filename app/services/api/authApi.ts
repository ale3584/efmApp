import { ApiResponse } from "apisauce";
import { Api } from "./api";
import { getGeneralApiProblem } from "./apiProblem";
import { LoginFullResult, LogoutResult } from "./api.types";

export class AuthenticationApi {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  async login(username: string, password: string): Promise<LoginFullResult> {
    try {
      const  loginRes: LoginFullResult = {
        refreshToken: "",
        accessToken:"",
        roles: [],
        kind: "ok"
      };
      const response: ApiResponse<any> = await this.api.apisauce.post(
        "/auth/signin",
        { username, password }
      );

      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        loginRes.kind = problem;
        if (problem) return loginRes;
      }
      
      loginRes.accessToken = response.data.accessToken;
      loginRes.refreshToken = response.data.refreshToken;
      loginRes.roles = response.data.roles;
      loginRes.kind = "ok";

      return loginRes;
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return {
        refreshToken: "",
        accessToken:"",
        kind: {kind:"bad-data"},
        roles: []
      }
    }
  }

  async logout(refreshToken: string, accessToken: string): Promise<LogoutResult> {
    try {
      this.api.setAuthToken(accessToken);
      this.api.setRefreshToken(refreshToken);
      const response: ApiResponse<any> = await this.api.apisauce.post(
        "/auth/signout"
      );

      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) return problem;
      }

      return { kind: "ok" };
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return { kind: "bad-data" };
    }
  }
}