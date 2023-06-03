import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: 'AIzaSyDFYqQRsWaWYQ_wa3Hx4ecdZ6kfCw7ttzI',
    authDomain: 'mobile-lab04-18521666.firebaseapp.com',
    projectId: 'mobile-lab04-18521666',
    storageBucket: 'mobile-lab04-18521666.appspot.com',
    messagingSenderId: '187389572253',
    appId: '1:187389572253:web:20c051dab9a51a1c6e9074',
}

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

export { db }