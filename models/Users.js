const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
   username: {
    type: String,
    required: true,
    unique: true
   },
   password: {
    type: String,
    required: [true, '`{PATH}` alanı zorunludur.'],
    maxlength: [60, '`{PATH}` alanı (`{VALUE}`), ({MAXLENGTH}) karakterden küçük olmalıdır.' ],
    minlength: [5, '`{PATH}` alanı (`{VALUE}`), ({MINLENGTH}) karakterden büyük olmalıdır.' ]
   }
});

module.exports = mongoose.model('user',UserSchema);