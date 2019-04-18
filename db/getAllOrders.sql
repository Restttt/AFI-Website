select 
orders.orderID,
orders.total,
orders.customerID,
orders.phase,
customer.customer_name as name,
ARRAY_AGG(quantity) as quantities,
ARRAY_AGG(p_name) as products
from orders
inner join orderLine using (orderID)
inner join product using (productID)
inner join customer using (customerID)
group by orders.orderID, orders.total, orders.customerID, orders.phase, customer.customer_name
order by orders.orderID;