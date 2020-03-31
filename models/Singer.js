const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SingerSchema = new Schema({
   name: {
    type: String,
    required: [true, '`{PATH}` alanı zorunludur.'],
    maxlength: [60, '`{PATH}` alanı (`{VALUE}`), ({MAXLENGTH}) karakterden küçük olmalıdır.' ],
    minlength: [2, '`{PATH}` alanı (`{VALUE}`), ({MINLENGTH}) karakterden büyük olmalıdır.' ]
   },
   surname: {
    type: String,
    maxlength: [60, '`{PATH}` alanı (`{VALUE}`), ({MAXLENGTH}) karakterden küçük olmalıdır.' ],
   },
   is_group: {
    type:Boolean,
    required: [true, '`{PATH}` alanı zorunludur.']
   },
   country: {
    type: String,
    required: [true, '`{PATH}` alanı zorunludur.'],
    maxlength: [40, '`{PATH}` alanı (`{VALUE}`), ({MAXLENGTH}) karakterden küçük olmalıdır.' ],
    minlength: [0, '`{PATH}` alanı (`{VALUE}`), ({MINLENGTH}) karakterden büyük olmalıdır.' ]
   },
   createdAt: {
       type: Date,
       default: Date.now
   }
});

module.exports = mongoose.model('singer',SingerSchema);