insert into customer_address(address1, city, state, zip, customerID) 
values
($1, $2, $3, $4, $5)
returning *;