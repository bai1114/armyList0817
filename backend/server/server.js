// server.js

var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var path = require('path');
const fileUpload = require('express-fileupload');
// 2nd part -- connect database and add data table
var Soldier     = require('../models/soldiers');


var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/army');
// 2nd part

//middlewares
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
});

// Error Info
// app.use(function(req, res, next) {
//     res.status(404).send('404 Not Found.');
// });

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(fileUpload());
app.use('/static', express.static(path.join(__dirname, 'public')));   // serve static files

var port = process.env.PORT || 5000;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// get soldier list (accessed at GET http://localhost:5000/api/)
router.get('/', function(req, res) {
    console.log('this is in the get soldier~~~');
    let allcounts;
    Soldier.find(function(err, soldiers) {
      if (err) {
        res.send(err);
        //throw err;
      }
      const promises = soldiers.map(curSol => {
          return Soldier.count({ superiorId: curSol._id }).exec();
      });
      Promise.all(promises)
        .then(counts => {
            allcounts = counts;
        });
        const superiorPromises = soldiers.map(curSol => {
            return Soldier.findById(curSol.superiorId).exec();
        });
        Promise.all(superiorPromises)
            .then(superiorNames => { 
                const soldierList = [];
                for (let i = 0; i < soldiers.length; i++) {
                    const superior = superiorNames[i];
                    
                    let superiorName;
                    if (superior === null) {
                        superiorName = '';
                    } else {
                        superiorName = superior.name;
                    }
                    const soldierObject = {
                        _id: soldiers[i]._id,
                        imgUrl: soldiers[i].imgUrl,
                        name: soldiers[i].name,
                        sex: soldiers[i].sex,
                        rank: soldiers[i].rank,
                        startDate: soldiers[i].startDate,
                        phone: soldiers[i].phone,
                        email: soldiers[i].email,
                        superiorId: soldiers[i].superiorId,
                        superiorName: superiorName,
                        numberOfDirectSubs: allcounts[i],
                    };
                    soldierList.push(soldierObject);
                }
                res.status(200).json({ soldiers: soldierList });
            })
            .catch(err => {
                res.status(500).json({ err });
            });
    });
});


// Infinite Loading  
router.get('/range/:offset/:number', (req, res) => {
    console.log('this is in the loading range part!!!');
    const offset = parseInt(req.params.offset);
    const number = parseInt(req.params.number);
    let allcounts;
    let superiorNames;
    let curSoldiers;
    Soldier.find({}).skip(offset).limit(number).exec()
      .then(soldiers => {
        curSoldiers = soldiers;
        const promises = curSoldiers.map(curSol => {
          return Soldier.count({superiorId: curSol._id}).exec();
        });
        return Promise.all(promises);
      })
      .then(counts => {
        allcounts = counts;
        const superiorPromises = curSoldiers.map(curSol => {
          return Soldier.findById(curSol.superiorId).exec();
        });
        return Promise.all(superiorPromises);
      })
      .then(superiorNames => {
        const soldierList = [];
        for (let i = 0; i < curSoldiers.length; i++) {
          let superiorName = '';
          if(superiorNames[i] != null) superiorName = superiorNames[i].name;
          const soldierObj = {
            _id: curSoldiers[i]._id,
            sex: curSoldiers[i].sex,
            name: curSoldiers[i].name,
            imgUrl: curSoldiers[i].imgUrl,
            rank: curSoldiers[i].rank,
            startDate: curSoldiers[i].startDate,
            phone: curSoldiers[i].phone,
            email: curSoldiers[i].email,
            superiorId: curSoldiers[i].superiorId,
            superiorName: superiorName,
            numberOfDirectSubs: allcounts[i],
          };
          soldierList.push(soldierObj);
        }
        res.status(200).json({ soldiers: soldierList });
      })
      .catch(err => {
        res.status(500).json({err});
        throw err;
      });
  });


// 3rd part - create a soldier (accessed at POST http://localhost:5000/api/)
router.post('/create', function(req, res) {
        console.log('This is in the post soldier');
        const newSoldier = new Soldier(req.body);
        console.log('req.body~~~', req.body);
        console.log('newSodier in server~~~', newSoldier);
        newSoldier.save((err, soldier) => {
          if (err) {
              res.status(500).json({err});
              console.log(err);
          } else {
              res.status(200).json({message: 'create a new soldier successfully', soldier });
          }
        });
        
    })
// 3rd part

// 4th part --  access an individual soldier
// get the soldier with that id (accessed at GET http://localhost:5000/api/:soldierId)
router.get('/:soldierId', (req, res) => {
    const soldierId = req.params.soldierId;
    let curSoldier;
    let superiorName;
    let number = 0;
    Soldier.findById(soldierId).exec()
        .then(soldier => {
        curSoldier = soldier;
        return Soldier.count({ superiorId: curSoldier._id }).exec();
        })
        .then(count => {
        number = count;
        return Soldier.findById(curSoldier.superiorId).exec();
        })
        .then(superior => {
        if (superior === null) {
            superiorName = '';
        } else {
            superiorName = superior.name;
        }
        const soldierObj = {
            ...curSoldier.toObject(),
            superiorName,
            numberOfDirectSubs: number
        };
        res.status(200).json({soldier: soldierObj});
        // console.log('soldierObj',soldierObj);
        })
        .catch(err => {
        res.status(500).json({ err });
        throw err;
        });
    });
// 4th part end

// 5th part -- update the soldier info with this id (accessed at PUT http://localhost:5000/api/edit/:soldierId)  
router.route('/edit/:soldierId')
    .put(function(req, res) {
        const soldierId = req.params.soldierId;
        console.log('THIS IS IN THE EDIT PART');
        // console.log('!!!!!!!!soldierID', soldierId);
        Soldier.findByIdAndUpdate(soldierId, req.body, (err) => {
            if (err) {
                res.status(500).json({err});
                throw err;
                //res.send(err);
            }
            res.status(200).json({message: `soldier ${req.params.soldierId} edit success`});
        });
    })
    
   

    // {new: true}).exec()
    //   .then(soldier => {res.status(200).json({soldier: soldier });})
    //   .catch(err => {
    //     res.status(500).json({err});
    //     throw err;
    //   });
    // });
// 5th part end

// 6th part - delete the soldier with this id (accessed at DELETE http://localhost:5000/api/delete/:soldierId)
router.route('/delete/:soldierId')
    .delete(function(req, res) {
        const soldierId = req.params.soldierId;
        let originalSoldier;
        Soldier.findById(soldierId).exec()
            .then(soldier => {
                originalSoldier = soldier;
                return Soldier.findByIdAndRemove(soldierId).exec();
                // res.json({ message: 'Successfully deleted' });
            })
            .then(() => {
                    Soldier.find({ superiorId: originalSoldier._id }).exec()
                  .then(directSubs => {
                    const message = `Soldier id ${originalSoldier._id} has been deleted Successfully.`
                    if (directSubs) {
                      const promises = directSubs.map(ds => {
                        return Soldier.findByIdAndUpdate(ds._id, {superiorId: originalSoldier.superiorId}).exec();
                      });
                      Promise.all(promises)
                        .then(directSubs => {
                          res.status(200).json({message});
                        })
                        .catch(err => {
                          res.status(500).json({err});
                          throw err;
                        })
                    } else {
                      res.status(200).json({message})
                    }
                  })
                  .catch(err => {
                    res.status(500).json({err});
                    throw err;
                  });
              })
            .catch(err => {
                res.status(500).json({err});
                throw err;
            });
    });
// 6th part end


// image 
router.post('/image', (req, res) => {
    let imageFile = req.files.image;
    console.log('server testing imageFile', imageFile);
    console.log('req.body.filename', req.body.filename);
    console.log('path!!!', path.join(__dirname, '..', 'public/images/', `${req.body.filename}`));
    imageFile.mv(path.join(__dirname, '..', 'public/images/', `${req.body.filename}`), err => {
    // imageFile.mv(path.join('/Users/Flora/myapp/backend/public/images/public/images/', `${req.body.filename}`), err => {
      if (err) {
        res.status(500).json({err});
        throw err;
      }
      // res.status(200).json({file: `pubic/images/${req.body.filename}`, imgUrl: `/static/images/${req.body.filename}`});
      res.status(200).json({file: `pubic/images/${req.body.filename}`, imgUrl: path.join(__dirname, '..', 'public/images/', `${req.body.filename}`)});
    });
  });



// direct subs
router.get('/:soldierId/directSubs', (req, res) => {
    const soldierId = req.params.soldierId;
    let curDirectSubs;
    let supName;
    Soldier.findById(soldierId).exec().then(curSuperior => {supName = curSuperior.name})
    Soldier.find({ superiorId: soldierId }).exec()
      .then(directSubs => {
        curDirectSubs = directSubs;
        const promises = directSubs.map(ds => {
          return Soldier.count({ superiorId: ds._id }).exec();

        });
        
        return Promise.all(promises);
      })
      .then(counts => {
        const dsList = [];
        for (let i = 0; i < curDirectSubs.length; i++) {
          const curDs = {
            _id: curDirectSubs[i]._id,
            name: curDirectSubs[i].name,
            rank: curDirectSubs[i].rank,
            imgUrl: curDirectSubs[i].imgUrl,
            superiorId: curDirectSubs[i].superiorId,
            numberOfDirectSubs: counts[i],
            superiorName:supName,
            sex: curDirectSubs[i].sex,
            startDate: curDirectSubs[i].startDate,
            phone: curDirectSubs[i].phone,
            email: curDirectSubs[i].email,
          };
          dsList.push(curDs);
        }
        res.status(200).json({ directSubs: dsList });
      })
      .catch(err => {
        res.status(500).json({ err });
        throw (err);
      });
  });


// Infinite Loading  
router.get('/range/:offset/:number', (req, res) => {
    const offset = parseInt(req.params.offset);
    const number = parseInt(req.params.number);
    let allcounts;
    let superiorNames;
    let curSoldiers;
    Soldier.find({}).skip(offset).limit(number).exec()
      .then(soldiers => {
        curSoldiers = soldiers;
        const promises = curSoldiers.map(curSol => {
          return Soldier.count({superiorId: curSol._id}).exec();
        });
        return Promise.all(promises);
      })
      .then(counts => {
        allcounts = counts;
        const superiorPromises = curSoldiers.map(curSol => {
          return Soldier.findById(curSol.superiorId).exec();
        });
        return Promise.all(superiorPromises);
      })
      .then(superiorNames => {
        const soldierList = [];
        for (let i = 0; i < curSoldiers.length; i++) {
          let superiorName = '';
          if(superiorNames[i] != null) superiorName = superiorNames[i].name;
          const soldierObj = {
            _id: curSoldiers[i]._id,
            name: curSoldiers[i].name,
            imgUrl: soldiers[i].imgUrl,
            rank: curSoldiers[i].rank,
            startDate: curSoldiers[i].startDate,
            phone: curSoldiers[i].phone,
            email: curSoldiers[i].email,
            superiorId: curSoldiers[i].superiorId,
            superiorName: superiorName,
            numberOfDirectSubs: allcounts[i],
          };
          soldierList.push(soldierObj);
        }
        res.status(200).json({ soldiers: soldierList });
      })
      .catch(err => {
        res.status(500).json({err});
        throw err;
      });
  });


// 7th part - search
// router.route('/search/:keyword')
//     .get(function(req, res) {
//         const keyword = req.params.keyword;
//         User.find({
//           $or: [{firstname : {$regex: keyword}}, {lastname : {$regex : keyword}}]}, (err, users) => {
//             console.log('server test keyword is', keyword);
//             if (err) {
//                 throw err;
//             }
//             console.log(users);
//             res.status(200).json(users);
//         });
//     })
// 7th part 

// 8th part - pagination
// router.route('/count')
//     .get(function(req, res) {
//         User.count({}, (err, count) => {
//         if (err) {
//             throw err;
//         }
//         res.status(200).json({count});
//         });
//     });

// router.route('/fetch')
//     .get(function(req, res){
//         User.findById(1000,(err, users) => {
//         if (err) {
//             throw err;
//         }
//         console.log("fetch success");
//         res.status(200).json({users});
//         });
//     });

// router.get('/range/:offset/:number', (req, res) => {
//     const offset = parseInt(req.params.offset);    //startindex
//     const number = parseInt(req.params.number);    //limit
//     User
//         .find({})
//         .skip(offset)
//         .limit(number)
//         .exec((err, user) => {
//             if (err) {
//                 throw err;
//             }
//             res.status(200).json(user);
//         });
// });
// 8th part end

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
