function verifyEmailHTMLGenerator(email, token) {
  return `<!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to T&N Jewelry</title>
          <style>
              a{
                  color: "white";
              }
              body {
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 0;
                  background-color: #f4f4f4;
              }
              .email-container {
                  width: 100%;
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #ffffff;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                  padding: 20px;
                  border: 1px solid #000000;
              }
              .header {
                  text-align: center;
                  padding: 20px;
                  background-color: #000000;
                  color: #ffffff;
              }
              .header h1 {
                  margin: 0;
                  font-size: 24px;
              }
              .content {
                  padding: 20px;
              }
              .content h2 {
                  color: #000000;
              }
              .content p {
                  line-height: 1.6;
                  color: #333333;
              }
              .footer {
                  text-align: center;
                  padding: 20px;
                  background-color: #000000;
                  color: #ffffff;
                  font-size: 12px;
              }
              .button {
                  display: inline-block;
                  padding: 10px 20px;
                  margin: 20px 0;
                  border: 1px solid #000000;
                  color: #ffffff;
                  text-decoration: none;
                  border-radius: 5px;
              }
              .button:hover {
                  background-color: #333333;
              }
          </style>
      </head>
      <body>
          <div class="email-container">
              <div class="header">
                  <h1>Welcome to T&N Jewelry</h1>
              </div>
              <div class="content">
                  <h2>Dear Valued Customer,</h2>
                  <p>We are thrilled to welcome you to the T&N Jewelry family. At T&N, we pride ourselves on offering exquisite, premium jewelry pieces that are designed to make a statement.</p>
                  <p>Explore our latest collections and discover the perfect piece to complement your style.</p>
                  <p>Should you have any questions or need assistance, our dedicated support team is here to help.</p>
                  <a href="${process.env.APP_URL}/customer/verify?email=${email}&token=${token}" class="button" style ="col"">Verify Email</a>
                  </div>
              <div class="footer">
                  <p>&copy; 2024 T&N Jewelry. All rights reserved.</p>
              </div>
          </div>
      </body>
      </html>
      `;
}
function forgotPasswordHTMLGenerator(email, token) {
  return `<!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to T&N Jewelry</title>
            <style>
                a{
                    color: "white";
                }
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f4;
                }
                .email-container {
                    width: 100%;
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    padding: 20px;
                    border: 1px solid #000000;
                }
                .header {
                    text-align: center;
                    padding: 20px;
                    background-color: #000000;
                    color: #ffffff;
                }
                .header h1 {
                    margin: 0;
                    font-size: 24px;
                }
                .content {
                    padding: 20px;
                }
                .content h2 {
                    color: #000000;
                }
                .content p {
                    line-height: 1.6;
                    color: #333333;
                }
                .footer {
                    text-align: center;
                    padding: 20px;
                    background-color: #000000;
                    color: #ffffff;
                    font-size: 12px;
                }
                .button {
                    display: inline-block;
                    padding: 10px 20px;
                    margin: 20px 0;
                    border: 1px solid #000000;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 5px;
                }
                .button:hover {
                    background-color: #333333;
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="header">
                    <h1>Welcome to T&N Jewelry</h1>
                </div>
                <div class="content">
                    <h2>Dear Valued Customer,</h2>
                    <p>We are thrilled to welcome you to the T&N Jewelry family. At T&N, we pride ourselves on offering exquisite, premium jewelry pieces that are designed to make a statement.</p>
                    <p>Explore our latest collections and discover the perfect piece to complement your style.</p>
                    <p>Should you have any questions or need assistance, our dedicated support team is here to help.</p>
                    <a href="${process.env.APP_CLIENT}/resetpassword?email=${email}&token=${token}" class="button" style ="col"">Verify Email</a>
                    </div>
                <div class="footer">
                    <p>&copy; 2024 T&N Jewelry. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
        `;
}
module.exports = { forgotPasswordHTMLGenerator, verifyEmailHTMLGenerator };
