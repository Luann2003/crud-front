import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientServiceService } from '../../services/client-service.service';

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
    private clientService: ClientServiceService,
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
      const userData = this.userForm.value;

      if (userData.id) {
        this.clientService.update(userData.id, userData).subscribe({
          next: (response) => {
            console.log("Usuário atualizado com sucesso!", response);
            this.dialogRef.close(response);
            window.location.reload();
          },
          error: (err) => {
            console.error("Erro ao atualizar o usuário:", err);
          }
        });
      }
      else{
      this.clientService.insert(userData).subscribe({
        next: (response) =>{
          console.log("Usuario inserido com sucesso! " + userData)
          this.userForm.reset(); 
          window.location.reload();
        },
        error: (err) =>{
          console.log("Erro ao cadastrar " + err)
        }
      })
      this.dialogRef.close(this.userForm.value);
    }
    }
  }

  onClose(): void {
    this.dialogRef.close(); 
  }
}


