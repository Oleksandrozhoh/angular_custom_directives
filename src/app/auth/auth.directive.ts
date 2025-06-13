import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { type Permission } from './auth.model';
import { AuthService } from './auth.service';

@Directive({
  selector: '[appAuth]',
  standalone: true
})
export class AuthDirective {
  userType = input.required<Permission>({alias: 'appAuth'});

  private authService = inject(AuthService);

  private templateRef = inject(TemplateRef); // template element which structural directive added to
  private viewContainerRef = inject(ViewContainerRef); // reference to the DOM where the template is being used

  constructor() { 
    effect(()=>{
      if(this.authService.activePermission() === this.userType()){
        this.viewContainerRef.createEmbeddedView(this.templateRef); // createEmbeddedView method tells ang to rended new content into a viewContainerRef place, it takes template to render argument
      }else{
        this.viewContainerRef.clear(); // clear rendered content
      }
    })
  }

}
