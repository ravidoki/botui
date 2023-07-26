import { Directive, Input, Host, Self, AfterViewInit, OnDestroy } from '@angular/core';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';
@Directive({
    selector: '[appAutoCompleteEnforceSelection]'
})
export class AutocompleteEnforceSelectionDirective implements AfterViewInit,OnDestroy {

    @Input() matAutocomplete: MatAutocomplete;
    subscription:Subscription
    constructor(@Host() @Self() private readonly autoCompleteTrigger: MatAutocompleteTrigger,private ngControl: NgControl) {
       
     }
ngAfterViewInit(){
    this.subscription=this.autoCompleteTrigger.panelClosingActions
    .subscribe((e) => {
       if (!e || !e.source) {
            const selected = this.matAutocomplete.options
                .map(option => option.value)
                .find(option => option === this.ngControl.value);

            if (selected == null) {
                this.ngControl.control.setValue(null);
            }
        }
    })
}
ngOnDestroy(){
    if (this.subscription && !this.subscription.closed) {
        this.subscription.unsubscribe();
    }
}

}

