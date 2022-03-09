import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,FormBuilder, FormArray} from '@angular/forms'
import {Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-section-b',
  templateUrl: './section-b.component.html',
  styleUrls: ['./section-b.component.css']
})
export class SectionBComponent implements OnInit {

  form2:FormGroup;

  checkboxList = [
    'To diagnose intra-uterine and/or ectopic pregnancy and confirm viability',
    'Estimation of gestational age (dating).',
    'Vaginal bleeding/leaking',
    'Suspected pregnancy with IUCD in-situ or suspected pregnancy following contraceptive failure/MTP failure.',
    'Follow-up of cases of abortion',
    'Assessment of cervical canal and diameter of internal os.',
    'Discrepancy between uterine size and period of amenorrhea.',
    'Any suspected adenexal or uterine pathology/abnormality.',
    'Detection of chromosomal abnormalities, fetal structural defects and other abnormalities and their follow-up.',
    'To evaluate fetal presentation and position.',
    'Assessment of liquor amnii.',
    'Preterm labor/preterm premature rupture of membranes.',
    'Evaluation of placental position, thickness, grading and abnormalities (placenta praevia, retro placental haemorrhage, abnormal adherence etc.',
    'Evaluation of umbilical cord – presentation, insertion, nuchal encirclement, number of vessels and presence of true knot.',
    'Evaluation of previous Caesarean Section scars.',
    'Evaluation of fetal growth parameters, fetal weight and fetal well being.',
    'Color flow mapping and duplex Doppler studies.',
    'Ultrasound guided procedures such as medical termination of pregnancy, external cephalic version etc.and their follow-up.',
    'Adjunct to diagnostic and therapeutic invasive interventions such as chorionic villus sampling (CVS),amniocenteses, feel blood sampling, fetal skin biopsy, amnio-infusion, intrauterine infusion, placement of shunts etc.',    'Observation of intra-partum events.',
    'Medical/surgical conditions complicating pregnancy.',
    'Research/scientific studies in recognized institutions.',
  ];
  activeCheckList=[];

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    /*
    this.form2 = new FormGroup({
      'docter_name': new FormControl(null),
      'indications':new FormControl(null),
    })*/


    this.form2 = this.fb.group({
      'docter_name': new FormControl(null,Validators.required),
      'indications':new FormControl(null),
      'checkBoxs':this.fb.group({
        'To diagnose intra-uterine and/or ectopic pregnancy and confirm viability':false,
        'Estimation of gestational age (dating).':false,
        'Vaginal bleeding/leaking':false,
        'Suspected pregnancy with IUCD in-situ or suspected pregnancy following contraceptive failure/MTP failure.':false,
        'Follow-up of cases of abortion':false,
        'Assessment of cervical canal and diameter of internal os.':false,
        'Discrepancy between uterine size and period of amenorrhea.':false,
        'Any suspected adenexal or uterine pathology/abnormality.':false,
        'Detection of chromosomal abnormalities, fetal structural defects and other abnormalities and their follow-up.':false,
        'To evaluate fetal presentation and position.':false,
        'Assessment of liquor amnii.':false,
        'Preterm labor/preterm premature rupture of membranes.':false,
        'Evaluation of placental position, thickness, grading and abnormalities (placenta praevia, retro placental haemorrhage, abnormal adherence etc.':false,
        'Evaluation of umbilical cord – presentation, insertion, nuchal encirclement, number of vessels and presence of true knot.':false,
        'Evaluation of previous Caesarean Section scars.':false,
        'Evaluation of fetal growth parameters, fetal weight and fetal well being.':false,
        'Color flow mapping and duplex Doppler studies.':false,
        'Ultrasound guided procedures such as medical termination of pregnancy, external cephalic version etc.and their follow-up.':false,
        'Adjunct to diagnostic and therapeutic invasive interventions such as chorionic villus sampling (CVS),amniocenteses, feel blood sampling, fetal skin biopsy, amnio-infusion, intrauterine infusion, placement of shunts etc.':false,
        'Observation of intra-partum events.':false,
        'Medical/surgical conditions complicating pregnancy.':false,
        'Research/scientific studies in recognized institutions.':false,
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
      confirm("Submitted Successfully!");
      //console.log(this.form2.value);
      const latsetId = localStorage.getItem('id');
      console.log(this.form2.value);
      }
    else{
      confirm("Please enter the required fields!");
    }
  }

  onClickultrasound(){
    (<FormArray>this.form2.get('otherProcedure')).removeAt(0)
  }

  onClickBtn(){
    const control = new FormControl(null);
    (<FormArray>this.form2.get('otherProcedure')).push(control);
  }

  getControls() {
    return (<FormArray>this.form2.get('otherProcedure')).controls;
  }

  onClickReset(){
    this.form2.reset();
  }

  onclickCheckBox(event:any){
    console.log(event.checkbox)
    const value = event.checkbox;
   const index = this.activeCheckList.indexOf(value);
   console.log(index)
    if (this.activeCheckList.includes(value)){
      this.activeCheckList.splice(index,1);
    }else{
      this.activeCheckList.push(value)
    }
    console.log(this.activeCheckList)
  }
}
