const admin = require('firebase-admin');
const serviceAccount = require('../../service-account.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "techsprint-177d2.firebasestorage.app"
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

module.exports = { admin, db, bucket };
