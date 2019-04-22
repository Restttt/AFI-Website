select
p_name as productName,
sum(quantity) as quantityCount
from product
inner join orderLine using (productID)
where product.p_name = $1 OR 
product.p_name = $2 OR
product.p_name = $3 OR
product.p_name = $4 OR
product.p_name = $5
group by product.p_name
order by quantityCount desc;