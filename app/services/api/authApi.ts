import { ApiResponse } from "apisauce";
import { Api } from "./api";
import { GeneralApiProblem, getGeneralApiProblem } from "./apiProblem";
import { ApiPlayersResponse, LoginFullResult, LogoutResult, RegisterResult, refreshTokenResult } from "./api.types";
import { PlayerSnapshotIn } from "../../models/Player";
import jwtDecode from 'jwt-decode';

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

  async signup(username: string, email:string,  password: string): Promise<RegisterResult> {
    try {
      const response: ApiResponse<any> = await this.api.apisauce.post(
        "/auth/signup",
        { username, email, password }
      );

      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) return problem;
      }
      
     
      return {kind: "ok"}
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return {kind:"bad-data"}
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

  async refreshToken(refToken:string): Promise<refreshTokenResult> {
    const  refreshRes: refreshTokenResult = {
      refreshToken: "",
      accessToken:"",
      kind: "ok",
    };

    this.api.setAuthToken(refToken);
    const response: ApiResponse<any> = await this.api.apisauce.post(
      "/auth/refreshtoken"
    );

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) {
        refreshRes.kind = "ok"
        return refreshRes
      }
    }

    refreshRes.accessToken = response.data.accessToken;
    refreshRes.refreshToken = response.data.refreshToken;
    refreshRes.kind = "ok";

    return refreshRes
  }

  async getPlayers(refreshToken: string, accessToken: string, curPage: number | 0 ): Promise<{ kind: "ok"; players: PlayerSnapshotIn[] } | GeneralApiProblem> {

    this.api.setAuthToken(accessToken);
    this.api.setRefreshToken(refreshToken);
    const response: ApiResponse<ApiPlayersResponse> = await this.api.apisauce.get(
      "/players",{page: curPage},
    )

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }     

    // transform the data into the format we are expecting
    try {
      const rawData = response.data

      // This is where we transform the data into the shape we expect for our MST model.
      const players: PlayerSnapshotIn[] = rawData.content.map((raw) => ({
        ...raw,
      }))

      return { kind: "ok", players }
    } catch (e) {
      if (__DEV__) {
        console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }
}