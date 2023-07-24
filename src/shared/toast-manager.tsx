import ReactDOM from "react-dom";
import Toast from "./toast";
import { ToastProps } from "./toast-props";

export class ToastManager {
  private containerRef: HTMLDivElement;
  private toasts: ToastProps[] = [];

  constructor() {
    const body = document.getElementsByTagName("body")[0] as HTMLBodyElement;
    const toastContainer = document.createElement("div") as HTMLDivElement;
    toastContainer.id = "toast-container-main";
    body.insertAdjacentElement("beforeend", toastContainer);
    this.containerRef = toastContainer;
  }

  public show(slice: ToastProps): void {
    slice.destroy = () => this.destroy(slice.id);
    this.toasts = [slice, ...this.toasts]; 
    this.render();
  }

  public destroy(id: string): void {
    this.toasts = this.toasts.filter((toast: ToastProps) => toast.id !== id);
    this.render();
  }

  private render(): void {
    const toastsList = this.toasts.map((toastProps: ToastProps) => (
      <Toast key={toastProps.id} {...toastProps} />
    ));
    ReactDOM.render(toastsList, this.containerRef);
  }
}

export const toast = new ToastManager();