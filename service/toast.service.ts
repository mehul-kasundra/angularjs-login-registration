/**
 * Created by WebPlanex Infotech Pvt. Ltd.
 * email : info@webplanex.com
 *
 * Description : $Description$
 */


import {Injectable} from '@angular/core';
import 'rxjs/add/operator/share';
import {ToastyConfig, ToastyService, ToastOptions} from "ng2-toasty";

export const enum ToastType {
  INFO = 0,
  SUCCESS = 1,
  WAIT = 2,
  ERROR = 3,
  WARNING = 4
}

const ToastTypeTitles = {
  info: '',
  success: '',
  wait: '',
  error: 'Ouchh !!',
  warning: '',
};

@Injectable()
export class ToastService {
  private timeout: number = 7000;

  constructor(private toastyService: ToastyService, private toastyConfig: ToastyConfig) {
    // Assign the selected theme name to the `theme` property of the instance of ToastyConfig.
    // Possible values: default, bootstrap, material
    this.toastyConfig.theme = 'material';
  }

  addToast(toastType: ToastType, message: string) {
    // Or create the instance of ToastOptions
    let toastOptions: ToastOptions = {
      title: toastType.toString(),
      msg: message,
      showClose: true,
      timeout: this.timeout,
      theme: this.toastyConfig.theme
    };

    switch (toastType) {
      case ToastType.INFO :
        this.toastyService.info(toastOptions);
        break;
      case ToastType.SUCCESS :
        this.toastyService.success(toastOptions);
        break;
      case ToastType.WAIT :
        this.toastyService.wait(toastOptions);
        break;
      case ToastType.ERROR :
        toastOptions.title = ToastTypeTitles.error;
        this.toastyService.error(toastOptions);
        break;
      case ToastType.WARNING :
        this.toastyService.warning(toastOptions);
        break;
    }
  }

}
