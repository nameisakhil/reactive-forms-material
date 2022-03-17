import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import {FormGroup,FormControl,FormBuilder, FormArray} from '@angular/forms'
import {Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SuccessMsgComponent } from '../success-msg/success-msg.component';
import { MatDialog } from '@angular/material/dialog';
import { FailureMsgComponent } from '../failure-msg/failure-msg.component';

import {jsPDF} from 'jspdf'
@Component({
  selector: 'app-section-b',
  templateUrl: './section-b.component.html',
  styleUrls: ['./section-b.component.css']
})
export class SectionBComponent implements OnInit {
  @ViewChild("pdfContent",{static:false}) el!: ElementRef
  form2:FormGroup;
  fontStyleControl = new FormControl();

  checkboxList = [
      'To diagnose intra-uterine and or ectopic pregnancy and confirm viability',
        'Estimation of gestational age (dating)',
        'Vaginal bleeding OR leaking',
        'Suspected pregnancy with IUCD in-situ or suspected pregnancy following contraceptive failure OR MTP failure',
        'Follow-up of cases of abortion',
        'Assessment of cervical canal and diameter of internal os',
        'Discrepancy between uterine size and period of amenorrhea',
        'Any suspected adenexal or uterine pathology OR abnormality',
        'Detection of chromosomal abnormalities, fetal structural defects and other abnormalities and their follow-up',
        'To evaluate fetal presentation and position',
        'Assessment of liquor amnii',
        'Preterm labor OR preterm premature rupture of membranes',
        'Evaluation of placental position, thickness, grading and abnormalities (placenta praevia, retro placental haemorrhage, abnormal adherence etc',
        'Evaluation of umbilical cord presentation, insertion, nuchal encirclement, number of vessels and presence of true knot',
        'Evaluation of previous Caesarean Section scars',
        'Evaluation of fetal growth parameters, fetal weight and fetal well being',
        'Color flow mapping and duplex Doppler studies',
        'Ultrasound guided procedures such as medical termination of pregnancy, external cephalic version etc and their follow-up',
        'Adjunct to diagnostic and therapeutic invasive interventions such as chorionic villus sampling (CVS),amniocenteses, feel blood sampling, fetal skin biopsy, amnio-infusion, intrauterine infusion, placement of shunts etc',
        'Observation of intra-partum events',
        'Medical or surgical conditions complicating pregnancy',
        'Research OR scientific studies in recognized institutions',
  ];
  activeCheckList=[];

  constructor(private fb:FormBuilder, private dialog:MatDialog,private http:HttpClient, private router: Router, private activatedRoute:ActivatedRoute) { }
  arrayBool:boolean= false
  ultraBool:boolean = false
  ngOnInit(): void {
    /*
    this.form2 = new FormGroup({
      'docter_name': new FormControl(null),
      'indications':new FormControl(null),
    })*/


    this.form2 = new FormGroup({
      'docter_name': new FormControl(null,Validators.required),
      'indications':new FormControl(null),
      'checkBoxs':new FormGroup({
        'To diagnose intra-uterine and or ectopic pregnancy and confirm viability':new FormControl(false),
        'Estimation of gestational age (dating)':new FormControl(false),
        'Vaginal bleeding OR leaking':new FormControl(false),
        'Suspected pregnancy with IUCD in-situ or suspected pregnancy following contraceptive failure OR MTP failure':new FormControl(false),
        'Follow-up of cases of abortion':new FormControl(false),
        'Assessment of cervical canal and diameter of internal os':new FormControl(false),
        'Discrepancy between uterine size and period of amenorrhea':new FormControl(false),
        'Any suspected adenexal or uterine pathology OR abnormality':new FormControl(false),
        'Detection of chromosomal abnormalities, fetal structural defects and other abnormalities and their follow-up':new FormControl(false),
        'To evaluate fetal presentation and position':new FormControl(false),
        'Assessment of liquor amnii':new FormControl(false),
        'Preterm labor OR preterm premature rupture of membranes':new FormControl(false),
        'Evaluation of placental position, thickness, grading and abnormalities (placenta praevia, retro placental haemorrhage, abnormal adherence etc':new FormControl(false),
        'Evaluation of umbilical cord presentation, insertion, nuchal encirclement, number of vessels and presence of true knot':new FormControl(false),
        'Evaluation of previous Caesarean Section scars':new FormControl(false),
        'Evaluation of fetal growth parameters, fetal weight and fetal well being':new FormControl(false),
        'Color flow mapping and duplex Doppler studies':new FormControl(false),
        'Ultrasound guided procedures such as medical termination of pregnancy, external cephalic version etc and their follow-up':new FormControl(false),
        'Adjunct to diagnostic and therapeutic invasive interventions such as chorionic villus sampling (CVS),amniocenteses, feel blood sampling, fetal skin biopsy, amnio-infusion, intrauterine infusion, placement of shunts etc':new FormControl(false),
        'Observation of intra-partum events':new FormControl(false),
        'Medical or surgical conditions complicating pregnancy':new FormControl(false),
        'Research OR scientific studies in recognized institutions':new FormControl(false),
      }),
      'procedure':new FormControl(null),
      'otherProcedure':new FormArray([]),
      'dateOfDeclaration':new FormControl(null),
      'dateOfProcedure':new FormControl(null),
      'resultOfProcedure':new FormControl(null),
      'resultConveyedTo':new FormControl(null),
      'resultConveyedOn':new FormControl(null),
      'indication':new FormControl(null),
      'date':new FormControl(null),
      'place': new FormControl(null)
    })
  }


  onAdd(){
    if (this.form2.valid){
      const dialogRef = this.dialog.open(SuccessMsgComponent);

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
      // const latsetId = localStorage.getItem('id');
      // const stringifiedValue = JSON.stringify(this.form2.value)
      console.log(this.form2.value);

      this.http.post("https://reactiveformsfirebaseproject-default-rtdb.asia-southeast1.firebasedatabase.app/sectionB.json", this.form2.value).subscribe(response => {
        console.log(response)
        this.form2.reset()
        this.router.navigate(["../", 'sectionC'],{relativeTo:this.activatedRoute})

      })

    }
    else{
      const dialogRef = this.dialog.open(FailureMsgComponent);

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
  }

  onClickultrasound(){
    (<FormArray>this.form2.get('otherProcedure')).removeAt(0)
    this.ultraBool = true
    this.arrayBool = false
  }

  onClickBtn(){
    const control = new FormControl(null);
    if (this.form2.get('otherProcedure').value.length < 1){
      (<FormArray>this.form2.get('otherProcedure')).push(control);
      this.arrayBool = this.form2.get("otherProcedure").value.length === 1
      this.ultraBool = false
    }

  }

  getControls() {
    return (<FormArray>this.form2.get('otherProcedure')).controls;
  }

  onClickReset(){
    this.form2.reset();
  }

  generatePDFSectionB(){
    if (this.form2.valid){
      let pdf = new jsPDF('p','pt','a4')

      pdf.html(this.el.nativeElement,{
        callback: (pdf) =>{
          pdf.save("sectionB.pdf")
        },
        margin:20
      })
    }
    else{
      const dialogRef = this.dialog.open(FailureMsgComponent);

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
     console.log(this.form2.value);
    }

  }

}
