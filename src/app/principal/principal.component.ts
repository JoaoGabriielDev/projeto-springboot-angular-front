import { Cliente } from './../modelo/Cliente';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../servico/cliente.service';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {

  cliente = new Cliente();

  btnCadastro:boolean = true;

  clientes:Cliente[] = [];

  constructor(private servico:ClienteService){}

  selecionar():void{
    this.servico.selecionar()
    .subscribe(retorno => this.clientes = retorno);
  }

  cadastrar():void{
    this.servico.cadastrar(this.cliente)
    .subscribe(retorno => {

      this.clientes.push(retorno);

      this.cliente = new Cliente();

      alert('Cliente cadastrado com sucesso!');
    });
  }

  ngOnInit(){
    this.selecionar();
  }

}
