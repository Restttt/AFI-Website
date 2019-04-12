insert into customer (email, customer_hash, customer_name, company)
values
($1, $2, $3, $4)
returning *;