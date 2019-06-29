import {useEffect} from 'react';
import fb from '../firebase';

const FirebaseEx = () => {

  // set data
  const userRef = fb().firestore().collection('users');
  const sampleUserRef = userRef.doc('sampleData');
  const setSampleUserRef = sampleUserRef.set({
    userName: "leesoo",
    userEmail: "asldfja@adfas.casldf"
  }).then(() => console.log("data uploaded success")).catch(e => console.log(e));

  // update data
  const updateSampleUserRef = sampleUserRef.update({
    userName: "sueleesoossoo"
  }).then(() => console.log("data updated success")).catch(e => console.log(e));


  // add subcollection (oauth)
  // const oauthUserRef = userRef.doc('sampleData').collection('oauth').doc('kakao');
  // const setOauthUserRef = oauthUserRef.set({
  //   name: 'kakao',
  //   id: 'sadfasdfaf'
  // });
  // delete data
  // const deleteUserRef = userRef.doc('sampleData').delete().then(() => console.log("delete success")).catch(e => console.log(e));

  // get data
  useEffect(() => {
    fb().firestore().collection('users').get().then(
      usersSnapshot => usersSnapshot.forEach(doc => {
        console.log(doc.data());
      }),
    );

  }, []);
  const sampleStudy = {
    studyName: "nodeJS",
    studyDesc: "노드JS를 배워보자!",
    createdAt: new Date().getTime(),
    updatedAt: null
  };
  const studyRef = fb().firestore().collection('studies');
  const sampleStudyRef = studyRef.doc('sampleStudy');
  const setSampleStudyRef = sampleStudyRef.set(sampleStudy).then(() => console.log("setting study success")).catch(e => console.log(e));

  const studyQuery = studyRef.where('studyName', '==', 'nodeJS').get().then(
    studySnapshot => studySnapshot.forEach(doc => {
      console.log(doc.data());
    })
  );
  const userQuery = userRef.where('userName', '==', 'sueleesoossoo');

  // // add subcollection(study) in user
  // const setStudyInUserRef = sampleUserRef.collection('studies').doc('sampleStudy')
  //   .set(sampleStudy).then(() => console.log("setting study subcollection in sample user"));

};

export default FirebaseEx;