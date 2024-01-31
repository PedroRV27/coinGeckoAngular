import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getFirestore,getDocs,collection,onSnapshot } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { Firestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price:number;
  price_change_percentage_24h:number;
  total_volume:number;
}

@Injectable({
  providedIn: 'root'
})
export class CoingeckoService {
  coins$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  coinId: any;
  coinDetails: any;
  constructor(public http:HttpClient){

  }
  peticionAJAX() {
    this.http.get<any[]>(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=50&page=1&sparkline=true&locale=en"
    ).subscribe(
      (data: any[]) => {
        console.log('Respuesta de la API:', data);
        this.coins$.next(data);
      },
      (error) => {
        console.error('Error al realizar la petición:', error);
      }
    );
  }

  getCoinDetails() {
    if (this.coinId) {
      const url = `https://api.coingecko.com/api/v3/coins/${this.coinId}`;
      this.http.get(url).subscribe((data: any) => {
        this.coinDetails = data; 
        console.log(data);
      });
    }
  }

    obtenerDetalles(array:any){
    let resultados:any = [];
    
    for(let i = 0;i < array.length;i++){
      this.http.get("https://api.coingecko.com/api/v3/coins/"+array[i].id).subscribe( (data:any)=>{
        resultados.push(data)
      })
      
    }
    return resultados;

  }

    

  }
