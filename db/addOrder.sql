insert into orders (customerID, total, phase) 
values 
($1, $2, 'pending')
returning *;