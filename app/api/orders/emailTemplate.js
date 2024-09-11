const generateEmailBody = (
  emailTitle,
  confirmationNumber,
  totalPrice,
  cart
) => {
  // Calculate total items and total price
  const totalItems = cart.reduce((total, item) => {
    return total + item.orders.reduce((sum, order) => sum + order.quantity, 0);
  }, 0);

  const orderDetails = cart
    .flatMap((item) =>
      item.orders.map(
        (order) => `
            <tr key="${item.id}">
                <td>${item.title}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>${order.color}</td>
                <td>${order.size}</td>
                <td>${order.quantity}</td>
            </tr>
        `
      )
    )
    .join("");

  return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f4;
                }
                .container {
                    width: 100%;
                    max-width: 600px;
                    margin: 0 auto;
                    background: #ffffff;
                    padding: 20px;
                    border: 1px solid #dddddd;
                }
                .header {
                    background-color: #333333;
                    color: #ffffff;
                    padding: 10px;
                    text-align: center;
                }
                .header h1 {
                    margin: 0;
                }
                .content {
                    padding: 20px;
                }
                .order-details {
                    margin-top: 20px;
                }
                .order-details table {
                    width: 100%;
                    border-collapse: collapse;
                }
                .order-details th, .order-details td {
                    border: 1px solid #dddddd;
                    padding: 8px;
                    text-align: left;
                }
                .order-details th {
                    background-color: #f2f2f2;
                }
                .footer {
                    background-color: #f2f2f2;
                    text-align: center;
                    padding: 10px;
                    margin-top: 20px;
                    font-size: 12px;
                    color: #666666;
                }
                .summary {
                    margin-top: 20px;
                    padding-top: 20px;
                    border-top: 1px solid #dddddd;
                }
                .summary p {
                    margin: 5px 0;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>${emailTitle}</h1>
                </div>
                <div class="content">
                    <p>Thank you for your order!</p>
                    <p>Your order number is: <strong>${confirmationNumber}</strong></p>
                    <div class="order-details">
                        <h2>Order Details:</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Price</th>
                                    <th>Color</th>
                                    <th>Size</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${orderDetails}
                            </tbody>
                        </table>
                    </div>
                    <div class="summary">
                        <h2>Order Summary:</h2>
                        <p><strong>Total Items:</strong> ${totalItems}</p>
                        <p><strong>Total Price:</strong> $${totalPrice}</p>
                    </div>
                </div>
                <div class="footer">
                    <p>If you have any questions, please contact our support team.</p>
                </div>
            </div>
        </body>
        </html>
    `;
};
export default generateEmailBody;
