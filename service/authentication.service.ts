/**
 * Created by WebPlanex Infotech Pvt. Ltd.
 * email : info@webplanex.com
 *
 * Description : Authentication Service which will be responsible for authenticating a user
 * or SignUp
 */

import {Injectable} from "@angular/core";
import {HttpService} from "./util/http.service";
import {User} from "../model/user.model";
import {CustomType} from "../library/custom-type";

@Injectable()
export class AuthenticationService {

  private readonly authURL: string = "login";
  private readonly registerURL: string = "saveUser";
  private readonly forgotPasswordURL: string = "forgotPassword";
  private readonly otpVerificationURL: string = "userVerification";
  private readonly resendOTPURL: string = "resendOtp";

  constructor(private httpService: HttpService) {
  }

  /**
   *
   * @param username
   * @param password
   */
  public login(username: string, password: string) {
    let obj:CustomType = {};
    obj['username'] = username;
    obj['password'] = password;
    return new Promise((resolve, reject) => {
      this.httpService.postForm(this.authURL, obj).subscribe(data => {
        resolve(data);
      }, err => {
        reject(err);
      });
    });
  }

  /**
   * Method to invoke Register API and returns a Promise
   * @param user
   * @returns {Promise<Object>}
   */
  public register(user: User): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpService.postJSON(this.registerURL, user).subscribe(data => {
        resolve(data);
      }, err => {
        reject(err);
      });
    });
  }

  /**
   * Method for Forgot Password API
   * @returns {Promise<Object>}
   */
  public forgotPassword(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpService.postJSON(this.forgotPasswordURL, {}).subscribe(data => {
        resolve(data);
      }, err => {
        reject(err);
      });
    });
  }

  /**
   * Method for OTP Verification
   * @param otp
   * @returns {Promise<Object>}
   */
  public otpVerification(otp: string): Promise<any> {
    let obj: CustomType = {};
    obj['otpForVefification'] = otp;

    return new Promise((resolve, reject) => {
      this.httpService.postJSON(this.otpVerificationURL, obj).subscribe(data => {
        resolve({status : true});
      }, err => {
        reject(err);
      });
    });
  }

  /**
   * Method for Resend OTP
   * @returns {Promise<Object>}
   */
  public resendOtp(): Promise<any> {
    let email:string = "";
    let obj: CustomType = {};
    obj['email'] = email;

    return new Promise((resolve, reject) => {
      this.httpService.postJSON(this.resendOTPURL, obj).subscribe(data => {
        resolve(data);
      }, err => {
        reject(err);
      });
    });
  }

}
