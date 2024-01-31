import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { CoingeckoService } from './coingecko.service';



export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),importProvidersFrom(HttpClientModule,CoingeckoService,
    provideStorage(() => getStorage()),
    provideFirebaseApp(() => initializeApp({"projectId":"coingecko-fb411","appId":"1:151240249516:web:0b29484aac6f47e99a4f09","storageBucket":"coingecko-fb411.appspot.com","apiKey":"AIzaSyBohTVxx3I191naV_5HAZvTboFOSgv2OqY","authDomain":"coingecko-fb411.firebaseapp.com","messagingSenderId":"151240249516","measurementId":"G-L9Y2RDLQPT"}))),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom(provideDatabase(() => getDatabase())) ,
    importProvidersFrom(provideStorage(() => getStorage())),
    
  ]
};


