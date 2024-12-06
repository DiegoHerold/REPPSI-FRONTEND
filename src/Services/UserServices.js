import {  Navigate  } from 'react-router-dom';

export default class UserServices {
    constructor () {
      this.baseURL = 'http://localhost:5000';  // A URL base para suas rotas da API
    }
    // Método de login
    async login(dados) {
        try {
  
            console.log(JSON.stringify(dados));
          const response = await fetch(`${this.baseURL}/entrar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: dados
          });
    
          if (!response.ok) {
            const errorData = await response.json();
            console.error('Erro no login:', errorData);
            return false;
          }
    
          const data = await response.json();
          localStorage.setItem("token", data.token);
          return true;
    
        } catch (error) {
          console.error('Erro ao fazer login:', error);
          return false;
        }
      }
  
    // Método de cadastro
    async cadastrar(dados) {
      try {
        const response = await fetch(`${this.baseURL}/cadastrar`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dados), // Envia os dados de cadastro (ex: nome, email, senha)
        });
  
        return await response.json();  // Retorna a resposta do backend
      } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        return null;
      }
    }
  
    // Verifica se o usuário está autenticado pelo token no localStorage
    usuarioAutenticado() {
      return localStorage.getItem("token") !== undefined && localStorage.getItem("token") !== null;
    }
  
    // Método de logout
    async logout() {
      try {
        
        // Limpa os dados do usuário do localStorage
        localStorage.removeItem("authToken");
        localStorage.removeItem("nome");
        localStorage.removeItem("email");
        localStorage.removeItem("role");
        console.log("revomendo token do localstorage");
        return true;
      } catch (error) {
        console.error('Erro ao fazer logout:', error);
        return false;
      }
    }
  }
  