/**
 * Created by WebPlanex Infotech Pvt. Ltd.
 * email : info@webplanex.com
 *
 * Description : Login/Registration page component which is responsible for Login,Registration and Forgot Password
 */

import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import {CustomValidators} from "../../service/util/validator.service";
import 'rxjs/add/operator/filter';
import {AuthenticationService} from "../../service/authentication.service";
import {ToastType, ToastService} from "../../service/toast.service";
import {SpinnerService} from "../../service/spinner.service";

@Component({
  templateUrl: './login-registration.tmpl.html',
  styleUrls: ['./login-registration.style.css']
})
export class LoginRegistrationComponent implements OnInit {
  /**
   * Flag to show Forgot Password screen
   * @type {boolean}
   */
  private forgotPassword: boolean = false;

  /**
   * Flag to show otpVerification Screen
   * @type {boolean}
   */
  private otpVerification: boolean = false;

  /**
   * Flag to handle if user is successfully registered
   * @type {boolean}
   */
  private registeredSuccessfully: boolean = false;

  /**
   * Flag to show otpResend Message
   * @type {boolean}
   */
  private otpResend: boolean = false;

  /**
   * Login Form handler
   */
  public loginForm: FormGroup;

  /**
   * Registration form handler
   */
  public registrationForm: FormGroup;
  /**
   * Forgot Password Form handler
   */
  public forgotPasswordForm: FormGroup;

  /**
   * OTP Verification Form handler
   */
  public otpVerificationForm: FormGroup;

  /**
   * Flag to handle if Mobile is entered in login
   * @type {boolean}
   */
  private isMobileLogin: boolean = false;

  /**
   * Flag to handle if Mobile is entered in registration
   * @type {boolean}
   */
  private isMobileRegistration: boolean = false;

  /**
   * Flag to handle if Mobile is entered in Forgot Password
   * @type {boolean}
   */
  private isMobileForgotPassword: boolean = false;

  /**
   * OTP Text which will be changed according to otpResend/otpResent
   * @type {string}
   */
  private otpText: string = "Sending OTP Please wait...";

  /**
   * Flag to handle incorrect OTP
   * @type {boolean}
   */
  private incorrectOTP: boolean = false;

  /**
   * Public constructor which does all the initialization of instance variables
   * @param toast
   * @param spinner
   * @param router
   * @param route
   * @param formBuilder
   * @param authService
   */
  constructor(private toast: ToastService, private spinner: SpinnerService,
              private router: Router, private route: ActivatedRoute,
              private formBuilder: FormBuilder, private authService: AuthenticationService) {

  }

  /**
   * NgInit overridden method which performs all the initialization logic like
   *  - Initialization of form
   *  - Forgot Password route handling
   *  - OTP Verification route handling
   */
  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (typeof params['link'] != 'undefined') {
        if (params['link'].indexOf('forgot') != -1) {
          this.buildForgotPassword();
        } else {
          this.buildLoginRegistration();
        }
      } else {
        this.buildLoginRegistration();
      }
    });
    this.register();
  }

  /**
   * Builds Login & Registration form using initialized FormBuilder
   */
  private buildLoginRegistration(): void {
    this.forgotPassword = false;
    this.otpVerification = false;
    this.loginForm = this.formBuilder.group({
      emailMobile: new FormControl('', [Validators.required, Validators.compose([CustomValidators.emailMobileValidator])]),
      password: new FormControl('', [Validators.required])
    });

    this.registrationForm = this.formBuilder.group({
      emailMobile: new FormControl('raja.d.vas@gmail.com', [Validators.required, Validators.compose([CustomValidators.emailMobileValidator])]),
      password: new FormControl('123456', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]),
      confirmPassword: new FormControl('123456', [Validators.required]),
      t_and_c: new FormControl('', [Validators.required])
    }, {validator: CustomValidators.matchingPasswords('password', 'confirmPassword')});

    this.loginForm.valueChanges.subscribe((value) => {
        this.isMobileLogin = CustomValidators.isMobile(value['emailMobile']);
    });

    this.registrationForm.valueChanges.subscribe((value) => {
        this.isMobileRegistration = CustomValidators.isMobile(value['emailMobile']);
    });

  }

  /**
   * Builds forgot password form
   */
  private buildForgotPassword(): void {
    this.forgotPassword = true;
    this.otpVerification = false;
    this.forgotPasswordForm = this.formBuilder.group({
      emailMobile: new FormControl('', [Validators.required, Validators.compose([CustomValidators.emailMobileValidator])])
    });

    this.forgotPasswordForm.valueChanges.subscribe((value) => {
        this.isMobileForgotPassword = CustomValidators.isMobile(value['emailMobile']);
    });

  }

  /**
   * Builds OTP Verification form
   */
  private buildOTP(): void {
    this.forgotPassword = false;
    this.otpVerification = true;
    this.otpVerificationForm = this.formBuilder.group({
      otp: new FormControl('', [Validators.required, Validators.minLength(6), Validators.compose([CustomValidators.numbersOnlyValidator])])
    });
  }

  /**
   * Performs the login functionality by using the available service method and acts accordingly
   */
  public login(): void {
    this.spinner.startLoading();
    this.authService.login(this.loginForm.value['emailMobile'], this.loginForm.value['password'])
      .then(res => {
          this.spinner.completeLoading();
          console.log("Logged-in");
        },
        err => {
          this.spinner.completeLoading();
          this.toast.addToast(ToastType.ERROR, "Got an error while letting you in !!");
        });
  }

  /**
   * Performs the registration functionality by using service methods
   */
  public register(): void {
    // let user: User = new User(null, this.isMobileRegistration ? this.registrationForm.value['emailMobile'] : '', this.isMobileRegistration ? '' : this.registrationForm.value['emailMobile'], this.registrationForm.value['password'], null);
    // this.spinner.startLoading();
    // this.authService.register(user).then(res => {
    //   this.spinner.completeLoading();
    this.registeredSuccessfully = true;
    this.buildOTP();
    // }, err => {
    //   console.log(err);
    //   this.spinner.completeLoading();
    //   this.toast.addToast(ToastType.ERROR, "Got an error while letting you in !!");
    // });
  }

  public forgotPasswordFunc(): void {
    this.spinner.startLoading();
    this.authService.forgotPassword()
      .then(res => {
          this.spinner.completeLoading();
          console.log("Logged-in");
        },
        err => {
          this.spinner.completeLoading();
          this.toast.addToast(ToastType.ERROR, "Got an error while letting you in !!");
        });
  }

  public otpVerify() {
    this.spinner.startLoading();
    this.authService.otpVerification(this.otpVerificationForm.value['otp'])
      .then(res => {
          this.spinner.completeLoading();
          if (!res.status) {
            this.incorrectOTP = true;
          }
        },
        err => {
          this.spinner.completeLoading();
          this.toast.addToast(ToastType.ERROR, "Got an error while verifying your account !!");
        });
  }

  public resendOtp() {
    this.spinner.startLoading();
    this.authService.resendOtp()
      .then(res => {
          this.spinner.completeLoading();
          this.otpResend = true;
          this.otpText = "New OTP has been sent to your account.";
        },
        err => {
          this.spinner.completeLoading();
          this.toast.addToast(ToastType.ERROR, "Got an error while sending OTP Request !!");
        });
  }

  /**
   * Handles navigation to forgot-password page using path params
   * @param isLogin
   */
  public loadPage(isLogin: boolean): void {
    if (isLogin) {
      this.router.navigate(['/get-in']);
    } else {
      this.router.navigate(['/get-in', {link: 'forgot-password'}]);
    }
  }

}
