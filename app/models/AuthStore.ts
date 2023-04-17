import { Instance, SnapshotIn, SnapshotOut, flow, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { withStatus } from "../extensions/with-status"
import { AuthenticationApi } from "../services/api/authApi"
import { LoginFullResult, LogoutResult, RegisterResult, api, refreshTokenResult } from "../services/api"
import jwtDecode from "jwt-decode"

type DecodedToken = {
    sub: string,
    iat: number,
    exp: number,
}
/**
 * Model description here for TypeScript hints.
 */
export const AuthStoreModel = types
  .model("AuthStore")
  .extend(withStatus)
  .props({
    isAuthenticated: types.optional(types.boolean, false),
    authEmail: "",
    authUser: "",
    authToken: types.maybe(types.string),
    refreshToken: types.maybe(types.string),
  })
  .views((self) => ({
    get isAuthenticate() {
      return !!self.authToken
    },
    get validationError() {
      if (self.authEmail.length === 0) return "can't be blank"
      if (self.authEmail.length < 6) return "must be at least 6 characters"
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(self.authEmail))
        return "must be a valid email address"
      return ""
    },
  }))
  .actions(withSetPropAction)
  .actions((self) => ({
    setAuthenticated(value: boolean) {
      self.isAuthenticated = value;
    },
    setAuthToken(value?: string) {
      self.authToken = value
    },
    setRefreshToken(value?: string) {
      self.refreshToken = value
    },
    setAuthEmail(value: string) {
      self.authEmail = value.replace(/ /g, "")
    },
    setAuthUser(value: string) {
      self.authUser = value.replace(/ /g, "")
    },
  }))
  .actions((self) => ({
    login: flow(function* (emailAddress: string, password: string) {
      self.setStatus("pending");

      const authenticationApi = new AuthenticationApi(api);
      const result: LoginFullResult = yield authenticationApi.login(
        emailAddress,
        password
      );

      if (result.kind === "ok") {
        self.setStatus("done");
        self.setAuthenticated(true);
        self.setAuthToken(result.accessToken);
        self.setRefreshToken(result.refreshToken);
      } else {
        self.setStatus("error");
        self.setAuthenticated(false);
        __DEV__ && console.tron.log(result.kind);
      }
    }),
    signup: flow(function* (username: string, emailAddress: string, password: string) {
      self.setStatus("pending");

      const authenticationApi = new AuthenticationApi(api);
      const result: RegisterResult = yield authenticationApi.signup(
        username,
        emailAddress,
        password
      );

      if (result.kind === "ok") {
        self.setStatus("done");
        
        // self.setAuthenticated(true);
        // self.setAuthToken(result.accessToken);
        // self.setRefreshToken(result.refreshToken);
      } else {
        self.setStatus("error");
        self.setAuthenticated(false);
        __DEV__ && console.tron.log(result.kind);
      }
    }),

    logout: flow(function* () {
      self.setStatus("pending");

      const authenticationApi = new AuthenticationApi(api);
      const result: LogoutResult = yield authenticationApi.logout(self.refreshToken, self.authToken);

      if (result.kind === "ok") {
        self.setStatus("done");
        self.setAuthenticated(false);
        self.authToken = "";
        self.refreshToken = "";
        self.authEmail = "";
      } else {
        self.setStatus("error");
        self.setAuthenticated(false);
        __DEV__ && console.tron.log(result.kind);
      }
    }),
    refToken: flow(function* () {
      self.setStatus("pending");

      const authenticationApi = new AuthenticationApi(api);
      const result: refreshTokenResult = yield authenticationApi.refreshToken(self.refreshToken);

      console.log(result)
      if (result.kind === "ok") {
        self.setStatus("done");
        self.setAuthenticated(true);
        self.setAuthToken(result.accessToken);
        self.setRefreshToken(result.refreshToken);
      } else {
        self.setStatus("error");
        self.setAuthenticated(false);
        self.authToken = "";
        self.refreshToken = "";
        self.authEmail = "";
        __DEV__ && console.tron.log(result.kind);
      }
    }),
    
  })).actions(self=> ({
    checkToken: flow(function* () {
      self.setStatus("pending");

      const decodedToken: DecodedToken = jwtDecode(self.authToken);

      const expirationTime = decodedToken.exp;
  
      if (expirationTime < new Date().getTime() / 1000) {
        self.refToken();
        const decodedToken: DecodedToken = jwtDecode(self.authToken);

        const expirationTime = decodedToken.exp;
        if (expirationTime < new Date().getTime() / 1000) {
          return false;
        }else{
          return true;
        }
      } else {
        return true;
      }
    }),
  }))

export interface AuthStore extends Instance<typeof AuthStoreModel> {}
export interface AuthStoreSnapshotOut extends SnapshotOut<typeof AuthStoreModel> {}
export interface AuthStoreSnapshotIn extends SnapshotIn<typeof AuthStoreModel> {}
export const createAuthStoreDefaultModel = () => types.optional(AuthStoreModel, {})
