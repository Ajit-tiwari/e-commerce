


import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import { 
    GoogleAuthProvider,
     getAuth, 
     signInWithPopup, 
     createUserWithEmailAndPassword, 
     signInWithEmailAndPassword,
     signOut,
     onAuthStateChanged
    
    } from "firebase/auth"
import { 
    getFirestore, 
    doc, 
    getDoc, 
    setDoc, 
    writeBatch, 
    collection, 
    getDocs,
    query
} from "firebase/firestore"

//web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqdCnwXNY3Jr5rMdC1c7BLk03Ut8Bbo1w",
  authDomain: "shop-d6f92.firebaseapp.com",
  projectId: "shop-d6f92",
  storageBucket: "shop-d6f92.appspot.com",
  messagingSenderId: "866543181044",
  appId: "1:866543181044:web:7aaf376bc10af4a92c12a1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const authProvider = new GoogleAuthProvider();

authProvider.getCustomParameters({
    prompt: 'select_account',
})

const db = getFirestore();

export const auth = getAuth();
export const signInWithGooglePopup = ()=> signInWithPopup(auth,authProvider);

export const createAuthUserWithEmailAndPassword = async(email,password)=> {
    if(!email || !password){
        return;
    }

    return await createUserWithEmailAndPassword(auth,email,password);
};

export const signInUserWithEmailAndPassword = async (email,password)=>{
    return await signInWithEmailAndPassword(auth,email,password);
}

export const signOutUser = async() => {
    return await signOut(auth);
}

export const onAuthUserStateChanged = (callback)=>{
    return onAuthStateChanged(auth,callback);
}

export const addCollectionAndDocuments = async (
    collectionKey,
    objectsToAdd
  ) => {
    const batch = writeBatch(db);
    const collectionRef = collection(db, collectionKey);
  
    objectsToAdd.forEach(async (object) => {
      const docRef = doc(collectionRef, object.title.toLowerCase());
      batch.set(docRef, object);
    });
  
    await batch.commit();
    console.log('done');
  };

  export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);
  
    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
      const { title, items } = docSnapshot.data();
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});
  
    return categoryMap;
  };

export const createUserFroAuth = async (userAuth,additionalInformation = {}) => {
    
    let userDoc = doc(db,'users',userAuth.uid);
    let userDocSnapshot = await getDoc(userDoc);

    if(!userDocSnapshot.exists()){
        let {displayName, email} = userAuth;
        let createdAt = new Date();

        try{
            await setDoc(userDoc, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        }
        catch(error){
            console.log("Error while setting up user : ",error.message);
        }
    }
}