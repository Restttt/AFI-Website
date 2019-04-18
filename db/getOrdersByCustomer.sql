select * from orders o
inner join orderLine l on o.orderID = l.orderID
where o.customerID = $1;