// lib/mailer.ts
import nodemailer from 'nodemailer';

// 定義翻譯對象
const translations: { [key: string]: { [key: string]: string } } = {
    'en': {
        subject: 'Please verify your email',
        greeting: 'Thank you for registering!',
        body: 'You have successfully created an account. Please click the button below to verify your email address and complete the registration process.',
        button: 'Verify Email',
        footer: 'If you did not register, please ignore this email.',
        copyright: `© ${new Date().getFullYear()} Pokemon Nier. All rights reserved.`,
        copyright_2: ` Pokémon and All Respective Names are Trademark & © of Nintendo.`,
    },
    'zh-Hans': {
        subject: '请验证您的电子邮件',
        greeting: '感谢您的注册！',
        body: '您已成功创建了一个帐户。请点击下面的按钮来验证您的电子邮件地址，完成注册流程。',
        button: '验证邮件',
        footer: '如果您没有注册请忽略这封邮件。',
        copyright: `© ${new Date().getFullYear()} Pokemon Nier. 版权所有。`,
        copyright_2: `Pokémon 及所有相关名称，商标跟© 任天堂所有。`,
    },
    'zh-Hant': {
        subject: '請驗證您的電子郵件',
        greeting: '感謝您的註冊！',
        body: '您已成功創建了一個帳戶。請點擊下面的按鈕來驗證您的電子郵件地址，完成註冊流程。',
        button: '驗證郵件',
        footer: '如果您沒有註冊請忽略這封郵件。',
        copyright: `© ${new Date().getFullYear()} Pokemon Nier. 版權所有。`,
        copyright_2: `Pokémon 及所有相關名稱，商標跟© 任天堂所有。`,
    },
    // 可以根據需要添加更多語言
};

export async function sendVerificationEmail(email: string, token: string, lng: string) {
    const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_HOST, // Mailtrap SMTP host
        port: Number(process.env.MAILTRAP_PORT), // Mailtrap SMTP port
        auth: {
            user: process.env.MAILTRAP_USER, // Mailtrap SMTP user
            pass: process.env.MAILTRAP_PASS, // Mailtrap SMTP password
        },
    });

    const verificationUrl = `${process.env.NEXTAUTH_URL}/${lng}/verify?token=${token}`;

    // 獲取對應語言的翻譯，如果找不到則默認使用英文
    const translation = translations[lng] || translations['en'];

    const mailOptions = {
        from: '"Pokemon Nier" <no-reply@pokemonnier.com>',
        to: email,
        subject: translation.subject,
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; padding: 20px;">
          <div style="display: flex; align-items: center; margin-bottom: 20px;">
            <!-- 使用 SVG 作為 Logo，並調整大小 -->
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="max-width: 40px; margin-right: 10px;">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
              <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
              <path d="M3 12h6" />
              <path d="M15 12h6" />
            </svg>
            <h1 style="font-size: 24px; color: #333; margin: 0;">Pokemon Nier</h1>
          </div>
          <h2 style="color: #333;">${translation.greeting}</h2>
          <p style="color: #555; line-height: 1.6;">
            ${translation.body}
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" style="
              background-color: #4CAF50;
              color: white;
              padding: 15px 25px;
              text-decoration: none;
              border-radius: 5px;
              display: inline-block;
              font-size: 16px;
            ">${translation.button}</a>
          </div>
          <p style="color: #888; font-size: 12px;">
            ${translation.footer}
          </p>
          <hr style="border: 0; border-top: 1px solid #e0e0e0; margin: 20px 0;">
          <p style="color: #aaa; font-size: 12px; text-align: center;">
            ${translation.copyright}
          </p>
          <p style="color: #aaa; font-size: 12px; text-align: center;">
            ${translation.copyright_2}
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
}