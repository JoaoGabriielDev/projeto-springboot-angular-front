import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../servico/cliente.service';
import { Cliente } from '../modelo/Cliente';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {

  btnCadastro:boolean = true;

  clientes:Cliente[] = [];

  constructor(private servico:ClienteService){}

  selecionar():void{
    this.servico.selecionar()
    .subscribe(retorno => this.clientes = retorno);
  }

  ngOnInit(){
    this.selecionar();
  }

}
