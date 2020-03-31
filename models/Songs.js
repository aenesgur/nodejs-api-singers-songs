const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const currentYear = new Date();

const SongSchema = new Schema({
    singer_id: Schema.Types.ObjectId,
    name:{
        type: String,
        required: [true, '`{PATH}` alanı zorunludur.'],
        maxlength: [150, '`{PATH}` alanı (`{VALUE}`), ({MAXLENGTH}) karakterden küçük olmalıdır.' ],
        minlength: [2, '`{PATH}` alanı (`{VALUE}`), ({MINLENGTH}) karakterden büyük olmalıdır.' ]
    },
    type: {
        type: String,
        maxlength: [30, '`{PATH}` alanı (`{VALUE}`), ({MAXLENGTH}) karakterden küçük olmalıdır.' ],
        minlength: [2, '`{PATH}` alanı (`{VALUE}`), ({MINLENGTH}) karakterden büyük olmalıdır.' ]
    },
    published_year: {
        type: Number,
        max: [currentYear.getFullYear(), '`{PATH}` alanı (`{VALUE}`), ({MAX}) tarihinden küçük olmalıdır.' ],
        min: [1900, '`{PATH}` alanı (`{VALUE}`), ({MIN}) tarihinden büyük olmalıdır.' ]
    },
    sold_piece: {
        type: Number,
        min: [0, '`{PATH}` alanı (`{VALUE}`), ({MIN}) tarihinden büyük olmalıdır.' ]
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('song',SongSchema);