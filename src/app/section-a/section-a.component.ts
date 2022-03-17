import { HttpClient } from '@angular/common/http';
import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { ActivatedRoute, Router, } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SuccessMsgComponent } from '../success-msg/success-msg.component';
import { FailureMsgComponent } from '../failure-msg/failure-msg.component';

import {jsPDF} from 'jspdf'

@Component({
  selector: 'app-section-a',
  templateUrl: './section-a.component.html',
  styleUrls: ['./section-a.component.css']
})
export class SectionAComponent implements OnInit {
  @ViewChild("pdfContent",{static:false}) el!: ElementRef
  Form1:FormGroup;
  fontStyleControl = new FormControl()

  f1 = [];

  constructor(private httpClient:HttpClient,private router:Router, private activatedRoute:ActivatedRoute,private dialog:MatDialog) { }

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
      const dialogRef = this.dialog.open(SuccessMsgComponent);
      // dailog box
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
      console.log(this.Form1.value);
      this.httpClient.post('https://reactiveformsfirebaseproject-default-rtdb.asia-southeast1.firebasedatabase.app/sectionA.json',
      this.Form1.value).subscribe((response) => console.log(response));
      this.router.navigate(["../", 'sectionB'],{relativeTo:this.activatedRoute})
    }
    else{
      const dialogRef = this.dialog.open(FailureMsgComponent);

        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });
    console.log(this.Form1.value);
    }
  }

  generatePDFSectionB(){
    if (this.Form1.valid){
      let pdf = new jsPDF('p','pt','a4')

      pdf.html(this.el.nativeElement,{
        callback: (pdf) =>{
          pdf.deletePage(2);
          pdf.save("sectionA.pdf")
        },
        margin:20
      })


    }
    else{
      const dialogRef = this.dialog.open(FailureMsgComponent);

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
     console.log(this.Form1.value);
    }
  }

}
