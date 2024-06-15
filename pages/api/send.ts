// import { Resend } from "resend";


// const resendApiKey='re_ADVgsbuW_DphQGyi5WBQiWPqJQkoQyZEy'

// const resend = new Resend(resendApiKey)

// const domain = "http://localhost:3000"

// export const sendVerificationEmail = async (formEmail: string, randomToken: string) => {
//     const confirmationLink = `${domain}/verify-email?token=${randomToken}`
//     console.log('confirmationLink', confirmationLink);
//     console.log('tok tok token', randomToken);
//     console.log('tok email', typeof(formEmail));
    
//     // const { data, error } = await resend.emails.send({
//     //     from: 'onboarding@gmail.com',
//     //     to: 'taniaakterbristyb@gmail.com',
//     //     subject: 'Verify your email',
//     //     html: `<p>Click <a href="${confirmationLink}">here</a> to verify your email.</p>`
//     //   });

//       const fromEmail2 = formEmail;   

//     const data = await resend.emails.send({
//     from: fromEmail2,
//     to: `email@gmail.com`,
//     subject: 'Verify your email',
//     html: `<p>Click <a href="${confirmationLink}">here</a> to verify your email.</p>`
//     })
//     console.log('data', data, formEmail);
// }