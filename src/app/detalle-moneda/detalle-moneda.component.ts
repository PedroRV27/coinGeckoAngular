import { Component,Input,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CoingeckoService } from '../coingecko.service';


@Component({
  selector: 'app-detalle-moneda',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './detalle-moneda.component.html',
  styleUrl: './detalle-moneda.component.css'
})
export class DetalleMonedaComponent implements OnInit {
  @Input() coinId: any;
  coinDetails: any;

  constructor(private http: HttpClient,private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.coinId = params.get('id');
      this.getCoinDetails(); 
    });
  }

  
  getCoinDetails() {
    if (this.coinId) {
      const url = `https://api.coingecko.com/api/v3/coins/${this.coinId}`;
      this.http.get(url).subscribe((data: any) => {
        this.coinDetails = data; 
      });
    }
  }

  cleanHomepageLink(link: string): string {
    return typeof link === 'string' ? link.replace(/,+$/, '') : link || '';
  }
}
