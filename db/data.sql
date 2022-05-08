INSERT INTO collections (name,imageHero,imageCover,image,imageDetail,imageOverview,mode,slug) 
VALUES ('fall 2020','fall_2020_imageHero','fall_2020_imageCover','fall_2020_image','fall_2020_imageDetail','fall_2020_imageOverview','main','fall_2020');
------------------------------------
INSERT INTO fabrics (name,stretch,antiBilling,butterySoft,preShrunk,breathable,durable)
VALUES ('cotton',true,true,true,true,true,true);
------------------------------------
INSERT INTO products (name,type,fabric,collectionId,sizeAndFit,materialAndCare,price,summary,cut,collar,color,colorHex,smallSize,largeSize,imageCover,imageDetail,images,slug)
VALUES ('crew curve-hem','t-shirt','cotton', 1 , 
ARRAY['Our shirts have a trim fit so if you are between sizes, we recommend sizing up.','The Curve-Hem eliminates bunching at the waist and provides a contoured, fitted look','Average torso length'] ,
ARRAY['62% polyester, 33% cotton, & 5% spandex','Machine wash cold','Wash with like colors','Tumble dry low','Do not iron'],
990, 'Our best-selling short sleeve style featuring our signature Curve-Hem. This shirt is a trim fit so if you are between sizes, we recommend sizing up. This style features our custom engineered PYCA® Pro fabric designed with workleisure in mind', 'classic', 'crew', 'black', '#000', 20, 15, 'crew_curve_hem_imageCover', 'crew_curve_hem_imageDetail', ARRAY['crew_curve_hem_image'],'crew_curve_hem');
-------------------------------------
INSERT INTO users (first_name,last_name,email,password)
VALUES ('John', 'Depp', 'john@example.com','test1234');
-------------------------------------
INSERT INTO reviews (product,user_id,review,title,score)
VALUES (1,2,'Cool shirt','fit very well',6);
-------------------------------------


