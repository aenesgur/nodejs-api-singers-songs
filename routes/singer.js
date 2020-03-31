const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const Singer = require('../models/Singer');

router.post('/', (req, res, next) => {
  const addSinger = new Singer(req.body);
  addSinger.save()
    .then((data)=>{
      res.json(data);
    })
    .catch((err)=>{
      res.json(err);
    });
});

router.get('/',(req,res)=>{
  const promise = Singer.aggregate([
    {
      $lookup: {
        from: 'songs',
        localField: '_id',
        foreignField: 'singer_id',
        as: 'songs'
      }
    },
    {
      $unwind: {
        path: '$songs',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $group: {
        _id: {
          _id: '$_id',
          name: '$name',
          surname: '$surname',
          is_group:'$is_group',
          country:'$country'
        },
        songs: {
          $push: '$songs'
        }
      }
    },
    {
      $project: {
        _id: '$_id._id',
        name: '$_id.name',
        surname: '$_id.surname',
        is_group: '$_id.is_group',
        country:'$_id.country',
        songs: '$songs'
      }
    }
  ]);

  promise.then((data)=>{
    res.json(data);
  })
  .catch(((err)=>{
    res.json(err);
  }))
});

router.get('/:singer_id',(req,res)=>{
  const promise = Singer.aggregate([
    {
      $match: {
        '_id': mongoose.Types.ObjectId(req.params.singer_id)
      }
    },
    {
      $lookup: {
        from: 'songs',
        localField: '_id',
        foreignField: 'singer_id',
        as: 'songs'
      }
    },
    {
      $unwind: {
        path: '$songs',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $group: {
        _id: {
          _id: '$_id',
          name: '$name',
          surname: '$surname',
          is_group:'$is_group',
          country:'$country'
        },
        songs: {
          $push: '$songs'
        }
      }
    },
    {
      $project: {
        _id: '$_id._id',
        name: '$_id.name',
        surname: '$_id.surname',
        is_group: '$_id.is_group',
        country:'$_id.country',
        songs: '$songs'
      }
    }
  ]);

  promise.then((data)=>{
    res.json(data[0]);
  })
  .catch(((err)=>{
    res.json(err);
  }))
});

router.put('/:singer_id',(req,res,next)=>{
  const singerUpdate = Singer.findByIdAndUpdate(req.params.singer_id,req.body,{new:true});

  singerUpdate.then((singer)=>{
    if(!singer){
      next({message:'The singer was not found!',code:1});
    }
    else{
      res.json(singer);

    }
  });
});

router.delete('/:singer_id',(req,res,next)=>{
  const singerDelete = Singer.findByIdAndRemove(req.params.singer_id);

  singerDelete.then((data)=>{
    if(!data){
      next({message:'The singer was not found!',code:1});
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
