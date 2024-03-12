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

  tabela:boolean = true;

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

  editar():void{
    this.servico.editar(this.cliente)
    .subscribe(retorno => {

      let posicao = this.clientes.findIndex(obj => {
        return obj.id == retorno.id;
      });

      this.clientes[posicao] = retorno;

      this.cliente = new Cliente;

      this.btnCadastro = true;

      this.tabela = true;

      alert('Cliente alterado com sucesso!')

    });
  }

  remover():void{
    this.servico.remover(this.cliente.id)
    .subscribe(retorno => {

      let posicao = this.clientes.findIndex(obj => {
        return obj.id == this.cliente.id;
      });

      this.clientes.splice(posicao, 1);

      this.cliente = new Cliente;

      this.btnCadastro = true;

      this.tabela = true;

      alert('Cliente removido com sucesso!')

    });
  }

  cancelar():void{

    this.cliente = new Cliente;

    this.btnCadastro = true;

    this.tabela = true;
  }

  selecionarCliente(posicao:number):void{

    this.cliente = this.clientes[posicao];

    this.btnCadastro = false;

    this.tabela = false;
  }

  ngOnInit(){
    this.selecionar();
  }

}
