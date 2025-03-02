export const htmlContent: string = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f8f8f8;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                padding: 20px 0;
                background-color: #FF6600;
                border-radius: 10px 10px 0 0;
            }
            .header h1 {
                margin: 0;
                color: #ffffff;
                font-size: 28px;
            }
            .content {
                padding: 30px;
                text-align: center;
            }
            .content h2 {
                color: #333333;
                font-size: 24px;
            }
            .content p {
                color: #666666;
                font-size: 16px;
                line-height: 1.6;
            }
            .content .code {
                font-size: 32px;
                font-weight: bold;
                color: #FF6600;
                margin: 30px 0;
                padding: 15px;
                border: 2px dashed #FF6600;
                border-radius: 10px;
                background-color: #FFF5E6;
            }
            .footer {
                text-align: center;
                padding: 20px;
                font-size: 14px;
                color: #999999;
                background-color: #f8f8f8;
                border-radius: 0 0 10px 10px;
            }
            .button {
                display: inline-block;
                padding: 12px 24px;
                margin: 20px 0;
                font-size: 18px;
                color: #ffffff;
                background-color: #FF6600;
                text-decoration: none;
                border-radius: 5px;
                transition: background-color 0.3s ease;
            }
            .button:hover {
                background-color: #E65C00;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>FarmDirect</h1>
            </div>
            <div class="content">
                <h2>Verify Your Email</h2>
                <p>Thank you for choosing FarmDirect! To complete your registration and start enjoying delicious meals, please verify your email address by entering the following verification code:</p>
                <div class="code">{verificationToken}</div>
                <p>If you did not request this verification, please ignore this email or contact our support team.</p>
            </div>
            <div class="footer">
                <p>&copy; ${new Date().getFullYear()} FarmDirect. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
`

export const generateWelcomeEmailHtml = (name: string) => {
  return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to FarmDirect</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    margin: 0;
                    padding: 0;
                    background-color: #f8f8f8;
                }
                .container {
                    max-width: 600px;
                    margin: auto;
                    background-color: #ffffff;
                    border-radius: 10px;
                    overflow: hidden;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                    background-color: #FF6600;
                    color: white;
                    padding: 20px;
                    text-align: center;
                }
                .header h1 {
                    margin: 0;
                    font-size: 28px;
                }
                .content {
                    padding: 30px;
                    background-color: white;
                }
                .footer {
                    text-align: center;
                    padding: 20px;
                    font-size: 14px;
                    color: #888;
                    background-color: #f8f8f8;
                }
                .button {
                    display: inline-block;
                    padding: 12px 24px;
                    margin: 20px 0;
                    font-size: 18px;
                    color: #ffffff;
                    background-color: #FF6600;
                    text-decoration: none;
                    border-radius: 5px;
                    transition: background-color 0.3s ease;
                }
                .button:hover {
                    background-color: #E65C00;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Welcome to FarmDirect!</h1>
                </div>
                <div class="content">
                    <h2>Hi ${name},</h2>
                    <p>We're thrilled to have you on board at FarmDirect. Your culinary adventure starts now!</p>
                    <p>With FarmDirect, you can:</p>
                    <ul>
                        <li>Explore a diverse range of cuisines</li>
                        <li>Order from top-rated local restaurants</li>
                        <li>Enjoy quick and reliable delivery</li>
                        <li>Earn rewards with every order</li>
                    </ul>
                    <p>Ready to satisfy your cravings?</p>
                    <a href="https://FarmDirect.com/explore" class="button">Explore Our Menu</a>
                    <p>If you have any questions or need assistance, our support team is always here to help.</p>
                    <p><br>The FarmDirect Team</p>
                </div>
                <div class="footer">
                    <p>&copy; ${new Date().getFullYear()} FarmDirect. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
    `
}

export const generatePasswordResetEmailHtml = (resetURL: string) => {
  return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Reset Your Password</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    margin: 0;
                    padding: 0;
                    background-color: #f8f8f8;
                }
                .container {
                    max-width: 600px;
                    margin: auto;
                    background-color: #ffffff;
                    border-radius: 10px;
                    overflow: hidden;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                    background-color: #FF6600;
                    color: white;
                    padding: 20px;
                    text-align: center;
                }
                .header h1 {
                    margin: 0;
                    font-size: 28px;
                }
                .content {
                    padding: 30px;
                    background-color: white;
                }
                .footer {
                    text-align: center;
                    padding: 20px;
                    font-size: 14px;
                    color: #888;
                    background-color: #f8f8f8;
                }
                .button {
                    display: inline-block;
                    padding: 12px 24px;
                    margin: 20px 0;
                    font-size: 18px;
                    color: #ffffff;
                    background-color: #FF6600;
                    text-decoration: none;
                    border-radius: 5px;
                    transition: background-color 0.3s ease;
                }
                .button:hover {
                    background-color: #E65C00;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Reset Your Password</h1>
                </div>
                <div class="content">
                    <h2>Hello,</h2>
                    <p>We received a request to reset your password for your FarmDirect account. If you didn't make this request, please ignore this email.</p>
                    <p>To reset your password, click the button below:</p>
                    <a href="${resetURL}" class="button">Reset Password</a>
                    <p>If you're having trouble with the button above, copy and paste the following link into your browser:</p>
                    <p style="word-break: break-all; color: #FF6600;">${resetURL}</p>
                    <p>This link will expire in 1 hour for security reasons.</p>
                    <p>If you didn't request a password reset, please contact our support team immediately.</p>
                    <p>Thank you,<br>The FarmDirect Security Team</p>
                </div>
                <div class="footer">
                    <p>&copy; ${new Date().getFullYear()} FarmDirect. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
    `
}

export const generateResetSuccessEmailHtml = () => {
  return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Password Reset Successful</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    margin: 0;
                    padding: 0;
                    background-color: #f8f8f8;
                }
                .container {
                    max-width: 600px;
                    margin: auto;
                    background-color: #ffffff;
                    border-radius: 10px;
                    overflow: hidden;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                    background-color: #FF6600;
                    color: white;
                    padding: 20px;
                    text-align: center;
                }
                .header h1 {
                    margin: 0;
                    font-size: 28px;
                }
                .content {
                    padding: 30px;
                    background-color: white;
                }
                .footer {
                    text-align: center;
                    padding: 20px;
                    font-size: 14px;
                    color: #888;
                    background-color: #f8f8f8;
                }
                .button {
                    display: inline-block;
                    padding: 12px 24px;
                    margin: 20px 0;
                    font-size: 18px;
                    color: #ffffff;
                    background-color: #FF6600;
                    text-decoration: none;
                    border-radius: 5px;
                    transition: background-color 0.3s ease;
                }
                .button:hover {
                    background-color: #E65C00;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Password Reset Successful</h1>
                </div>
                <div class="content">
                    <h2>Hello,</h2>
                    <p>Your FarmDirect account password has been successfully reset.</p>
                    <p>You can now log in with your new password.</p>
                    <a href="https://FarmDirect.com/login" class="button">Log In Now</a>
                    <p>If you did not make this change or believe it was done in error, please contact our support team immediately.</p>
                    <p>Thank you for choosing FarmDirect. We hope you continue to enjoy our delicious offerings!</p>
                    <p>Best regards,<br>The FarmDirect Security Team</p>
                </div>
                <div class="footer">
                    <p>&copy; ${new Date().getFullYear()} FarmDirect. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
    `
}

