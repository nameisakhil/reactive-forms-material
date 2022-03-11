import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router,ActivatedRoute } from '@angular/router';
import { FailureMsgComponent } from '../failure-msg/failure-msg.component';
import { SuccessMsgComponent } from '../success-msg/success-msg.component';

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

  sectionC:FormGroup;
  fontStyleControl = new FormControl();

  allComplete: boolean = false
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

        'preImplantationGenderDiagnosis': new FormControl(null),
        'diagnosisProcedureIndicationsOthers': new FormControl(null),

        'diagnosisProcedureIndicationsOthersDetail': new FormControl(null)


      }),
      'pregnantWomanConsentDate': new FormControl(null),
      'invasiveProcedures': new FormGroup({
        'amniocentesis': new FormControl(null),
        'chorionicVilliAspiration': new FormControl(null),
        'fetalBiopsy': new FormControl(null),
        'Cordocentesis': new FormControl(null),
        "invasiveProceduresOthers":new FormControl(null),
        'invasiveProceduresOthersDetail': new FormControl(null)

      }),
      'invasiveProcedureComplications': new FormControl(null),
      'recommendedAditionalTests': new FormGroup({
        'chromosomalStudies': new FormControl(null),
        'biochemicalStudies':new FormControl(null),
        'molecularStudies':new FormControl(null),
        'preImplantationGenderDiagnosis': new FormControl(null),
        'recommendedAditionalTestsOthers': new FormControl(null),
        'recommendedAditionalTestsOthersDetail': new FormControl(null)


      }),
      'resultsOfTheProcedures': new FormControl(null),
      'proceduresCariedoutDate': new FormControl(null),
      'preNatalCOnveyedTo': new FormControl(null),
      'preNatalCOnveyedOn': new FormControl(null),
      'MTPIndiaction': new FormControl(null),
      'dateFIlled': new FormControl(null),
      'place':new FormControl(null)

    })


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


}
