const router = require('express').Router();
let Ads = require('../models/ads.model');

router.route('/').get((req,res)=>{
    Ads.find()
    .then(ads=> res.json(ads))
    .catch(err=> res.status(400).json('Error'+err));
});

router.route('/add').post((req,res)=>{
    const username = req.body.username;
    const title = req.body.title;
    const description = req.body.description;
    const date = Date.parse(req.body.date);

    const newAds = new Ads({
        username,
        title,
        description,
        date,
    });

    newAds.save()
    .then(()=> res.json('Ads ditambahkan'))
    .catch(err=> res.status(400).json('Error'+err));
});


router.route('/:id').get((req,res)=>{
    Ads.findById(req.params.id)
    .then(ads=> res.json(ads))
    .catch(err=> res.status(400).json('Error: '+err));
});
router.route('/:id').delete((req,res)=>{
    Ads.findByIdAndDelete(req.params.id)
    .then(()=> res.json('Ads terhapus'))
    .catch(err=> res.status(400).json('Error: '+err));
});
router.route('/update/:id').post((req,res)=>{
    Ads.findById(req.params.id)
    .then(ads => {
        ads.username = req.body.username;
        ads.title = req.body.title;
        ads.description = req.body.description;
        ads.date = Date.parse(req.body.date);
        
        ads.save()
        .then (() => res.json('Ads terupdate!'))
        .catch (err => res.status(400).json('Error: '+err));
    })
    .catch(err => res.status(400).json('Error :' + err));
});
module.exports=router;