select
p_name as productName,
sum(quantity) as quantityCount
from product
inner join orderLine using (productID)
group by p_name
order by quantityCount desc
limit 5;