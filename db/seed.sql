CREATE TABLE customer (
    customerID SERIAL UNIQUE NOT NULL,
    email varchar(50) UNIQUE NOT NULL,
    customer_hash varchar(100) NOT NULL,
    customer_name varchar(50) NOT NULL,
    is_admin BOOLEAN,
    company varchar(100)   NOT NULL
);

CREATE TABLE customer_address (
    addressID SERIAL UNIQUE NOT NULL,
    address1 varchar(100) NOT NULL,
    address2 varchar(100) NOT NULL,
    city varchar(50) NOT NULL,
    state varchar(25) NOT NULL,
    zip int NOT NULL,
    customerID int NOT NULL
);

CREATE TABLE orders (
    orderID serial UNIQUE  NOT NULL,
    customerID int,
    total int   NOT NULL,
    phase VARCHAR(50) NOT NULL,
    orderdate text
);

CREATE TABLE orderLine (
    order_lineID serial  UNIQUE NOT NULL,
    orderID int   NOT NULL,
    productID int   NOT NULL,
    quantity int   NOT NULL
);

CREATE TABLE product (
    productID serial UNIQUE NOT NULL,
    p_image text NOT NULL,
    p_name varchar(200)   NOT NULL,
    category varchar(150) NOT NULL,
    price int   NOT NULL,
    stock int   NOT NULL,
    p_description varchar(1000) NOT NULL
    display BOOLEAN,
);

ALTER TABLE customer_address 
add constraint fk_address Foreign key (customerID) references customer (customerID);

ALTER TABLE orders 
add constraint fk_customer Foreign key (customerID) references customer (customerID);

ALTER TABLE orderLine 
add constraint fk_order Foreign key (orderID) references orders (orderID);

ALTER TABLE orderLine 
add constraint fk_product Foreign key (productID) references product (productID);

ALTER TABLE customer ALTER COLUMN is_admin
SET DEFAULT false;

ALTER TABLE product ALTER COLUMN display
SET DEFAULT true;


INSERT INTO product (p_image, p_name, price, stock, p_description, category) 
values 
('https://s3.us-east-2.amazonaws.com/afi-website-product-images/SM+Color+Coat.jpg', 'SEM COLOR COAT SPRAY CAN', 15, 10, 'SEM COLOR COAT is formulated to match, restore or change color on most vinyl surfaces, flexible and rigid plastics, carpet and velour. Fade resistant and flexible, COLOR COAT is not a dye, but a permanent paint coating. 12 oz. aerosol', 'paint'),
('https://s3.us-east-2.amazonaws.com/afi-website-product-images/Husky+Sander.jpg', 'Husky 6 in. Dual Action Sander', 45, 100, 'The new Husky air tool line is built to industrial standards for the professional user providing more power, less noise and longer life. This new Husky Dual Action Sander features a rubberized overmold for comfort. The large motor design provides ultimate stall resistance and the built in regulator allows you to match the tool speed to the job. Designed for surface preparation and final finish sanding of metals, plastics, composites, fillers and glass fiber used on autos and recreational vehicles. The dual action provides a smooth swirl free finish', 'tools'),
('https://s3.us-east-2.amazonaws.com/afi-website-product-images/3M+5301+Mask.JPG', '3M 5301 Half-Face Respirator', 25, 200, 'Organic Vapor – Used for petrochemicals, chemical manufacturing, construction', 'mask'),
('https://s3.us-east-2.amazonaws.com/afi-website-product-images/3M+6000+Mask.JPG', '3M 6000 Series Half Mask, M', 15, 50, 'Item: Half Mask Respirator, Facepiece Material: Thermoplastic Elastomer, Configured For: Dual Cartridge', 'mask'),
('https://s3.us-east-2.amazonaws.com/afi-website-product-images/16oz-kit_2000x.jpg', 'TOPCOAT F11 POLISH & SEALER - WEB SPECIAL KITS', 60, 30, 'F11® Improves coating characteristics & performance vs. TopCoat® HPS, especially on dark colors, hides micro-scratches & swirl marks more effective, longer lasting, more durable, extremely hydrophobic (easier to use on glass), insane depth of image & shine, wickedly slick with improved easy-release and non-stick coating technology, designed to significantly reduce weathering, dirt & debris build-up on any surface, ECO Safe!', 'car care')

INSERT INTO customer (email, customer_hash, customer_name, is_admin, company)
values
('ap@afipaintsupply.com', '$2a$10$BEH9hGTT50BMZMonYpUG7uEW2plpainVzTc.jCrMpNXp.nzku3vzG', 'AFI', true, 'AFI PAINT');
-- ORIGINAL PASSWORD IS: 200W0817


-- DUMMY DATA FOR ORDERS 
INSERT INTO orders (customerID, total, phase)
values
(1, 543, 'fulfilled'),
(1, 123, 'pending'),
(1, 67, 'processing'),
(1, 5, 'fulfilled'),
(2, 86, 'fulfilled');

INSERT INTO orderLine (orderID, productID, quantity)
values
(1, 4, 6),
(6, 5, 3),
(1, 1, 5),
(1, 3, 4),
(2, 2, 5),
(3, 2, 6),
(3, 3, 1),
(4, 1, 1),
(5, 3, 6),
(5, 2, 8);




-- USE TO DROP ALL FROM DATABASE
-- DROP SCHEMA public CASCADE;
-- CREATE SCHEMA public;

