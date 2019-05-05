//definition
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const shortId = require('shortid');
//mogoose
const mongoose = require('mongoose');
mongoose.connect(process.env.MLAB_URI || 'mongodb://localhost/excercise-track');
const Schema = mongoose.Schema;
//Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('views'));

//send index
app.get('/', (req, res) => {
  res.sendFile(__dirname + 'views/index.html');
});

//db stuff
const PersonSchema = new Schema({
  shortId: { type: String, unique: true, default: shortId.generate },
  username: String,
  exercise: [
    {
      desc: String,
      duration: Number,
      date: {}
    }
  ]
});

var Person = mongoose.model('Person', PersonSchema);
const createPerson = (name, done) => {
  Person.findOne({ username: name }, (err, findData) => {
    if (findData == null) {
      // no user curently, make new
      const person = new Person({ username: name, exercise: [] });
      person.save((err, data) => {
        if (err) {
          done(err);
        }
        done(null, data);
      });
    } else if (err) {
      done(err);
    } else {
      //username taken
      done(null, 'taken');
    }
  });
};

const addExercise = (personId, acivity, done) => {
  personalbar.findOne({ shortId: shortId }, { err, data }=>{
      //add to array
      if (data== null) {
          done(null,'notFound')
      }else{
          if (data.exercise.length ===0) {
              data.exercise==data.exercise.concat([acivity]);
          }else if (data.exercise.date ==null) {
              data.exercise.splice(0,0,activity);
          }else{
              let mark='pending';
              for (let i = 0; i < data.exercise.length; i++) {
                if (activity.date < data.exercise[i].date){
                    data.exercise.splice(i,0,activity);
                    mark = 'done'
                    break;
              }
          }
          if (mark ==='pending') {
              data.exercise = data.exercise.concat(activity);
          }
      }
      //save
      data.save((err,data)=>{
          if(err){
              console.log(err);
              done(err)
          }else {
              done(null,data)
          }
      });
  });
};

}