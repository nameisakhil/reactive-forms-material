import { HttpClient } from '@angular/common/http';
import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router,ActivatedRoute } from '@angular/router';
import { FailureMsgComponent } from '../failure-msg/failure-msg.component';
import { SuccessMsgComponent } from '../success-msg/success-msg.component';

import {jsPDF} from 'jspdf'


export interface Diagnosis{
  name: string,
  completed: boolean,
  diagnosisArray ?:Diagnosis[]

}

@Component({
  selector: 'app-section-cform-f',
  templateUrl: './section-cform-f.component.html',
  styleUrls: ['./section-cform-f.component.css']
})
export class SectionCFormFComponent implements OnInit {
  @ViewChild("pdfContent",{static:false}) el!: ElementRef

  sectionC:FormGroup;
  fontStyleControl = new FormControl();
  blankOneCondition:boolean = false;
  blankTwoCondition:boolean = false;
  allComplete: boolean = false;
  options = {
    pagesplit: true
  };
  constructor(private httpClient:HttpClient,private router:Router,private activatedRoute:ActivatedRoute,private dialog:MatDialog) { }

  ngOnInit(): void {
    this.sectionC = new FormGroup({
      'doctorName': new FormControl(null),
      'geneticDisease':new FormControl(null),
      'geneticHistory':new FormControl(null),
      'otherDiagnosis': new FormControl(null),
      'diagnosisProcedureIndications': new FormGroup({

        'chromosomalDisorders': new FormControl(null),
        'metabolicDisorders': new FormControl(null),
        'congenitalAnomaly': new FormControl(null),
        'mentalDisability': new FormControl(null),
        'Haemoglobinopathy': new FormControl(null),
        'sexLinkedDisorders': new FormControl(null),
        'singleGeneDisorder': new FormControl(null),
        'previousChildOrChildrenWithOthers': new FormControl(null),
        'previousChildOrChildrenWithOthersDetail': new FormControl(null),
        'advancedMaternalAge': new FormControl(null),

        'mother': new FormControl(null),
        'father': new FormControl(null),
        'sibling': new FormControl(null),
        'diagnosisProcedureIndicationsOthers': new FormControl(null),
        'diagnosisProcedureIndicationsOthersDetail': new FormControl(null)


      }),
      'pregnantWomanConsentDate': new FormControl(null),
      'invasiveProcedures': new FormGroup({
        'amniocentesis': new FormControl(false),
        'chorionicVilliAspiration': new FormControl(false),
        'fetalBiopsy': new FormControl(false),
        'Cordocentesis': new FormControl(false),
        "invasiveProceduresOthers":new FormControl(false),
        'invasiveProceduresOthersDetail': new FormControl(null)

      }),
      'invasiveProcedureComplications': new FormControl(null),
      'recommendedAditionalTests': new FormGroup({
        'chromosomalStudies': new FormControl(false),
        'biochemicalStudies':new FormControl(false),
        'molecularStudies':new FormControl(false),
        'preImplantationGenderDiagnosis': new FormControl(false),
        'recommendedAditionalTestsOthers': new FormControl(false),
        'recommendedAditionalTestsOthersDetail': new FormControl(null)


      }),
      'resultsOfTheProcedures': new FormControl(null),
      'proceduresCariedoutDate': new FormControl(null),
      'preNatalCOnveyedTo': new FormControl(""),
      'preNatalCOnveyedOn': new FormControl(""),
      'MTPIndiaction': new FormControl(null),
      'dateFIlled': new FormControl(null),
      'place':new FormControl(null)

    })
    // this.blankOneCondition = this.sectionC.value.preNatalCOnveyedTo.length >0
    // this.blankTwoCondition = this.sectionC.value.preNatalCOnveyedOn.length >0
    // console.log(this.blankOneCondition)

  }

  onSubmit(){
    if (this.sectionC.valid){
      const dialogRef = this.dialog.open(SuccessMsgComponent);

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
      console.log(this.sectionC.value);
      this.httpClient.post('https://reactiveformsfirebaseproject-default-rtdb.asia-southeast1.firebasedatabase.app/sectionC.json',
      this.sectionC.value).subscribe((response) => console.log(response));
      this.router.navigate(["../", 'sectionD'],{relativeTo:this.activatedRoute})
    }
    else{
      const dialogRef = this.dialog.open(FailureMsgComponent);

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
     console.log(this.sectionC.value);
    }
  }



  onClickReset(){
    this.sectionC.reset();
  }

  generatePDF(){
    if (this.sectionC.valid){
      let pdf = new jsPDF('p','pt','a4')

      pdf.html(this.el.nativeElement,{
        callback: (pdf) =>{
          pdf.save("sectionC.pdf")
        },
        margin:20
      })
    }
    else{
      const dialogRef = this.dialog.open(FailureMsgComponent);

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
     console.log(this.sectionC.value);
    }

  }

}
