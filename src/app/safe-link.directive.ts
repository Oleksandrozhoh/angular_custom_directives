import { Directive, ElementRef, inject, input } from "@angular/core";

@Directive({
    selector: 'a[appSafeLink]', // apply this directive to any link element with appSafeLink attribute
    standalone: true,
    host: {
        '(click)': 'onLinkClick($event)'
    }
})
export class SafeLinkDirective {

    appSafeLink = input('myapp');

    private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef)


    constructor(){
        console.log("Safe Link directive is active!")
    }

    onLinkClick(event: MouseEvent){
        const wantsToLeave = window.confirm('Do you want to leave the app');
        if(wantsToLeave){
            const address = this.hostElementRef.nativeElement.href;
            this.hostElementRef.nativeElement.href = `${address}?from=${this.appSafeLink()}`;
            return;
        }
        
        event?.preventDefault();
        
    }

}