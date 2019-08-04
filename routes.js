const routes = require('next-routes');

// routes.add(name, pattern = /name, page = name)
const router = routes()
  .add('join', '/join/:id', 'join')
  .add('studyDetail', '/studyDetail/:studyId', 'studyDetail')
  .add('beforeStudy', '/studyDetail/:studyId/beforeStudy', 'beforeStudy')
  .add('afterStudy', '/studyDetail/:studyId/afterStudy', 'afterStudy')
  .add('editStudy', '/editStudy/:studyId', 'editStudy')
  .add('addSchedule', '/addSchedule/:studyId', 'addSchedule')
  .add('scheduleDetail', '/schedule/:scheduleId', 'scheduleDetail')
  .add('editSchedule', '/editSchedule/:scheduleId', 'editSchedule')
  .add('studyMembers', '/studyMembers/:studyId', 'studyMembers')
  .add('studyMembersInfo', '/studyMembersInfo/:studyId', 'studyMembersInfo')
  .add('manager', '/manager/:studyId', 'manager')
  .add('subManager', '/subManager/:studyId', 'subManager')
  .add('normal', '/normal/:studyId', 'normal')
  .add('withdrawStudy', '/withdrawStudy/:studyId', 'withdrawStudy')
  .add('studyInvite', '/studyInvite/:studyId', 'studyInvite');
exports.Link = router.Link;

module.exports = router;

//                                                     // Name   Page      Pattern
// module.exports = routes()                           // ----   ----      -----
// .add('about')                                       // about  about     /about
// .add('blog', '/blog/:slug')                         // blog   blog      /blog/:slug
// .add('user', '/user/:id', 'profile')                // user   profile   /user/:id
// .add('/:noname/:lang(en|es)/:wow+', 'complex')      // (none) complex   /:noname/:lang(en|es)/:wow+
// .add({name: 'beta', pattern: '/v3', page: 'v3'})    // beta   v3        /v3
