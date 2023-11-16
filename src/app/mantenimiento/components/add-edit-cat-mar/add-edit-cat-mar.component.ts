import { Component,Input, OnInit } from '@angular/core';
import { ControlContainer,NgForm ,FormGroup, FormControl} from '@angular/forms';


@Component({
  selector: 'app-add-edit-cat-mar',
  templateUrl: './add-edit-cat-mar.component.html',
  styleUrls: ['./add-edit-cat-mar.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: NgForm,
    },
  ],
})
export class AddEditCatMarComponent implements OnInit{

  @Input() groupName='';
  @Input() title='';
  @Input() txtbtn='';
  @Input() placeholder='';
  @Input() control: FormControl = new FormControl(''); // Agregado para manejar el formControl
  @Input() control2: FormControl = new FormControl('');
  @Input() controlName = '';

  constructor() { }
  ngOnInit(): void {
      
  }
}
