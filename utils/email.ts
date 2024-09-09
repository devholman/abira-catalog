
// import emailjs from 'emailjs-com';

// import { CartItem } from '../_types';


// export default async function sendEmail(cartItems: CartItem[], total: number) {
//   const emailContent = `
//     Order Details:\n
//     ${cartItems.map((item) => `${item.title} - ${item.selectedSize} - $${item.price}`).join('\n')}
//     \nTotal: $${total.toFixed(2)}
//   `;

//   await emailjs.send('your_service_id', 'your_template_id', {
//     to_email: 'your_email@gmail.com',
//     message: emailContent,
//   });
// }
export const sendEmail=()=>console.log('hello')