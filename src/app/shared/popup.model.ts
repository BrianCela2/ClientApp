export enum ToastType {
    PRIMARY = 'toast-primary',
    SECONDARY = 'toast-secondary',
    SUCCESS = 'toast-success',
    INFO = 'toast-info',
    WARNING = 'toast-warning',
    DANGER = 'toast-danger'
  }
  export class ToastMessage {
    public id: number;
    constructor(
      public message: string,
      public type: ToastType,
      public duration: number = 2000
    ) {
      this.id = new Date().getTime();
    }
  }
  export enum ToasterPosition {
    TOP_LEFT = 'toaster-top-left',
    TOP_CENTER = 'toaster-top-center',
    TOP_RIGHT = 'toaster-top-right',
    BOTTOM_LEFT = 'toaster-bottom-left',
    BOTTOM_CENTER = 'toaster-bottom-center',
    BOTTOM_RIGHT = 'toaster-bottom-right'
  }
  export const ToastIconMap: Record<ToastType, string> = {
    [ToastType.PRIMARY]: 'fas fa-info-circle',
    [ToastType.SECONDARY]: 'fas fa-question-circle',
    [ToastType.SUCCESS]: 'fas fa-check-circle',
    [ToastType.INFO]: 'fas fa-info-circle',
    [ToastType.WARNING]: 'fas fa-exclamation-triangle',
    [ToastType.DANGER]: 'fas fa-exclamation-circle',
  };