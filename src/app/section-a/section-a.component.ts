import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { ActivatedRoute, Router, } from '@angular/router';

@Component({
  selector: 'app-section-a',
  templateUrl: './section-a.component.html',
  styleUrls: ['./section-a.component.css']
})
export class SectionAComponent implements OnInit {

  Form1:FormGroup;
  fontStyleControl = new FormControl()

  f1 = [];

  constructor(private httpClient:HttpClient,private router:Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
      this.Form1 = new FormGroup({
        'id':new FormControl(null),
        'nameandAddress': new FormControl(null),
        'regdNo':new FormControl(null),
        'patientname': new FormControl(null),
        'age': new FormControl(null),
        'childrenGroup':new FormGroup({
          'noOfChildren':new FormControl(null),
          'livingSons':new FormControl(null),
          'livingDaughters': new FormControl(null),
        }),
        'otherName':new FormControl(null),
        'postalAddress':new FormControl(null),
        'referral':new FormGroup({
          'referredBy':new FormControl(null),
          'selfReferral':new FormControl(null),
        }),
        'lastDate':new FormControl(null),
      })
  }

  onClickReset(){
    this.Form1.reset();
  }



  onAdd(){

    if (this.Form1.valid){
      confirm("Submitted Successfully!");
      console.log(this.Form1.value);
      this.httpClient.post('https://reactive-forms-557b9-default-rtdb.firebaseio.com/sectionA.json',
      this.Form1.value).subscribe((response) => console.log(response));
      this.router.navigate(["../", 'sectionB'],{relativeTo:this.activatedRoute})
    }
    else{
     confirm("Please enter the required fields!");
     console.log(this.Form1.value);
    }
  }

}
