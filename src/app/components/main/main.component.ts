import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PageService } from 'src/app/providers/page.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as L from 'leaflet';

declare var $: any;
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit, AfterViewInit {

  constructor(private _PS: PageService) { }
  ListProcess: any;
  Listproducts: any;
  FormContact:FormGroup;
  FormSend:boolean;
  errorForm:boolean;
  private map;

  private initMap(): void {
    this.map = L.map('map', {
      center: [4.81952143851878, -73.63776076547092],
      zoom: 9
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    const icon = L.divIcon({
      className: 'custom-div-icon',
            html: "<div class='div-marker-map'><i class='fas fa-map-marker-alt'></i><p class='text-marker'>Cantercol Bogota</p></div>",
            iconSize: [60, 42],
            iconAnchor: [30, 42]
        });
        const icon2 = L.divIcon({
          className: 'custom-div-icon',
                html: "<div class='div-marker-map'><i class='fas fa-map-marker-alt'></i><p class='text-marker'>Planta Cantercol</p></div>",
                iconSize: [60, 42],
                iconAnchor: [30, 42]
            });
    //     var popup = L.popup()
    // .setLatLng([4.710079031962609, -74.05634181797333])
    // .setContent('<p>Hello world!<br />This is a nice popup.</p>')
    // .openOn(this.map);
    
    L.marker([5.0024255,-73.4162619],{icon: icon2}).addTo(this.map);
    L.marker([4.683018081431796, -74.04724139751542],{icon: icon}).addTo(this.map);
    tiles.addTo(this.map);
  }
  ngOnInit(): void {
    this._PS.initLoading();
    this._PS.getDataPage('process').subscribe(data => {
      this.ListProcess = data;
      this._PS.getDataPage('products').subscribe(data => {
        this.Listproducts = data;
        this._PS.endLoading();
        setTimeout(() => {
          $('.slider-products').slick({
            dots: true,
            prevArrow: false,
            nextArrow: false,
            slidesToShow: 5,
            slidesToScroll: 5,
            appendDots: $('.slick-slider-dots'),
            responsive: [
              {
                breakpoint: 800,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                  infinite: true,
                  dots: true
                }
              }
             
            ]
          });
        }, 1000)

      });
    });

    $(document).ready(function () {
      $('.slider-home').slick({
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              dots: false
            }
          }
         
        ]
      });
      $(".nav-link").click(function(e) {
        e.preventDefault();
        var aid = $(this).attr("href");
        $('html,body').animate({scrollTop: $(aid).offset().top-200});
    });


    });

    this.FormContact = new FormGroup({
      'names': new FormControl('',[Validators.required]),
      'email': new FormControl('',[Validators.required]),
      'phone': new FormControl('',[Validators.required]),
      'product': new FormControl('',[Validators.required]),
      'message': new FormControl('',[Validators.required])
    });

  }
  ngAfterViewInit(): void {
    this.initMap();
  }
  showProduct(id) {
    $(".icon-show-product").removeClass("fa-minus");
    $(".icon-show-product").addClass("fa-plus");
    $(".img-product").removeClass("active");
    if ($("#product-" + id).hasClass("active")) {
      $(".div-product").removeClass("active");


    } else {
      $(".div-product").removeClass("active");
      $("#product-" + id).addClass("active");
      $("#product-" + id + " .img-product").addClass("active");
      $("#icon-product-" + id).removeClass("fa-plus");
      $("#icon-product-" + id).addClass("fa-minus");
    }


  }
  saveForm(){
    
    if(this.FormContact.status=="VALID"){
      this._PS.initLoading();
      this._PS.saveFormContact(this.FormContact.value).subscribe(data=>{
        if(data[0]["status"]=="create"){
          this._PS.endLoading();
            this.FormSend=true;
        }
      });
    }else{
      
      this.errorForm=true;
    }
   
  }
}
