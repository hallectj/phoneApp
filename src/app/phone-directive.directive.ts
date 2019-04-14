import { Directive, Input, ElementRef, HostListener } from '@angular/core';
@Directive({ selector: '[appPhoneDirective]'})

export class PhoneDirectiveDirective {
  @Input("appPhoneFormat") format;
  constructor( private el: ElementRef) { }

  @HostListener("blur") onblur(){
    let value: string = this.el.nativeElement.value;
    this.el.nativeElement.value = this.formatPhoneNumber(value);
  }

  private stripPhoneNumber(phoneNumber: string){
    let specialCharArr = ["-", " ", "(", ")"];
    let phoneSplit = phoneNumber.split("");
    let goodNumber = "";
    for(let i = 0; i<phoneSplit.length; i++){
      if(specialCharArr.includes(phoneSplit[i])){
        phoneSplit[i] = "";
      }
    }

    goodNumber = phoneSplit.join("");
    goodNumber = (goodNumber.length != 10) ? "0000000000" : goodNumber.substr(-10);
    return goodNumber;
  }

  private formatPhoneNumber(phoneNumber: string){
    if(!/[0-9]{1,}/g.test(phoneNumber)){return null;}
    phoneNumber = this.stripPhoneNumber(phoneNumber);
    let specialRegex = /\W|_/g, letterRegex = /[a-zA-Z]{1,}/g
    if(phoneNumber == "0000000000" || (specialRegex.test(phoneNumber) || letterRegex.test(phoneNumber))  ){
      return "unrecognized";
    }
    let newPhoneNumber = "(" + phoneNumber.substr(0, 3) + ")" + " " + phoneNumber.substring(3, 6) + "-" + phoneNumber.substring(6, phoneNumber.length);
    return newPhoneNumber;
  }
}
