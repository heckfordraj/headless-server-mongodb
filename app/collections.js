var mongoose = require('mongoose');
var slugify = require("underscore.string/slugify");

class Collections {

  constructor() {

    var blockSchema = mongoose.Schema({ type: String }, { discriminatorKey: 'type' });
    var Block = mongoose.model('Block', blockSchema)

    var pageSchema = mongoose.Schema({
      type: {
        type: String,
        default: 'page'
      },
      name: {
        type: String,
        required: true,
        trim: true
      },
      slug: {
        type: String,
        set: slugify,
        unique: true,
        sparse: true,
        lowercase: true,
        trim: true
      },
      data: [blockSchema]
    });

    pageSchema.path('data').discriminator('text', new mongoose.Schema({
      data: {
        type: String,
        required: true
      }
    }));

    pageSchema.path('data').discriminator('image', new mongoose.Schema({
      url: {
        type: String,
        required: true
      }
    }));

    mongoose.model('Page', pageSchema)
  }

}

module.exports = Collections;
