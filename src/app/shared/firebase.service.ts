// import { query } from '@angular/animations';
import { Injectable } from '@angular/core';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { collection, addDoc, Firestore, getDocs, collectionData, updateDoc, doc, deleteDoc, where, query } from '@angular/fire/firestore';
import { ref, getDownloadURL, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  data!: Observable<any>
  file:any = {};
  progress:any;
  uploadErr:any;
  downloadLink:any;

   metadata = {
    contentType: 'image/png'
  };

  provider = new GoogleAuthProvider();

  constructor(private auth:Auth, private firestore: Firestore, private storage: Storage ) { }


  uploadFile(){
    const storageRef = ref(this.storage, `/images/${this.file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, this.file);
     uploadTask.on('state_changed', (snapshot)=>{
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      this.progress = `upload is at ` + progress +`% done`;
      console.log('Upload is ' + progress + '% done');
      
    }, err=>{
      this.uploadErr = err.message
    }, ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
        this.downloadLink = `The file is availabe at ` + downloadURL;
        console.log('File available at', downloadURL);
      })
    })
  }

  


  



  createAccount(email:string, password:string){
    return createUserWithEmailAndPassword(this.auth, email, password)
  }

  signIn(email:string, password:string){
    return signInWithEmailAndPassword(this.auth, email, password)
  }

  signInWithGoogle(){
   return signInWithPopup(this.auth, this.provider)
  }

  createCollection(email:string, password:string, age:string){
    const colRef = collection(this.firestore, 'users');
    return addDoc(colRef, {
      email,
      password,
      age
    })
  }


  filterByAge(age:number){
    const colRef = collection(this.firestore, 'users');
    const ageQuery = query(colRef, where("age", "<=", age));
    return getDocs(ageQuery).then((querySnapshot)=>{
      const data:any[] = [] ;
      querySnapshot.forEach((doc)=>{
        data.push(doc.data())
      });
      return data;
    })
  }

  filterByEmail(email:string){
    const colRef = collection(this.firestore, 'users');
    const emailQuery = query(colRef, where('email', '==', email))
    return getDocs(emailQuery).then((res)=>{
      const data:any[] = [];
      res.forEach((doc)=>{
        data.push(doc.data())
      });
      return data;
    })
  }

  getData(){
    const colRef = collection(this.firestore, 'users');
    return this.data = collectionData(colRef, {idField: 'id'})
  }

  updateData(email:string, password:string, id:string){
    const docToUpdate = doc(this.firestore, 'users', id );
   return updateDoc(docToUpdate,  {
      email,
      password
    })
  }

  updateAge(age:string, id:string){
    const docToUpdate = doc(this.firestore, 'users', id );
    return updateDoc(docToUpdate, {
      age
    }) 
  }

  deleteData(id:string){
    const docToDelete = doc(this.firestore, 'users', id );
    return deleteDoc(docToDelete)
  }
}
