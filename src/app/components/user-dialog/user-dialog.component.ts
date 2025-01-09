import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-dialog',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.scss'
})
export class UserDialogComponent {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userForm = this.fb.group({
      id: [data?.id || null], // ID só será usado em edição
      name: [data?.name || ''],
      cpf: [data?.cpf || ''],
      income: [data?.income || ''],
      birthDate: [data?.birthDate || ''],
      children: [data?.children || 0]
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.value); // Fecha o modal e retorna os dados
    }
  }

  onClose(): void {
    this.dialogRef.close(); // Fecha o modal sem fazer nada
  }
}


