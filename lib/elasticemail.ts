// lib/mailer.ts
import { Configuration, EmailsApi, EmailTransactionalMessageData } from '@elasticemail/elasticemail-client-ts-axios';

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
    // 初始化 Elastic Email 配置
    const configuration = new Configuration({
        apiKey: process.env.ELASTICEMAIL_API_KEY || '',
    });

    const emailsApi = new EmailsApi(configuration);

    const verificationUrl = `${process.env.NEXTAUTH_URL}/${lng}/verify?token=${token}`;

    // 獲取對應語言的翻譯，默認為英文
    const translation = translations[lng] || translations['en'];

    // 構建郵件內容
    const emailTransactionalMessageData: EmailTransactionalMessageData = {
        Recipients: { 
            To: [email],
        },
        Content: {
            From: process.env.EMAIL_FROM || 'no-reply@pokemonnier.com', // 請替換為您的寄件人郵件地址
            Subject: translation.subject,
            Body: [
                {
                    ContentType: "HTML",
                    Charset: "utf-8",
                    Content: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                            <h1 style="color: #333;">${translation.greeting}</h1>
                            <p style="color: #555;">${translation.body}</p>
                            <div style="text-align: center; margin: 30px 0;">
                                <a href="${verificationUrl}" style="
                                    background-color: #4CAF50;
                                    color: white;
                                    padding: 15px 25px;
                                    text-decoration: none;
                                    border-radius: 5px;
                                    font-size: 16px;
                                ">${translation.button}</a>
                            </div>
                            <p style="color: #888; font-size: 12px;">${translation.footer}</p>
                            <hr style="border: 0; border-top: 1px solid #e0e0e0; margin: 20px 0;">
                            <p style="color: #aaa; font-size: 12px; text-align: center;">
                                ${translation.copyright}
                            </p>
                        </div>
                    `,
                },
            ],
        },
    };

    try {
        // 發送交易郵件
        const { data } = await emailsApi.emailsTransactionalPost(emailTransactionalMessageData);
        console.log('Email sent successfully:', data);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}