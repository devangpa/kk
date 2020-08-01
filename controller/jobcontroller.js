const Job = require('../model/Job');

exports.CreateJob = async (req, res) => {
  const SavedjobObj = req.body;

  try {
    const saveddata = await Job.create(SavedjobObj);

    res.status(200).send({Message: 'Saved Job sucessfull', data: saveddata});
  } catch (error) {
    res.status(400).send({Message: 'Not able to save data', data: error});
  }
};

exports.getalljob = async (req, res) => {
  try {
    const getallJob = await Job.find({});
    res.status(200).send({Message: 'Saved Job sucessfull', data: getallJob});
  } catch (error) {
    res.status(400).send({Message: 'Not Able to fetched data', data: error});
  }
};

exports.getjobbyID = async (req, res) => {
  const id = req.params.id;
  const quryObj = {_id: id};
  console.log(quryObj);
  try {
    const getjob = await Job.find(quryObj);
    console.log(getjob);
    res.status(200).send({Message: 'get a job post', data: getjob});
  } catch (error) {
    res.status(400).send({Message: 'Not Able to fetched data', data: error});
  }
};

exports.getjobbyuserID = async (req, res) => {
  const id = req.params.id;
  const quryObj = {userID: id};
  console.log(quryObj);
  try {
    const getjob = await Job.find(quryObj);
    console.log(getjob);
    res.status(200).send({Message: 'get a job post', data: getjob});
  } catch (error) {
    res.status(400).send({Message: 'Not Able to fetched data', data: error});
  }
};

exports.updatejob = async (req, res) => {
  const id = req.params.id;
  const Datatobeupdate = req.body;
  try {
    const updateData = await Job.findByIdAndUpdate(id, {$set: Datatobeupdate});
    res
      .status(200)
      .send({Message: 'Data Update sucessfully', data: updateData});
  } catch (error) {
    res.status(400).send({Message: 'Not able to update a data ', data: error});
  }
};

exports.deletjob = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const deleted = await Job.findByIdAndDelete(id);
    res.status(200).send({Message: 'Data delete sucessfully', data: deleted});
  } catch (error) {
    res.status(400).send({Message: 'Not able to delet a data ', data: error});
  }
};
