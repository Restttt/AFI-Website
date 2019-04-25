insert into orders (customerID, total, phase, orderdate) 
values 
($1, $2, 'pending', $3)
returning *;