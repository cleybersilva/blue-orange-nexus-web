
declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
        prefill?: Record<string, any>;
        utm?: Record<string, any>;
      }) => void;
      showPopupWidget: (url: string) => void;
      closePopupWidget: () => void;
    };
  }
}

export {};
