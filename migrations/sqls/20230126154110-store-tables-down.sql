ALTER TABLE Orders_Products DROP CONSTRAINT FK_order_product;
ALTER TABLE Orders_Products DROP CONSTRAINT FK_order_order;
ALTER TABLE Orders DROP CONSTRAINT FK_order_user;

DROP TABLE Orders_Products;
DROP TABLE Users;
DROP TABLE Products;
DROP TABLE Orders;