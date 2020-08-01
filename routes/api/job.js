module.exports = (app) => {
  const jobcontroller = require('../../controller/jobcontroller');

  app.post('/api/jobs/createjob', jobcontroller.CreateJob);
  app.get('/api/jobs/getjobs', jobcontroller.getalljob);
  app.get('/api/jobs/getjobs/:id', jobcontroller.getjobbyID);
  app.get('/api/jobs/getjobsbyuser/:id', jobcontroller.getjobbyuserID);
  app.patch('/api/jobs/updatejob/:id', jobcontroller.updatejob);
  app.delete('/api/jobs/delete/:id', jobcontroller.deletjob);
};
