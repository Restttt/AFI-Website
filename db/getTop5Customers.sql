select 
customer_name as name,
sum(total) as total
from customer
inner join orders using (customerID)
group by customer.customer_name
limit 5;