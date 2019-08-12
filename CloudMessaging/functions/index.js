'use strict'

const functions = require('firebase-functions');
const admin =require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.sendNotification =functions.database.ref('/RemindNotification/{reciever_user_id}/{notification_id}')
.onWrite((data,context)=>
{
const reciever_user_id =context.params.reciever_user_id;
const notification_id =context.params.notification_id;


console.log('We have a notification to send to :',reciever_user_id);


    if(!data.after.val())
    {
        console.log('notification has been deleted :',notification_id);
        return null;
    }

    const deviceToken =admin.database().ref(`/Users/${reciever_user_id}/device_token`).once('value');

    return deviceToken.then(result=>{
        const token_id =result.val();
        const payload =
        {
            notification:{
                title:"Reminder to Return Equipments",
                body:`You have not returned some equipment taken from the lab,Please make sure to return them`,
                icon:"default"
            }
        };

        return admin.messaging().sendToDevice(token_id,payload)
            .then(
                response=>{
                    console.log('This was a notification feature.') 
                }
            );
    });
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
