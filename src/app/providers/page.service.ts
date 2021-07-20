import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class PageService {

  UrlServices;
  headers = new HttpHeaders({
    'Content-type': 'application/json'
  });
  constructor(public _http:HttpClient) { 
    // this.UrlServices = `${environment.URLBACK}blaa/cantercol/App/PageServices.php`;
    this.UrlServices = `${environment.URLBACK}App/PageServices.php`;
    
  }
  saveFormContact(form:any){
    let sendUrl = this.UrlServices+'?option=2';
    return this._http.post(sendUrl, form,{headers:this.headers}).pipe(map(data=>{
      console.log(data);
      return data;
    }));
  }
  getDataPage(section:string){
    let formData = new FormData();
    formData.append("section", section);
    let sendUrl = this.UrlServices+'?option=1';
    return this._http.post(sendUrl, formData).pipe(map(data=>data));
  }
  initLoading() {
    $(document.body).append(
      '<div class="div-loading"><img src="assets/images/LogoSINsubtitulo.png" class="img-loading animate-flicker"></div>'
    );
    $(document.body).css("overflow","hidden");
  }
  endLoading() {
    $('.div-loading').remove();
    $(document.body).removeAttr("style");
  }

}
