const mongoose = require('mongoose');
const { default: slugify } = require('slugify');

const collectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A collection must have a name'],
      unique: true,
    },
    imageHero: String,
    imageCover: {
      type: String,
      required: [true, 'A collection must have an Image cover'],
    },
    image: String,
    imageDetail: String,
    imageOverview: String,
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    mode: {
      type: String,
      // main=> overview hero & navbar , first=> navbar , second=> overview section
      enum: ['main', 'first', 'second', 'third', 'none'],
      default: 'none',
    },
    slug: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

collectionSchema.index({ slug: 1 });

collectionSchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'collectionId',
});

collectionSchema.pre('save', async function (next) {
  const doc = await mongoose.model('Collection').findOne({ mode: this.mode });
  if (doc) {
    await mongoose.model('Collection').findByIdAndUpdate(
      doc._id,
      { mode: 'none' },
      {
        new: true,
        runValidators: true,
      }
    );
  }
  next();
});

collectionSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Collection = mongoose.model('Collection', collectionSchema);

module.exports = Collection;
