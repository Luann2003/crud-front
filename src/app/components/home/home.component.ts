import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  users = [
    { id: 1, name: 'Luan', cpf: '00000000000', income: 2000, birthDate: '2003-05-06', children: 0 },
    { id: 2, name: 'Ana', cpf: '12345678901', income: 3500, birthDate: '1990-12-15', children: 2 },
    { id: 3, name: 'Carlos', cpf: '98765432100', income: 2800, birthDate: '1985-03-22', children: 1 },
  ];

  constructor(public dialog: MatDialog) {}

  addPoup(): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newUser = result;
        newUser.id = this.users.length + 1; // Gerar ID único
        this.users.push(newUser); // Adicionar o usuário à lista
      }
    });
  }

  editUser(user: any): void{
    console.log('Usuário editado com ID:', user.name);
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '400px',
      data: user
    });
  }


  deleteUser(id: number): void {
    this.users = this.users.filter(user => user.id !== id);
    console.log('Usuário removido com ID:', id);
  }

}
