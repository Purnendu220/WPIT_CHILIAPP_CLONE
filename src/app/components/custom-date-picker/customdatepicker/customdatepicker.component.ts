import { Output, EventEmitter } from '@angular/core';
import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-customdatepicker',
  templateUrl: './customdatepicker.component.html',
  styleUrls: ['./customdatepicker.component.scss']
})
export class CustomdatepickerComponent implements OnInit {
  @Input() datetimestamp:any;
  @Output() public userdob=new EventEmitter();

  public mm: string;
  months = [{ val: '0', name: 'Month'},{ val: '1', name: 'Jan' }, { val: '2', name: 'Feb' }, { val: '3', name: 'Mar' }, { val: '4', name: 'Apr' }, { val: '5', name: 'May' }, { val: '6', name: 'Jun' },
  { val: '7', name: 'Jul' }, { val: '8', name: 'Aug' }, { val: '9', name: 'Sep' }, { val: '10', name: 'Oct' }, { val: '11', name: 'Nov' }, { val: '12', name: 'Dec' }
  ];
  public years: any[] = ["Year"];
  public yy: any;

  public days: any[] = ["Date"];
  public dd: any;
  public day:any;
  public month:string;
  public year:any;
  public errorMessage:string;

  ngOnInit() {
    this.setDateInPicker();
    this.hideError();
  }
  setDateInPicker(){
    if(!this.datetimestamp||this.datetimestamp=="0000000000"){
      this.day="Date"
      this.month="Month";
      this.year="Year"
     }else{
      var dateobj=new Date(this.datetimestamp)
      this.day=dateobj.getDate()
      this.month=(dateobj.getMonth()+2).toString();
      this.year=dateobj.getFullYear()
     }
     
     this.getYear();
     this.getMonth();
     this.getDay();
  }

  getMonth() {
   if(this.month){
    this.mm = this.month;
   }else{
    var today = new Date();
    this.mm ='' +(today.getMonth() + 1);
    
   }
  sessionStorage.setItem("month",this.mm); 
  
}
  getYear() {
    this.years=[];
    this.years.push("Year");

    var today = new Date();
    if(this.year){
     this.yy= this.year;
    }else{
    this.yy = today.getFullYear();
  }
    for (var i = (today.getFullYear() - 50); i <= today.getFullYear(); i++) {
      this.years.push(i);
    }
    
    sessionStorage.setItem("year",''+this.yy);
  }
  getDay() {
    var today = new Date();
    if(this.day){
     this.dd= this.day;

    }else{
    this.dd = today.getDate();}
    if(this.dd=="Date"){
         }else{
    this.selectedmonthval(this.months[+this.mm-1].name);

    }
    
     sessionStorage.setItem("day",''+this.dd);
  }

  selectedmonthval(value) {
    var today = new Date();
    this.mm = this.getmonthvalue(value);
    if (value == "Feb" && this.yy % 4 == 0) {
      this.setyearvalue(29);}
    else if (value == "Feb" && this.yy % 4 != 0) {
      this.setyearvalue(28);

    } else if (value == "Jan" || value == "Mar" || value == "May" || value == "Jul" || value == "Aug" || value == "Oct" || value == "Dec") {
      this.setyearvalue(31);


    }
    else if (value == "Apr" || value == "Jun" || value == "Sep" || value == "Nov") {
      this.setyearvalue(30);

    }
    else if(value == "Month"){
    this.days = [];
    this.days.push("Date");
    }
    if (this.yy == today.getFullYear() && Number(this.mm) >= (today.getMonth() + 1) && this.dd!="Date" && +this.dd>today.getDate()) {
      this.getYear();
      this.getMonth();
      this.days = [];
      this.days.push("Date");       
     this.showError("You selected invalid dob");
    }
 this.savedatelocally();

  }

  selectedyearval(value) {
    var today = new Date();
    this.yy = value;
    if (value % 4 == 0 && this.mm == "2") {
      this.setyearvalue(29);
    }
    else if (value % 4 != 0 && this.mm == "2") {
      this.setyearvalue(28);

    }

    if (this.yy == today.getFullYear() && Number(this.mm) >= (today.getMonth() + 1) && this.dd!="Date" && +this.dd>today.getDate()) {
      this.getYear();
      this.getMonth();
      this.days = [];
      this.days.push("Date");    
      this.showError("You selected invalid dob");

  }

    if (this.yy < today.getFullYear()) {
      if (this.yy % 4 == 0 && this.mm == "2") {
        this.setyearvalue(29);
      }
      else if (this.yy % 4 != 0 && this.mm == "2") {
        this.setyearvalue(28);

      } else if (this.mm == "1" || this.mm == "3" || this.mm == "5" || this.mm == "7" || this.mm == "8" || this.mm == "10" || this.mm == "12") {
        this.setyearvalue(31);
      }
      else if (this.mm == "4" || this.mm == "6" || this.mm == "9" || this.mm == "11") {
        this.setyearvalue(30);

      }
    }
this.savedatelocally();
  }
  selecteddayval(value) {
    var today = new Date();
    this.dd = value;
    this.savedatelocally();

}

  getmonthvalue(value) {
    for (var i = 0; i <= this.months.length; i++) {
      var month = this.months[i];
      if (month.name == value) {
        return month.val;
      }

    }
  }

  setyearvalue(value) {
    let date=new Date();
    if(this.yy==date.getFullYear()&& +this.mm==date.getMonth()+1){
      value=date.getDate();
    }
    this.days = [];
    this.days.push("Date");
    for (var i = 1; i <= value; i++) {
      this.days.push(i);
    }
  }
  savedatelocally(){
    
      sessionStorage.setItem("day",''+this.dd);
      sessionStorage.setItem("month",''+this.mm);
      sessionStorage.setItem("year",''+this.yy);
      if(!(this.dd=="Date"||this.mm=="Month"||this.mm=="0"||this.yy=="Year")){
      this.userdob.next(this.yy+'-'+this.mm+'-'+this.dd);  }
      
    }
 showError(message: string) {
   this.setDateInPicker();
    this.errorMessage = message;
    document.getElementById('errorMessageContainer').style.opacity = "1.0";
    setTimeout(() => {
      this.hideError();
    }, 3000);
  }

  hideError() {
    document.getElementById('errorMessageContainer').style.opacity = "0.0";
    this.errorMessage = '';
  }
}
