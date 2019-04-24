update product
set quantity = quantity - $1
where p_name = $2;