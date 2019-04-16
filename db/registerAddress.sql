insert into customer_address(address1, address2, city, state, zip, customerID) 
values
($1, $2, $3, $4, $5, $6)
returning *;