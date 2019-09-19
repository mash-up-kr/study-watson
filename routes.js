const routes = require('next-routes');

// routes.add(name, pattern = /name, page = name)
const router = routes()
  .add('join', '/join/:id', 'join')
  .add('studyDetail', '/study/:studyId', 'studyDetail')
  .add('beforeStudy', '/study/:studyId/beforeStudy', 'beforeStudy')
  .add('afterStudy', '/study/:studyId/afterStudy', 'afterStudy')
  .add('editStudy', '/editStudy/:studyId', 'editStudy')
  .add('addSchedule', '/study/:studyId/addSchedule', 'addSchedule')
  .add('scheduleDetail', '/study/:studyId/schedule/:scheduleId', 'scheduleDetail')
  .add('editSchedule', '/study/:studyId/editSchedule/:scheduleId', 'editSchedule')
  .add('studyMembers', '/studyMembers/:studyId', 'studyMembers')
  .add('studyMembersInfo', '/studyMembersInfo/:studyId', 'studyMembersInfo')
  .add('manager', '/manager/:studyId', 'manager')
  .add('subManager', '/subManager/:studyId', 'subManager')
  .add('normal', '/normal/:studyId', 'normal')
  .add('withdrawStudy', '/withdrawStudy/:studyId', 'withdrawStudy')
  .add('studyInvite', '/studyInvite/:studyId', 'studyInvite')
  .add('vote', '/study/:studyId/vote/:scheduleId', 'vote');
exports.Link = router.Link;

module.exports = router;

//                                                     // Name   Page      Pattern
// module.exports = routes()                           // ----   ----      -----
// .add('about')                                       // about  about     /about
// .add('blog', '/blog/:slug')                         // blog   blog      /blog/:slug
// .add('user', '/user/:id', 'profile')                // user   profile   /user/:id
// .add('/:noname/:lang(en|es)/:wow+', 'complex')      // (none) complex   /:noname/:lang(en|es)/:wow+
// .add({name: 'beta', pattern: '/v3', page: 'v3'})    // beta   v3        /v3
