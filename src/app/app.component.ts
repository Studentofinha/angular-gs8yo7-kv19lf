import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'nz-demo-form-dynamic-form-item',
  template: `
    <form nz-form [formGroup]="validateForm" (ngSubmit)="submitForm()">
    <nz-form-item>
          <nz-form-label>
            <span translate>Username</span>
          </nz-form-label>
          <nz-form-control>
            <input nz-input name="username" type="text" id="username" formControlName="username"
              placeholder="Enter Username" />
          </nz-form-control>
        </nz-form-item>

       <nz-form-item *ngFor="let control of listOfControl; let i = index">
          <nz-form-label *ngIf="i == 0" [nzFor]="control.controlInstance">
            <span translate>SBU(s)</span>
          </nz-form-label>
          <nz-form-control [nzXs]="24">
            <div nz-row nzGutter="8">
              <div nz-col nzSpan="11">
                <nz-select [formControlName]="project" name="projects" [attr.id]="control.id"
                  [nzPlaceHolder]="'Select project(s)'">
                  <nz-option *ngFor="let item of projects" [nzLabel]="item.description" [nzValue]="item.id">
                  </nz-option>
                </nz-select>
              </div>
              <div nz-col nzSpan="11">
                <nz-select formControlName="role" name="role" nzPlaceHolder="">
                  <nz-option *ngFor="let item of roles" [nzLabel]="item" [nzValue]="item"></nz-option>
                </nz-select>
              </div>
              <div nz-col nzSpan="2">
                <i nz-icon nzType="minus-circle-o" class="dynamic-delete-button"
                  (click)="removeField(control, $event)"></i>
              </div>
            </div>
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-control>
            <button nz-button nzType="dashed" class="add-button" (click)="addField($event)">
              <i nz-icon nzType="plus"></i>
              Add field
            </button>
          </nz-form-control>
        </nz-form-item>
      <nz-form-item>
        <nz-form-control [nzXs]="{ span: 24, offset: 0 }" [nzSm]="{ span: 20, offset: 4 }">
          <button nz-button nzType="primary">Submit</button>
        </nz-form-control>
      </nz-form-item>
    </form>
  `,

  styles: [
    `
      .dynamic-delete-button {
        cursor: pointer;
        position: relative;
        top: 4px;
        font-size: 24px;
        color: #999;
        transition: all 0.3s;
      }

      .dynamic-delete-button:hover {
        color: #777;
      }

      .passenger-input {
        width: 60%;
        margin-right: 8px;
      }

      [nz-form] {
        max-width: 600px;
      }

      .add-button {
        width: 60%;
      }
    `
  ]
})
export class NzDemoFormDynamicFormItemComponent implements OnInit {
  validateForm: FormGroup;
  listOfControl: Array<{ id: number; controlInstance: string }> = [];

  projects = [{
    "id": "1ueI",
    "description": "Project1"
  },{
    "id": "iqwu28",
    "description": "Project2"
  },{
    "id": "1938qwe",
    "description": "Project3"
  }];

  roles = ['ROLE_ADMIN', 'ROLE_USER'];

  addField(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
    const id = this.listOfControl.length > 0 ? this.listOfControl[this.listOfControl.length - 1].id + 1 : 0;

    const control = {
      id,
      controlInstance: `project${id}`
    };
    const index = this.listOfControl.push(control);
    console.log(this.listOfControl[this.listOfControl.length - 1]);
    this.validateForm.addControl(
      this.listOfControl[index - 1].controlInstance,
      new FormControl(null, Validators.required)
    );
  }

  removeField(i: { id: number; controlInstance: string }, e: MouseEvent): void {
    e.preventDefault();
    if (this.listOfControl.length > 1) {
      const index = this.listOfControl.indexOf(i);
      this.listOfControl.splice(index, 1);
      console.log(this.listOfControl);
      this.validateForm.removeControl(i.controlInstance);
    }
  }

  submitForm(): void {
    
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({});
    this.addField();
  }
}