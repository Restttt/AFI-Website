select * from customer c
inner join customer_address a on c.customerID = a.customerID
where c.email = $1;