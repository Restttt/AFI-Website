update product
set display = $1
where p_name = $2
returning *;
