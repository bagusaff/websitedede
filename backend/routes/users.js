//membutuhkan router karena ini adalah express router yang kita buat
const router = require('express').Router();
//memanggil mongoose models
let User = require('../models/user.model');

//inpoint pertama yang melayani alamat alamat ilangnemu.com/users/
router.route('/').get((req,res)=>{
    User.find() //method mongoose yang akan mengambil daftar user dari mongodb
    .then(users=> res.json(users)) //mengambil users dan return ke format json
    .catch(err=> res.status(400).json('Error'+err));
});

//inpoint untuk method post
router.route('/add').post((req,res)=>{
    const username = req.body.username;
    const newUser = new User({username});

    newUser.save()
    .then(()=> res.json('User ditambahkan'))
    .catch(err=> res.status(400).json('Error'+err));
});

module.exports=router;