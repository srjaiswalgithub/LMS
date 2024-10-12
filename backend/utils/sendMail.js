import nodemailer from 'nodemailer';


const sendMail = async function(email,subject,message){
    const transporter = nodemailer.createTransport({
        secure:true,
        port:process.env.SMTP_PORT,
        host:process.env.SMTP_HOST,
        auth:{
            user:process.env.SMTP_USERNAME,
            pass:process.env.SMTP_PASSWORD,
        },
    });

    // send mail with defined transport object
    await transporter.sendMail({
        to:email,
        subject:subject,
        html:message
    });
    
        
};

export default sendMail;



