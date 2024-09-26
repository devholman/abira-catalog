const generateMerchantEmailBody = (
  emailTitle: string,
  confirmationNumber: string,
  totalPrice: string,
  cart: any[],
  notes: string = "",
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  storeId: number
) => {
  const totalItems = cart.reduce((total, item) => {
    return (
      total +
      item.orders.reduce((sum: Number, order: any) => sum + order.quantity, 0)
    );
  }, 0);
  const getLastName = (name: string) => {
    const lastName = name.split(" ")[1];
    return lastName ? lastName : name;
  };
  let hasOrderNotes;

  const orderDetails = cart
    .flatMap((item) =>
      item.orders.map((order: any) => {
        hasOrderNotes = !!order.notes;
        return `
            <tr key="${item.id}">
                <td>${item.title}</td>
                <td>$${order.orderPrice.toFixed(2)}</td>
                <td>${order.color}</td>
                <td>${order.size}</td>
                <td>${order.quantity}</td>
                <td>${
                  order.material === "Dri-Fit (+ $5)"
                    ? "Dri-Fit"
                    : order.material
                }</td>
                <td>${
                  order.isAddBack
                    ? `${getLastName(order.playerName)} - ${order.playerNumber}`
                    : "no"
                }</td>
                ${order.notes ? `<td>order.notes</td>` : ""}
            </tr>
          `;
      })
    )
    .join("");

  return `
      <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Order</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f5f5f5;
        color: #333;
      }
      .container {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        padding: 20px;
        border: 1px solid #dddddd;
      }
      .header {
        text-align: center;
        padding-bottom: 20px;
        border-bottom: 1px solid #dddddd;
      }
      .header h1 {
        font-size: 28px;
        color: #000000;
        margin: 0;
      }
      .content {
        padding: 20px 0;
      }
      .content h2 {
        font-size: 20px;
        color: #222222;
        margin-bottom: 10px;
      }
      .content p {
        font-size: 16px;
        color: #555555;
        margin: 0 0 15px;
      }
      .order-details table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;
      }
      .order-details th, .order-details td {
        padding: 10px;
        border: 1px solid #dddddd;
        text-align: left;
      }
      .order-details th {
        background-color: #f5f5f5;
        font-size: 16px;
        color: #222222;
      }
      .order-details td {
        font-size: 14px;
        color: #333333;
      }
      .summary p {
        font-size: 16px;
        font-weight: bold;
        color: #000000;
        margin: 0 0 10px;
      }
      .footer p {
        font-size: 12px;
        color: #777777;
        text-align: center;
        margin-top: 30px;
      }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>${emailTitle}</h1>
        </div>
        <div class="content">
            <p>A new order has been placed. Below are the details:</p>
            <p>Order number: <strong>${confirmationNumber}</strong></p>

            <h2>Customer Information</h2>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Store ID:</strong> ${storeId}</p>

            <div class="order-details">
                <h2>Order Details</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Price</th>
                            <th>Color</th>
                            <th>Size</th>
                            <th>Quantity</th>
                            <th>Material</th>
                            <th>Back Option</th>
                            ${hasOrderNotes ? `<th>Item Notes</th>` : ""}
                        </tr>
                    </thead>
                    <tbody>
                        ${orderDetails}
                    </tbody>
                </table>

               ${
                 notes &&
                 `<h2>General Notes</h2>
                <p>${notes}</p>`
               } 
            </div>

            <div class="summary">
                <h2>Order Summary</h2>
                <p>Total Items: ${totalItems}</p>
                <p>Total Price: $${totalPrice}</p>
            </div>
        </div>

        <div class="footer">
            <p>If you have any questions, feel free to contact our support team at abirasportsapparel@gmail.com.</p>
        </div>
    </div>
</body>
</html>

    `;
};
export default generateMerchantEmailBody;
