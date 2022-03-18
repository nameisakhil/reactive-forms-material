import { HttpClient } from '@angular/common/http';
import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FailureMsgComponent } from '../failure-msg/failure-msg.component';
import { SuccessMsgComponent } from '../success-msg/success-msg.component';

import {jsPDF} from 'jspdf'

interface gender {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-section-dform-f',
  templateUrl: './section-dform-f.component.html',
  styleUrls: ['./section-dform-f.component.css']
})
export class SectionDformFComponent implements OnInit {
  @ViewChild("pdfContent",{static:false}) el!: ElementRef
  genders: gender[] = [
    {value: 'male', viewValue: 'Male'},
    {value: 'female', viewValue: 'Female'},
    {value: 'others', viewValue: 'Others'},
  ];

  fontStyleControl = new FormControl();

  sectionD: FormGroup;
  constructor(private httpClient:HttpClient,private dialog:MatDialog,private router:Router,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.sectionD = new FormGroup({
      'name':new FormControl(null),
      'diagnosis':new FormControl(null),
      'dateOfDeclaretion': new FormControl(null),
      'nameOfIdentification':new FormControl(null),
      'age': new FormControl(null),
      'gender': new FormControl(null),
      'relationship': new FormControl(null),
      'address':new  FormControl(null),
      'contactNumber':new FormControl(null,Validators.compose([Validators.minLength(10),
      Validators.maxLength(10),Validators.required])),
      'dateOfAttestation': new FormControl(null),
      'dateOfConductingTest': new FormControl(null),
      'nameOfPersonConductingTest': new FormControl(null),
      'nameOfPersonReciveingTest': new FormControl(null)
    })
  }



  onSubmit(){
    if (this.sectionD.valid){
      // Adding success dialog content in each component
      const dialogRef = this.dialog.open(SuccessMsgComponent);

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
      console.log(this.sectionD.value);
      this.httpClient.post('https://reactiveformsfirebaseproject-default-rtdb.asia-southeast1.firebasedatabase.app/sectionD.json',
      this.sectionD.value).subscribe((response) => console.log(response));

      this.sectionD.reset();
     }
    else{
      // Adding failure dialog content in each component
      const dialogRef = this.dialog.open(FailureMsgComponent);

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
     console.log(this.sectionD.value);
    }
  }

  onClickReset(){
    this.sectionD.reset();
  }

  generatePDFSectionD(){
    if (this.sectionD.valid){
      let pdf = new jsPDF('p','pt','a4')
      // let pageCount = pdf.internal.getNumberOfPages();

      pdf.html(this.el.nativeElement,{
        callback: (pdf) =>{
          pdf.deletePage(2);
          pdf.save("sectionD.pdf")
        },
        margin:20
      })
    }
    else{
      const dialogRef = this.dialog.open(FailureMsgComponent);

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
     console.log(this.sectionD.value);
    }

  }


}
