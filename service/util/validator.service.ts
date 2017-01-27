/**
 * validator.service.ts : Global Validator Service for performing validations
 * @author WebPlanex Infotech Pvt. Ltd.
 * 
 */

import {FormControl, FormGroup} from "@angular/forms";

export class CustomValidators {
  private static emailRegexp = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
  private static numberRegex = /^[0-9]{3,10}$/;
  private static numberWithCountryCodeRegex = /^[+]{0,2}[0-9]{3,12}$/;
  private static numbersOnlyRegex = /^[0-9]+$/;

  /**
   * check for email validation
   * @param control
   * @returns {{invalidEmail: boolean}}
   */
  public static emailValidator(control: FormControl): {[key: string]: any} {

    if (control.value && !CustomValidators.emailRegexp.test(control.value)) {
      return {invalidEmail: true};
    }
  }

  /**
   * Email and Mobile validator for Forms
   * @param control
   * @returns {any}
   */
  public static emailMobileValidator(control: FormControl): {[key: string]: any} {
    if (control.value && (!CustomValidators.emailRegexp.test(control.value) && !CustomValidators.numberWithCountryCodeRegex.test(control.value))) {
      return {invalidData: true};
    }
    return null;
  }

  /**
   * Numbers Only Validator for Forms
   * @param control
   * @returns {any}
   */
  public static numbersOnlyValidator(control: FormControl): {[key: string]: any} {
    if (control.value && !CustomValidators.numbersOnlyRegex.test(control.value)) {
      return {invalidData: true};
    }
    return null;
  }

  /**
   * check for matching passwords
   * @param passwordKey
   * @param confirmPasswordKey
   * @returns {function(FormGroup): {}}
   */
  public static matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }

  /**
   * Validates if given string is a mobile number
   * @param number
   * @returns {boolean}
   */
  public static isMobile(number: string): boolean {
    return CustomValidators.numberRegex.test(number);
  }

  /**
   * Validates if given string is a mobile number with country code
   * @param number
   * @returns {boolean}
   */
  public static isMobileWithCountryCode(number: string): boolean {
    return CustomValidators.numberWithCountryCodeRegex.test(number);
  }


  /**
   * Validates if a given string is an email
   * @param email
   * @returns {boolean}
   */
  public static isEmail(email: string): boolean {
    return CustomValidators.emailRegexp.test(email);
  }

}
