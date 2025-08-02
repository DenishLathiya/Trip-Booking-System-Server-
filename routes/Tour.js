const {Tour} =require('../models/Tour')
const express = require('express');
const router  = express.Router();
const cloudinary = require('cloudinary').v2;

router.get('/', async (req, res) => {
    try {
        
        const tourlist = await Tour.find();

         if (!tourlist) {
            return res.status(500).json({ success: false });
        }

        res.send(tourlist);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// insert
router.post('/create', async (req, res) => {
    try{
      const { images } = req.body;
  const pLimit = (await import('p-limit')).default;
  const limit = pLimit(5);

  const imageToUpload = images.map((img) =>
    limit(() => cloudinary.uploader.upload(img))
  );

  const uploadStatus = await Promise.all(imageToUpload);

  if (!uploadStatus || uploadStatus.length === 0) {
    return res.status(500).json({
      error: "Image upload failed",
      status: false
    });
  }

  const imgUrls = uploadStatus.map(item => item.secure_url);

  let tour = new Tour({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    daynight: req.body.daynight,
    address: req.body.address,
    person: req.body.person,
    images: imgUrls, 
    rating: req.body.rating
  });
  console.log(tour);

  tour = await tour.save();
  if (!tour) {
    return res.status(500).json({
      error: "Error saving Tour",
      success: false
    });
  }
  res.status(201).json(tour);  
    }catch (err) {
    console.error(err); 
    res.status(500).json({ error: err.message });
  }
  
});

// delete by id
router.delete('/:id', async(req,res)=>{
    const deletetour = await Tour.findByIdAndDelete(req.params.id);
    if(!deletetour){
      return res.status(404).json({
        message:"Tour does not found !",
        status:false
      })
    }
    res.status(200).send({
      message:"Tour is deleted !",
      status:true
    })
})

// find by id
router.get('/:id' ,async(req,res)=>{
  const tour = await Tour.findById(req.params.id);
  if(!tour){
    res.status(500).json({message:'the Tour given id was not found.'})
  }
  return res.status(200).send(tour);
})

// id the update 

router.put('/:id', async(req,res)=>{
  const tour = await Tour.findByIdAndUpdate(
    req.params.id,{
     name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    daynight: req.body.daynight,
    address: req.body.address,
    person: req.body.person,
   images:req.body.images,
    rating: req.body.rating
    },
    {new:true}
  );

  if(!tour){
    res.status(404).json({
      message:'this is can not update',
      status:false
    })
  }
  res.status(200).json({
    message:'Tour is update',
    status:true
  })
})

module.exports = router;

