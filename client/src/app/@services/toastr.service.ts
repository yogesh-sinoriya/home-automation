import { Injectable } from '@angular/core';import { NbToastrService, NbToastrConfig, NbGlobalPosition, NbGlobalPhysicalPosition, NbComponentStatus, NbGlobalLogicalPosition } from '@nebular/theme';

@Injectable({
    providedIn: 'root'
  })
export class ToastrService {

    constructor(private toastrService: NbToastrService) {}

    config: NbToastrConfig;
  
    private index = 1;
    private destroyByClick = true;
    private duration = 4000;
    private hasIcon = true;
    private position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
    private preventDuplicates = false;
    private status: NbComponentStatus = 'primary';
  
    private title = 'HI there!';
    private content = `I'm cool toaster!`;
  
    types: NbComponentStatus[] = [
      'primary',
      'success',
      'info',
      'warning',
      'danger',
    ];
    positions: string[] = [
      NbGlobalPhysicalPosition.TOP_RIGHT,
      NbGlobalPhysicalPosition.TOP_LEFT,
      NbGlobalPhysicalPosition.BOTTOM_LEFT,
      NbGlobalPhysicalPosition.BOTTOM_RIGHT,
      NbGlobalLogicalPosition.TOP_END,
      NbGlobalLogicalPosition.TOP_START,
      NbGlobalLogicalPosition.BOTTOM_END,
      NbGlobalLogicalPosition.BOTTOM_START,
    ];
  
    quotes = [
      { title: null, body: 'We rock at Angular' },
      { title: null, body: 'Titles are not always needed' },
      { title: null, body: 'Toastr rock!' },
    ];
  
    makeToast() {
      this.showToast(this.status, this.title, this.content);
    }
  
    openRandomToast () {
      const typeIndex = Math.floor(Math.random() * this.types.length);
      const quoteIndex = Math.floor(Math.random() * this.quotes.length);
      const type = this.types[typeIndex];
      const quote = this.quotes[quoteIndex];
  
      this.showToast(type, quote.title, quote.body);
    }
  
    private showToast(type: NbComponentStatus, title: string, body: string) {
      const config = {
        status: type,
        destroyByClick: this.destroyByClick,
        duration: this.duration,
        hasIcon: this.hasIcon,
        position: this.position,
        preventDuplicates: this.preventDuplicates,
      };
      const titleContent = title ? `. ${title}` : '';
  
      this.index += 1;
      this.toastrService.show(
        body,
        `Toast ${this.index}${titleContent}`,
        config);
    }

    public show(type: NbComponentStatus, title: string, body: string) {
        const config = {
          status: type,
          destroyByClick: this.destroyByClick,
          duration: this.duration,
          hasIcon: this.hasIcon,
          position: this.position,
          preventDuplicates: this.preventDuplicates,
        };
        const titleContent = title ? `. ${title}` : '';
    
        this.index += 1;
        this.toastrService.show(
          body,
          title,
          config);
      }
}
