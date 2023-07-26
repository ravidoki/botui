import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-page-title',
  template: '',
})
export class PageTitleComponent {

  @Input() heading;
  @Input() subheading;
  @Input() icon;

}
