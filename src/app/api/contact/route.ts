import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json()

    const gmailUser = process.env.GMAIL_USER || 'moulaiamine@gmail.com'
    const gmailPass = process.env.GMAIL_APP_PASSWORD

    if (!gmailPass) {
      console.error('CRITICAL: GMAIL_APP_PASSWORD is not defined.')
      return NextResponse.json({ success: false, error: 'Server configuration error.' }, { status: 500 })
    }

    // Using explicit SMTP settings for better reliability
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // use SSL
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    })

    const mailOptions = {
      from: `"TAFAQUH Contact" <${gmailUser}>`,
      to: gmailUser,
      replyTo: email,
      subject: `New Message from ${name} (via TAFAQUH)`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #1F4D36; background-color: #FDFBF7; border: 1px solid #C5A96A;">
          <h2 style="color: #D4AF37; border-bottom: 2px solid #C5A96A; padding-bottom: 10px;">New Contact Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <div style="margin-top: 20px; padding: 15px; background: white; border-radius: 5px;">
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <p style="margin-top: 20px; font-size: 12px; color: #4A5D54;">Sent from TAFAQUH Landing Page</p>
        </div>
      `,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Nodemailer Error:', error)
    return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 })
  }
}
