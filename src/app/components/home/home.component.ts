import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { ClientServiceService } from '../../services/client-service.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  users: any[] = [];

  constructor(public dialog: MatDialog,
    private clientService: ClientServiceService
  ) {}

  ngOnInit(): void {
   this.loadClients();
  }

  addPoup(): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '400px',
    });

  }

  loadClients() {
    this.clientService.findAll().subscribe({
      next: (response) =>{
        this.users = response.content; 
        console.log(response)
      }
    })
  }



  editUser(user: any): void{
    console.log('Usuário editado com ID:', user.name);
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '400px',
      data: user
    });
  }


  deleteUser(id: number): void {
    this.clientService.delete(id).subscribe({
      next: () => {
        console.log(`Usuário com ID ${id} removido com sucesso!`);
        this.loadClients(); 
      },
      error: (err) => {
        console.error(`Erro ao remover o usuário com ID ${id}:`, err);
      }
    });
    console.log('Usuário removido com ID:', id);
  }

}
