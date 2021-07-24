const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A product must have a name'],
      trim: true,
      maxLength: [40, 'A product name must be less or eqaul 40 characters'],
      minLength: [10, 'A product name must be more or eqaul 10 characters'],
    },
    model: {
      type: String,
      required: [true, 'A product must have a model'],
      trim: true,
    },
    type: {
      type: String,
      required: [true, 'A product must have a type'],
      trim: true,
    },
    fabric: String,
    fabricFeatures: {
      stretch: {
        type: Boolean,
        default: false,
      },
      antiPilling: {
        type: Boolean,
        default: false,
      },
      butterySoft: {
        type: Boolean,
        default: false,
      },
      preShrunk: {
        type: Boolean,
        default: false,
      },
      wrinkleFree: {
        type: Boolean,
        default: false,
      },
      colorAndFitRetention: {
        type: Boolean,
        default: false,
      },
      breathable: {
        type: Boolean,
        default: false,
      },
      durable: {
        type: Boolean,
        default: false,
      },
      lightweight: {
        type: Boolean,
        default: false,
      },
      naturalSoftness: {
        type: Boolean,
        default: false,
      },
    },
    sizeAndFit: [String],
    materialAndCare: [String],
    reason: String,
    price: {
      type: Number,
      required: [true, 'A product must have price'],
    },
    sale: {
      type: Number,
      default: 0,
    },
    summary: {
      type: String,
      required: [true, 'A product must have a summary'],
    },
    cut: String,
    collar: String,
    status: String,
    color: {
      type: String,
      required: [true, 'A product must have color'],
    },
    size: {
      small: {
        type: Number,
        default: 0,
      },
      medium: {
        type: Number,
        default: 0,
      },
      large: {
        type: Number,
        default: 0,
      },
      xLarge: {
        type: Number,
        default: 0,
      },
      xxLarge: {
        type: Number,
        default: 0,
      },
    },
    imageCover: {
      type: String,
      required: [true, 'A product must have image cover'],
    },
    imageDetail: {
      type: String,
      required: [true, 'A product must have image cover'],
    },
    images: [String],
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'rating must be above 1.0'],
      max: [5, 'rating must be below 5.0'],
      set: (val) => Math.round(val * 10) / 10,
    },
    slug: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'product',
});

// add slug to document before save to DB
productSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
