/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
declare namespace App {
 
  interface Locals {
    id: string;
    nome: string;
    email: string;
    isAuthenticated: boolean;
   
  }
}
