import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { fname, lname, email, phone, service, company, budget, message, newsletter } = req.body;

        // Validate required fields
        if (!fname || !email || !message) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Create transporter using Gmail with App Password
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });

        // Email to your inbox with customer details
        const adminMailOptions = {
            from: process.env.GMAIL_USER,
            to: 'info.pandanlabs@gmail.com',
            subject: `New Form Submission from ${fname} ${lname || ''}`,
            html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${fname} ${lname || ''}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
        ${service ? `<p><strong>Service Interested:</strong> ${service}</p>` : ''}
        ${budget ? `<p><strong>Budget Range:</strong> ${budget}</p>` : ''}
        ${newsletter ? `<p><strong>Newsletter:</strong> Yes, they want to receive updates</p>` : ''}
        <hr>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
            replyTo: email,
        };

        // Confirmation email to customer
        const customerMailOptions = {
            from: process.env.GMAIL_USER,
            to: email,
            subject: 'We Received Your Message - Pandan Labs',
            html: `
        <h2>Thank You for Reaching Out!</h2>
        <p>Dear ${fname},</p>
        <p>We've received your message and appreciate your interest in Pandan Labs. Our team will review your inquiry and get back to you within 24 hours.</p>
        <hr>
        <p><strong>Your Message Summary:</strong></p>
        <p><strong>Name:</strong> ${fname} ${lname || ''}</p>
        <p><strong>Service:</strong> ${service || 'Not specified'}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p>Best regards,<br><strong>Pandan Labs Team</strong></p>
        <p><em>Smart IT Solutions | POS Systems | E-Commerce Platforms | Custom Software</em></p>
      `,
        };

        // Send both emails
        await transporter.sendMail(adminMailOptions);
        await transporter.sendMail(customerMailOptions);

        return res.status(200).json({
            success: true,
            message: 'Email sent successfully! We will get back to you soon.'
        });
    } catch (error) {
        console.error('Email error:', error);
        return res.status(500).json({
            error: 'Failed to send email. Please try again later.',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}
