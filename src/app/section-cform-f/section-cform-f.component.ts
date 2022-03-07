import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-section-cform-f',
  templateUrl: './section-cform-f.component.html',
  styleUrls: ['./section-cform-f.component.css']
})
export class SectionCFormFComponent implements OnInit {

  sectionC:FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.sectionC = new FormGroup({
      'doctorName': new FormControl(null),
      'geneticHistory':new FormControl(null),
      'diagnosisProcedureIndications': new FormGroup({
        'previousChild/ChildrenWith': new FormGroup({
          'chromosomalDisorders': new FormControl(null),
          'metabolicDisorders': new FormControl(null),
          'congenitalAnomaly': new FormControl(null),
          'mentalDisability': new FormControl(null),
          'Haemoglobinopathy': new FormControl(null),
          'sexLinkedDisorders': new FormControl(null),
          'singleGeneDisorder': new FormControl(null),
          'previousChild/ChildrenWithOthers':new FormGroup({
            'previousChild/ChildrenWithOthersDetail': new FormControl(null)
          })
        }),

        'advancedMaternalAge': new FormControl(null),
        'geneticDisease': new FormGroup({
          'mother': new FormControl(null),
          'father': new FormControl(null),
          'sibling': new FormControl(null)
        }),
        'preImplantationGenderDiagnosis': new FormControl(null),
        'diagnosisProcedureIndicationsOthers': new FormGroup({
          'diagnosisProcedureIndicationsOthersDetail': new FormControl(null)
        })

      }),
      'pregnantWomanConsentDate': new FormControl(null),
      'invasiveProcedures': new FormGroup({
        'amniocentesis': new FormControl(null),
        'chorionicVilliAspiration': new FormControl(null),
        'fetalBiopsy': new FormControl(null),
        'Cordocentesis': new FormControl(null),
        'invasiveProceduresOthers': new FormGroup({
          'invasiveProceduresOthersDetail': new FormControl(null)
        }),
      }),
      'invasiveProcedureComplications': new FormControl(null),
      'recommendedAditionalTests': new FormGroup({
        'chromosomalStudies': new FormControl(null),
        'biochemicalStudies':new FormControl(null),
        'molecularStudies':new FormControl(null),
        'preImplantationGenderDiagnosis': new FormControl(null),
        'recommendedAditionalTestsOthers': new FormGroup({
          'recommendedAditionalTestsOthersDetail': new FormControl(null)
        })

      })

    })
  }

  onSubmit(){
    if (this.sectionC.valid){
      confirm("Submitted Successfully!");
      console.log(this.sectionC.value);
    }
    else{
     confirm("Please enter the required fields!");
     console.log(this.sectionC.value);
    }
  }

}
