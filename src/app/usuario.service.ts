import { Injectable,inject} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Auth,createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut , signInWithPopup, GoogleAuthProvider, GithubAuthProvider,onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { getAuth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { collection, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { query, where } from 'firebase/firestore';
import { getDocs } from '@angular/fire/firestore';
import { getFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private emailSource= new BehaviorSubject<string>('');
  currentEmail = this.emailSource.asObservable();
  firestore=inject(Firestore);
  public user:any = {};
  datosFS:any[]=[];

  constructor(private auth:Auth,private router:Router) { 

  }

  setEmail(email:string){
    this.emailSource.next(email);
  }

  public cerrarSesion(){
    signOut(this.auth)
    .then(() => {
      this.user = {};
      this.router.navigate(['/home']);
      console.log("Sesión cerrada")
    });
  }

  public loginGoogle(){
    signInWithPopup(this.auth, new GoogleAuthProvider())
    .then((response:any)=>{
      this.user = response.user;
      console.log(this.user.uid);
      this.router.navigate(['/cuerpo']);
    })
    .catch((error:any)=>{
      console.log(error);
    })
  }

  public loginGitHub(){
    signInWithPopup(this.auth, new GithubAuthProvider())
    .then((response:any)=>{
      this.user = response.user;
      console.log(this.user.uid);
      this.router.navigate(['/cuerpo']);
    })
    .catch((error:any)=>{
      console.log(error);
    })
  }

  estaUsuarioIniciadoSesion(): Promise<boolean> {
    const auth = getAuth();

    return new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        resolve(!!user);
      });
    });
  }

  obtenerDatos(): Promise<void> {
    return new Promise((resolve, reject) => {
      const auth = getAuth();
  
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
  
          const colRef = collection(this.firestore, 'coins');
  
          const q = query(colRef, where('uid', '==', uid));
  
          getDocs(q)
            .then((response) => {
              this.datosFS = response.docs.map((doc) => doc.data());
              resolve(); 
            })
            .catch((error) => {
              console.error('Error al obtener los datos:', error);
              reject(error); 
            });
        } else {
        }
      });
    });
  }

  seguirMonedad(id: any) {
    const auth = getAuth();
    const uid = this.user?.uid;
    if(uid){
    const docRef = collection(this.firestore, 'coins');

    addDoc(docRef, {
      id: id,
      uid: uid
    })
      .then(() => {
        
        console.log('Moneda seguida exitosamente');
      })
      .catch((error) => {
        console.error('Error al seguir la moneda:', error);
      });
    }else{
      console.log(" Erro del uid")
    }
  }

  eliminarMoneda(idMoneda: string) {
    const uid = this.user?.uid;
    const firestore = getFirestore();
    const colRef = collection(firestore, 'coins');
    
    console.log(this.user?.uid)
    
    const q = query(colRef, where('uid', '==', uid), where('id', '==', idMoneda));
  
    getDocs(q)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const docRef = doc.ref;
          deleteDoc(docRef)
            .then(() => {
              console.log('Moneda eliminada exitosamente');
            })
            .catch((error) => {
              console.error('Error al eliminar la moneda:', error);
            });
        });
      })
      .catch((error) => {
        console.error('Error al realizar la consulta:', error);
      });
  }


}


