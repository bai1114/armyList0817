// server.js

var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

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

var port = process.env.PORT || 5000;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// get soldier list (accessed at GET http://localhost:5000/api/)
router.get('/count', (req, res) => {
    Soldier.count({}, function (err, number) {
      if (err)res.status(500).json({ err });
      res.status(200).json({ count: number});
    });
  });

router.get('/', function(req, res) {
    console.log('this is in the get soldier~~~');
    let allcounts;
    Soldier.find(function(err, soldiers) {
      if (err) {
        res.send(err);
        //throw err;
      }
      const promises = soldiers.map(curSol => {
          return Soldier.count({ soldierId: curSol._id }).exec();
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
                        imgURL: soldiers[i].imgURL,
                        name: soldiers[i].name,
                        sex: soldiers[i].sex,
                        rank: soldiers[i].rank,
                        startDate: soldiers[i].startDate,
                        phone: soldiers[i].phone,
                        email: soldiers[i].email,
                        superiorId: soldiers[i].superiorId,
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

// 3rd part - create a soldier (accessed at POST http://localhost:5000/api/)
router.post('/create', function(req, res) {
        console.log('This is in the post soldier');
        const newSoldier = new Soldier(req.body);
        console.log(req.body);
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
// ----------------------------------------------------
router.route('/:soldierId')
    // get the soldier with that id (accessed at GET http://localhost:5000/api/:soldierId)
    .get(function(req, res) {
        Soldier.findById(req.params.soldierId, function(err, soldier) {
            if (err)
                res.send(err);
            res.json(soldier);
        });
    })
    //;
// 4th part end

// 5th part -- update the soldier info with this id (accessed at PUT http://localhost:5000/api/edit/:soldierId)  
router.route('/edit/:soldierId')
    .put(function(req, res) {
        const soldierId = req.params.soldierId;
        //console.log(req.body);
        console.log(req.params.soldierId);
        Soldier.findByIdAndUpdate(soldierId, req.body, (err) => {
            if (err) {
                res.set(header).status(500).json({err});
                throw err;
                //res.send(err);
            }
            res.status(200).json({message: `soldier ${req.params.soldierId} edit success`});
        });
    })
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
            
            .catch(err => {
                res.status(500).json({err});
                throw err;
            });
            // .then(() => {
            //     Soldier.find({ superiorId: originalSoldier._id}) .exec()
                    
            // })
        // Soldier.remove({
        //     _id: req.params.soldierId
        // }, function(err, soldier) {
        //     if (err)
        //         res.send(err);

        //     res.json({ message: 'Successfully deleted' });
        // });
    });
// 6th part end

// 7th part - search
router.route('/search/:keyword')
    .get(function(req, res) {
        const keyword = req.params.keyword;
        User.find({
          $or: [{firstname : {$regex: keyword}}, {lastname : {$regex : keyword}}]}, (err, users) => {
            console.log('server test keyword is', keyword);
            if (err) {
                throw err;
            }
            console.log(users);
            res.status(200).json(users);
        });
    })
// 7th part 

// 8th part - pagination
router.route('/count')
    .get(function(req, res) {
        User.count({}, (err, count) => {
        if (err) {
            throw err;
        }
        res.status(200).json({count});
        });
    });

router.route('/fetch')
    .get(function(req, res){
        User.findById(1000,(err, users) => {
        if (err) {
            throw err;
        }
        console.log("fetch success");
        res.status(200).json({users});
        });
    });

router.get('/range/:offset/:number', (req, res) => {
    const offset = parseInt(req.params.offset);    //startindex
    const number = parseInt(req.params.number);    //limit
    User
        .find({})
        .skip(offset)
        .limit(number)
        .exec((err, user) => {
            if (err) {
                throw err;
            }
            res.status(200).json(user);
        });
});
// 8th part end

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
