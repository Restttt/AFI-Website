insert into customer (email, customer_hash, customer_name)
values
($1, $2, $3)
returning *;