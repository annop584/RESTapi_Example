const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const app = express();

//dummy database
let database ={
  members:[
    {
      id: 1,
      name: "Annop",
      surname: "Gobhiran",
      nickname: "Earth",
      age: 25,
      job: "Survivor",
      favoritegame: "ResidentEvil",
      hobby: "Sleepz",
    },
    {
      id: 2,
      name: "Sopa",
      surname: "Potikanya",
      nickname: "Kaew",
      age: 26,
      job: "Nerd",
      favoritegame: "IdentityV",
      hobby: "Eatz",
    }
  ],

  count:2,
}


//middleware
app.use(bodyParser.json());
app.use(cors());



/* REST api */
//query id,name,age from database for list in table
app.get('/members', (req, res)=> {
  let listmembers = database.members.map((member,i) => {
    let temp_member = {
      id: member.id,
      name: member.name,
      age: member.age,
    };
    return temp_member;
  })
  res.json(listmembers);
})

//query member by id
app.get('/member/:memberId', (req, res)=> {
  const { memberId }  = req.params;
  database.members.some(member => {
    if (member.id == memberId) {
      res.json(member);
      return true;
    }
  })
})

//insert data from frontend to backend database
app.post('/member', (req, res)=> {
  const nextId = database.count+1;
  let member = {
    id: nextId,
    name: req.body.name,
    surname: req.body.surname,
    nickname: req.body.nickname,
    age: req.body.age,
    job: req.body.job,
    favoritegame: req.body.favoritegame,
    hobby: req.body.hobby,
  }
  database.members.push(member);
  database.count = nextId;
  console.log(database.members);
  res.json(member);
})

//update memberData
app.put('/member/:memberId', (req, res)=>{
    const { memberId }  = req.params;
    database.members.some((member,i)=>{
        if (member.id == memberId) {
          console.log(req.body);
          database.members[i].name = req.body.name;
          database.members[i].surname = req.body.surname;
          database.members[i].nickname = req.body.nickname;
          database.members[i].age = req.body.age;
          database.members[i].job = req.body.job;
          database.members[i].favoritegame = req.body.favoritegame;
          database.members[i].hobby = req.body.hobby;
          let updatemember = database.members[i];
          res.json(updatemember);
          return true;
        }
    });
})

app.delete('/member/:memberId', (req, res)=>{
  const { memberId }  = req.params;
  database.members.some((member,i)=>{
      if (member.id == memberId) {
        database.members.splice(i,1)
        res.json(member);
        return true;
      }
  });
})

app.listen(3000);
