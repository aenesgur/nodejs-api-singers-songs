const express = require('express');
const router = express.Router();

const Song = require('../models/Songs');

router.post('/',(req, res, next) => {
  const addSong = new Song(req.body);

  addSong.save()
  .then((data)=>{
    res.json(data);
  })
  .catch((err)=>{
    res.json(err);
  });
});

router.get('/',(req,res)=>{
  const allSongs = Song.aggregate([
    {
      $lookup: {
        from: 'singers',
        localField: 'singer_id',
        foreignField: '_id',
        as: 'singer'
      }
    },
    {
      $unwind: '$singer'
    }
  ]);

  allSongs.then((data)=>{
    res.json(data);
  })
  .catch((err)=>{
    res.json(err);
  });
});

// Top 10 list
router.get('/top10',(req,res)=>{
  const songsTopList = Song.find({}).limit(10).sort({sold_piece: -1});

  songsTopList.then((data)=>{
    res.json(data);
  })
  .catch((err)=>{
    res.json(err);
  });
});

//Between years
router.get('/between/:start_year/:end_year',(req,res)=>{
  const {start_year, end_year} = req.params;
  const allSongs = Song.find(
    {
      published_year:{"$gte": parseInt(start_year), "$lte": parseInt(end_year)}
    });

    allSongs.then((data)=>{
    res.json(data);
  })
  .catch((err)=>{
    res.json(err);
  });
});

router.get('/:song_id',(req,res,next)=>{
  const songDetail = Song.findById(req.params.song_id);

  songDetail.then((data)=>{
    if(!data){
      next({message:'The songs was not found!',code:1});
    }
    else{
      res.json(data);
    }
  })
  .catch((err)=>{
    res.json(err);
  })
});

router.put('/:song_id',(req,res,next)=>{
  const songUpdate = Song.findByIdAndUpdate(req.params.song_id,req.body,{new:true});

  songUpdate.then((data)=>{
    if(!data){
      next({message:'The song was not found!',code:1});
    }
    else{
      res.json(data);

    }
  });
});

router.delete('/:song_id',(req,res,next)=>{
  const songDelete = Song.findByIdAndRemove(req.params.song_id);

  songDelete.then((data)=>{
    if(!data){
      next({message:'The song was not found!',code:1});
    }
    else{
      res.json({status:1})
    }
  })
  .catch((err)=>{
    res.json(err);
  })
});

module.exports = router;
