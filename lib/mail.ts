import { Resend } from 'resend';

const resendApiKey = 're_ADVgsbuW_DphQGyi5WBQiWPqJQkoQyZEy';
const resend = new Resend(resendApiKey);

const domain = 'http://localhost:3000';

export const sendVerificationEmail = async (formEmail: string, randomToken: string) => {
  const confirmationLink = `${domain}/verify-email?token=${randomToken}`;
  console.log('confirmationLink', confirmationLink);
  console.log('tok tok token', randomToken);
  console.log('tok email', formEmail);

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: formEmail,
      subject: 'Verify your email',
      html: `<p>Click <a href="${confirmationLink}">here</a> to verify your email.</p>`,
    });
    console.log('Verification email sent successfully');
  } catch (error) {
    console.error('Error sending verification email:', error);
  }
};
