const Joi = require('joi');
const { default: slugify } = require('slugify');
const db = require('../db');
const collectionSchema = require('../db/collectionSchema');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.grtAllCollections = catchAsync(async (req, res, next) => {
  const columns = `id, name, image_hero, image_cover, image_detail, image_overview, image, created_at, mode, slug`;

  const query = `SELECT ${columns} FROM collections`;
  const { rows, rowCount } = await db.query(query);
  res.status(200).json({
    status: 'success',
    result: rowCount,
    data: {
      collections: rows,
    },
  });
});

exports.createNewCollection = catchAsync(async (req, res, next) => {
  // 1) get the body
  const { body } = req;
  // 2) make a slug
  body.slug = slugify(body.name, { lower: true });
  // 3) validate the values
  const validated_values = await collectionSchema.validateAsync(body);
  // 4) get columns_values "array of values"
  const query_values = Object.keys(validated_values).map((key) => {
    return validated_values[key];
  });
  // 5) get the query string
  const columns = [];
  const columns_num = [];
  Object.keys(validated_values).forEach((key, i) => {
    columns.push(key);
    columns_num.push(`$${i + 1}`);
  });

  const query = `INSERT INTO collections (${columns.join(
    ','
  )}) VALUES (${columns_num.join(',')})`;
  // 6) insert into the database
  await db.query(query, query_values);
  // 7) send res
  res.status(201).json({
    status: 'success',
    data: {
      collection: validated_values,
    },
  });
});

exports.getCollectionById = catchAsync(async (req, res, next) => {
  // 1) get the ID from params
  const { id } = req.params;
  const query_values = [id];
  // 2) the desired columns
  const columns = `id, name, image_hero, image_cover, image_detail, image_overview, image, created_at, mode, slug`;
  // 3) write query
  const query = `SELECT ${columns} FROM collections WHERE id=$1`;
  // 4) select from database
  const { rowCount, rows } = await db.query(query, query_values);
  // 5) check if it exist or not
  if (rowCount !== 1)
    return next(new AppError('No collection found with that ID.', 404));
  // 6) send res
  res.status(200).json({
    status: 'success',
    data: {
      collection: rows[0],
    },
  });
});

exports.updateCollectionById = catchAsync(async (req, res, next) => {
  // 1) get the id
  const { id } = req.params;
  // 2) get the collection
  const { rows, rowCount } = await db.query(
    'SELECT * FROM collections WHERE id=$1',
    [id]
  );
  // 3) check if the collection exist
  if (rowCount !== 1) {
    return next(new AppError('No collection found with that ID.', 404));
  }
  // 4) get the request body info
  const { body } = req;
  // 5) validate the new inputs
  const new_values = { ...rows[0], ...body };
  const validated_values = await collectionSchema.validateAsync(new_values, {
    allowUnknown: true,
  });
  // 6) get the query values
  const query_values = Object.keys(body).map((key) => body[key]);
  // add id to values
  query_values.push(id);
  // 7) get the query columns
  const columns = [];
  Object.keys(body).forEach((key, i) => {
    columns.push(`${key}=$${i + 1}`);
  });
  // 8) write query
  const query = `UPDATE collections SET ${columns.join(',')} WHERE id=$${
    columns.length + 1
  }`;
  // 9) update collection
  await db.query(query, query_values);
  // 10) send res
  res.status('201').json({
    status: 'success',
    data: {
      collection: validated_values,
    },
  });
});

exports.deleteCollectionById = catchAsync(async (req, res, next) => {
  // 1) get the id
  const { id } = req.params;
  // 2) get collection
  const { rowCount } = await db.query(`SELECT * FROM collections WHERE id=$1`, [
    id,
  ]);
  // 3) check if the collection exist
  if (rowCount !== 1) {
    return next(new AppError('No collection found with that ID.', 404));
  }
  // 4) delete collection
  await db.query('DELETE FROM collections WHERE id=$1', [id]);
  // 5) send res
  res.status(204).json({
    status: 'success',
  });
});

exports.getDisplayedCollection = catchAsync(async (req, res, next) => {
  // get collection by it`s mode column
  // 1) get the query
  const { mode } = req.query;
  // 2) if no query send err
  if (!mode) {
    return next(new AppError('Please use query values.', 400));
  }
  // 3) validate query values
  Joi.assert(mode, Joi.string().valid('main', 'first', 'second', 'third'));
  // 4) write query
  const columns = `id, name, image_hero, image_cover, image_detail, image_overview, image, created_at, mode, slug`;
  const query = `SELECT ${columns} FROM collections WHERE mode = $1`;
  // 5) select from database
  const { rows, rowCount } = await db.query(query, [mode]);
  // 6) check if the collection exist
  if (rowCount !== 1) {
    return next(new AppError('No collection found with that mode.', 404));
  }
  // 7) send res
  res.status(200).json({
    status: 'success',
    data: {
      collection: rows[0],
    },
  });
});

exports.getProductCollection = catchAsync(async (req, res, next) => {
  // get colection by id and find it`s products
  // 1) get the id of collection
  const { id } = req.params;
  // 2) find collection
  let { rows, rowCount } = await db.query(
    `SELECT * FROM collections WHERE id=$1`,
    [id]
  );
  // 3) check if the collection exist
  if (rowCount !== 1) {
    return next(new AppError('No collection found with that ID.', 404));
  }
  // 4) find it`s products
  const products_columns =
    'products.id,products.name,products.type,products.fabric,products.price,products.cut,products.collar,products.color,products.color_hex,products.small_size,products.medium_size,products.large_size,products.x_large_size,products.xx_large_size,products.image_cover,products.image_detail,products.slug ';
  const query = `SELECT ${products_columns} FROM products WHERE products.collection_name = $1`;
  const result = await db.query(query, [rows[0].name]);
  // 5) send res
  res.status(200).json({
    status: 'success',
    data: {
      collection: {
        name: rows[0].name,
        image_cover: rows[0].image_cover,
        products: result.rows,
      },
    },
  });
});

////////////////////////////////////////////////////
///////////////////////////////////////////////////
//////////////////////////////////////////////////
/////////////////////////////////////////////////
// const multer = require('multer');
// const sharp = require('sharp');
// const Collection = require('../models/collectionModel');
// const catchAsync = require('../utils/catchAsync');
// const { Readable } = require('stream');
// const { GridFsStorage } = require('multer-gridfs-storage');
// const AppError = require('../utils/AppError');
// const Shopping = require('../models/shoppingModel');
// const Product = require('../models/productModel');
// const Image = require('../models/imageModel');
// const { getOrSetCache } = require('./redisController');

// const storage = (filename) =>
//   new GridFsStorage({
//     url: process.env.DATABASE,
//     file: (req, file) => {
//       return { filename, bucketName: 'photos' };
//     },
//     options: { useUnifiedTopology: true },
//   });

// const multerFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image')) {
//     cb(null, true);
//   } else {
//     cb(new AppError('Not an image! Please upload only images.', 400), false);
//   }
// };

// const upload = multer({
//   fileFilter: multerFilter,
// });

// exports.uploadImage = upload.fields([
//   { name: 'imageCover', maxCount: 1 },
//   { name: 'image', maxCount: 1 },
//   { name: 'imageHero', maxCount: 1 },
//   { name: 'imageDetail', maxCount: 1 },
//   { name: 'imageOverview', maxCount: 1 },
// ]);

// exports.resizeImage = catchAsync(async (req, res, next) => {
//   if (!req.files) return next();

//   if (req.files.imageCover) {
//     req.body.imageCover = `collection_imageCover_${Date.now()}`;
//     const data = await sharp(req.files.imageCover[0].buffer)
//       .resize(1500, 300)
//       .toFormat('jpeg')
//       .jpeg({ quality: 100 })
//       .toBuffer();

//     const fileStream = Readable.from(data);
//     await storage(req.body.imageCover).fromStream(
//       fileStream,
//       req,
//       req.files.imageCover[0]
//     );
//   }

//   if (req.files.imageHero) {
//     req.body.imageHero = `collection_imageHero_${Date.now()}`;
//     const data = await sharp(req.files.imageHero[0].buffer)
//       .resize(1500, 600)
//       .toFormat('jpeg')
//       .jpeg({ quality: 100 })
//       .toBuffer();

//     const fileStream = Readable.from(data);
//     await storage(req.body.imageHero).fromStream(
//       fileStream,
//       req,
//       req.files.imageHero[0]
//     );
//   }

//   // image for section
//   if (req.files.image) {
//     req.body.image = `collection_image_${Date.now()}`;
//     const data = await sharp(req.files.image[0].buffer)
//       .resize(1500, 1500)
//       .toFormat('jpeg')
//       .jpeg({ quality: 100 })
//       .toBuffer();

//     const fileStream = Readable.from(data);
//     await storage(req.body.image).fromStream(
//       fileStream,
//       req,
//       req.files.image[0]
//     );
//   }

//   // image for navbar
//   if (req.files.imageDetail) {
//     req.body.imageDetail = `collection_imageDetail_${Date.now()}`;
//     const data = await sharp(req.files.imageDetail[0].buffer)
//       .resize(1000, 1200)
//       .toFormat('jpeg')
//       .jpeg({ quality: 100 })
//       .toBuffer();

//     const fileStream = Readable.from(data);
//     await storage(req.body.imageDetail).fromStream(
//       fileStream,
//       req,
//       req.files.imageDetail[0]
//     );
//   }

//   // image for the shop page
//   if (req.files.imageOverview) {
//     req.body.imageOverview = `collection_imageOverview_${Date.now()}`;
//     const data = await sharp(req.files.imageOverview[0].buffer)
//       .resize(750, 900)
//       .toFormat('jpeg')
//       .jpeg({ quality: 100 })
//       .toBuffer();

//     const fileStream = Readable.from(data);
//     await storage(req.body.imageOverview).fromStream(
//       fileStream,
//       req,
//       req.files.imageOverview[0]
//     );
//   }

//   next();
// });

// exports.getBestSellersCollection = catchAsync(async (req, res, next) => {
//   const collection = await getOrSetCache('collection_bestsellers', async () => {
//     // 1) find best sellers products
//     const aggregate = await Shopping.aggregate([
//       {
//         $match: {
//           createdAt: {
//             $gte: new Date(new Date().setDate(new Date().getDate() - 30)),
//           },
//         },
//       },
//       { $group: { _id: '$product', count: { $sum: 1 } } },
//       { $match: { count: { $gt: 10 } } },
//     ]);

//     const productIds = aggregate.map((item) => {
//       return item._id;
//     });

//     const products = await Product.find({ _id: { $in: productIds } }).select(
//       'name  type imageCover imageDetail size price sale color cut  collar collectionId createdAt status colorHex slug fabric'
//     );
//     // 2) find the best sellers imageCover from Image
//     const doc = await Image.findOne({ slug: 'best-sellers' });
//     let imageCover;
//     if (doc) imageCover = doc.imageCover;

//     return {
//       name: 'best sellers',
//       imageCover,
//       products,
//     };
//   });

//   // 3) send res as a collections
//   res.status(200).json({
//     status: 'success',
//     data: {
//       collection,
//     },
//   });
// });

// exports.getNewReleasesCollection = catchAsync(async (req, res, next) => {
//   const collection = await getOrSetCache('collection_newreleases', async () => {
//     // 1) get the new products
//     const products = await Product.find({
//       createdAt: {
//         $gte: new Date(new Date().setDate(new Date().getDate() - 60)),
//       },
//     }).select(
//       'name  type imageCover imageDetail size price sale color cut  collar collectionId createdAt status colorHex slug fabric'
//     );
//     // 2) find the new releases imageCover
//     const doc = await Image.findOne({ slug: 'new-releases' });
//     let imageCover;
//     if (doc) imageCover = doc.imageCover;

//     return {
//       name: 'new releases',
//       imageCover,
//       products,
//     };
//   });

//   // 3) send res as a collection
//   res.status(200).json({
//     status: 'success',
//     data: {
//       collection,
//     },
//   });
// });

// // for front end render
// exports.getCollectionWithProducts = catchAsync(async (req, res, next) => {
//   // check params
//   if (req.params.slug === 'all-products') {
//     req.filter = {};
//     return next();
//   } else if (req.params.slug === 'crew-neck') {
//     req.filter = { collar: 'crew' };
//     return next();
//   } else if (req.params.slug === 'v-neck') {
//     req.filter = { collar: 'v-neck' };
//     return next();
//   } else if (req.params.slug === 'henley') {
//     req.filter = { collar: 'henley' };
//     return next();
//   } else if (req.params.slug === 'classic') {
//     req.filter = { cut: 'classic' };
//     return next();
//   } else if (req.params.slug === 'split') {
//     req.filter = { cut: 'split' };
//     return next();
//   } else if (req.params.slug === 'elongated') {
//     req.filter = { cut: 'elongated' };
//     return next();
//   } else if (req.params.slug === 't-shirt') {
//     req.filter = { type: 't-shirt' };
//     return next();
//   } else if (req.params.slug === 'sweat-shirt') {
//     req.filter = { type: 'sweat-shirt' };
//     return next();
//   } else if (req.params.slug === 'long-sleeve') {
//     req.filter = { type: 'long-sleeve' };
//     return next();
//   } else if (req.params.slug === 'polo') {
//     req.filter = { type: 'polo' };
//     return next();
//   } else if (req.params.slug === 'hooded-shirt') {
//     req.filter = { type: 'hooded-shirt' };
//     return next();
//   }
//   // 1) get the name of the collection
//   const slug = req.params.slug;

//   const collection = await getOrSetCache(`collection_${slug}`, async () => {
//     // 2) find the collection and populate the products
//     const collection = await Collection.findOne({ slug }).populate({
//       path: 'products',
//       select:
//         'name  type imageCover imageDetail size price sale color cut  collar collectionId createdAt status colorHex slug fabric',
//     });
//     // 3) if no collection sen err
//     if (!collection) return next(new AppError('No document found.', 404));

//     return collection;
//   });
//   // 4) send res.
//   res.status(200).json({
//     status: 'success',
//     data: {
//       collection,
//     },
//   });
// });

// // get product as a collection for filter
// exports.getProductAsCollection = catchAsync(async (req, res, next) => {
//   const { type } = req.filter;

//   const collection = await getOrSetCache(`collection_${type}`, async () => {
//     // 1) filter the products with req.filter
//     const products = await Product.find(req.filter).select(
//       'name  type imageCover imageDetail size price sale color cut  collar collectionId createdAt status colorHex slug fabric'
//     );
//     // 2) find the imageCover
//     const doc = await Image.findOne({ slug: req.params.slug });
//     let imageCover;
//     if (doc) imageCover = doc.imageCover;

//     return {
//       name: req.params.slug,
//       products,
//       imageCover,
//     };
//   });
//   // 3) send res as a collection
//   res.status(200).json({
//     status: 'success',
//     data: {
//       collection,
//     },
//   });
// });

// // collection for admin account
// exports.getAccountCollection = catchAsync(async (req, res, next) => {
//   // 1) get the slug
//   const { slug } = req.params;
//   // 2) find the collection
//   const collection = await Collection.findOne({ slug });
//   // 3) send err
//   if (!collection) {
//     return next(new AppError('No document found.', 404));
//   }
//   // 4) send res
//   res.status(200).json({
//     status: 'success',
//     data: {
//       collection,
//     },
//   });
// });

// // the default collections for admin account
// exports.getAccountDefaultCollections = catchAsync(async (req, res, next) => {
//   // 1) get the slug
//   const { slug } = req.params;
//   // 2) find the document
//   const collection = await Image.findOne({ slug });
//   // 3) send err
//   if (!collection) {
//     return next(new AppError('No document dound.', 404));
//   }
//   // 4) send res
//   res.status(200).json({
//     status: 'success',
//     data: {
//       collection,
//     },
//   });
// });

// exports.grtAllCollections = catchAsync(async (req, res, next) => {
//   const collections = await getOrSetCache('all_collection', async () => {
//     //  1) find collections
//     return await Collection.find();
//   });
//   // 2) send res.
//   res.status(200).json({
//     status: 'success',
//     results: collections.length,
//     data: {
//       collections,
//     },
//   });
// });

// exports.createNewCollection = catchAsync(async (req, res, next) => {
//   // 1) create the collection
//   const collection = await Collection.create(req.body);
//   // 2) send response
//   res.status(201).json({
//     status: 'success',
//     data: {
//       collection,
//     },
//   });
// });

// exports.getCollectionById = catchAsync(async (req, res, next) => {
//   // 1) get the id
//   const { id } = req.params;
//   // 2) find the collection and populate products
//   const collection = await Collection.findById(id);
//   // 3) if no cllection send error
//   if (!collection)
//     return next(new AppError('No document found with that ID.', 404));
//   // 4) send res
//   res.status(200).json({
//     status: 'success',
//     data: {
//       collection,
//     },
//   });
// });

// exports.getDisplayedCollection = catchAsync(async (req, res, next) => {
//   // 1) get the collection mode
//   if (!req.query.mode && !req.query.name)
//     return next(new AppError('Please use query values.', 400));

//   const collection = await getOrSetCache(
//     `collection_display_${req.query.name || req.query.mode}`,
//     async () => {
//       // 2) find the collection
//       const collection = await Collection.find(req.query);

//       return collection;
//     }
//   );
//   // 4) send res
//   res.status(200).json({
//     status: 'success',
//     data: {
//       collection,
//     },
//   });
// });

// exports.getCollectionProducts = catchAsync(async (req, res, next) => {
//   let limit;
//   if (req.query.limit) {
//     limit = Number(req.query.limit);
//     req.query.limit = undefined;
//   }
//   // 1) get the id
//   if (!req.query.mode && !req.query.name)
//     return next(new AppError('Please use query values.', 400));

//   const collection = await getOrSetCache(
//     `collection_display_products_${req.query.name || req.query.mode}`,
//     async () => {
//       // 2) find the collection and populate products
//       const collection = await Collection.findOne(req.query).populate({
//         path: 'products',
//         select:
//           'collar color name imageCover imageDetail model price sale type cut size',
//         options: { limit: limit },
//       });
//       // 3) if no cllection send error
//       if (!collection)
//         return next(new AppError('No document found with that ID.', 404));

//       return collection;
//     }
//   );
//   // 4) send res
//   res.status(200).json({
//     status: 'success',
//     data: {
//       collection,
//     },
//   });
// });

// exports.getProductCollection = catchAsync(async (req, res, next) => {
//   // 1) get the id
//   const { id } = req.params;
//   // 2) find the collection and populate products
//   const collection = await Collection.findById(id).populate('products');
//   // 3) if no cllection send error
//   if (!collection)
//     return next(new AppError('No document found with that ID.', 404));
//   // 4) send res
//   res.status(200).json({
//     status: 'success',
//     data: {
//       collection,
//     },
//   });
// });

// exports.updateCollectionById = catchAsync(async (req, res, next) => {
//   // 1) get the id
//   const { id } = req.params;

//   // check the mode
//   if (req.body.mode) {
//     const doc = await Collection.findOne({ mode: req.body.mode });
//     if (doc) {
//       await Collection.findByIdAndUpdate(
//         doc._id,
//         { mode: 'none' },
//         {
//           new: true,
//           runValidators: true,
//         }
//       );
//     }
//   }

//   // 2) update the collection
//   const collection = await Collection.findByIdAndUpdate(id, req.body, {
//     new: true,
//     runValidators: true,
//   });
//   // 3) if no collection send error
//   if (!collection)
//     return next(new AppError('No document found with that ID.', 404));
//   // 4) send res
//   res.status(200).json({
//     status: 'success',
//     data: {
//       collection,
//     },
//   });
// });

// exports.deleteCollectionById = catchAsync(async (req, res, next) => {
//   // 1) get the id
//   const { id } = req.params;
//   // 2) delete the collection
//   const collection = await Collection.findByIdAndDelete(id);
//   // 3) if no collection send error
//   if (!collection)
//     return next(new AppError('No document found with that ID.', 404));
//   // 4) send res
//   res.status(204).json({
//     status: 'success',
//   });
// });
