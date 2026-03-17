import { NextRequest, NextResponse } from 'next/server'

interface DemoRequest {
  firstName: string
  lastName: string
  email: string
  phone?: string
  company?: string
  message?: string
}

export async function POST(request: NextRequest) {
  try {
    const data: DemoRequest = await request.json()

    // Validate required fields
    if (!data.firstName || !data.lastName || !data.email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Format the email content
    const emailContent = `
New Demo Request from Philo Homes Website

Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Company: ${data.company || 'Not provided'}

Message:
${data.message || 'No message provided'}

---
Submitted at: ${new Date().toISOString()}
    `.trim()

    // Send email using a simple fetch to an email service
    // Option 1: Use Resend (if RESEND_API_KEY is set)
    if (process.env.RESEND_API_KEY) {
      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Philo Homes <noreply@philo.homes>',
          to: ['info@philo.homes'],
          subject: `Demo Request: ${data.firstName} ${data.lastName}`,
          text: emailContent,
          reply_to: data.email,
        }),
      })

      if (!resendResponse.ok) {
        console.error('Resend error:', await resendResponse.text())
        throw new Error('Failed to send email via Resend')
      }
    }
    // Option 2: Use SendGrid (if SENDGRID_API_KEY is set)
    else if (process.env.SENDGRID_API_KEY) {
      const sendgridResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: 'info@philo.homes' }] }],
          from: { email: 'noreply@philo.homes', name: 'Philo Homes' },
          reply_to: { email: data.email },
          subject: `Demo Request: ${data.firstName} ${data.lastName}`,
          content: [{ type: 'text/plain', value: emailContent }],
        }),
      })

      if (!sendgridResponse.ok) {
        console.error('SendGrid error:', await sendgridResponse.text())
        throw new Error('Failed to send email via SendGrid')
      }
    }
    // Option 3: Log to console for development (no email service configured)
    else {
      console.log('=== DEMO REQUEST (No email service configured) ===')
      console.log(emailContent)
      console.log('================================================')

      // In production, you might want to store this in a database
      // or use a different notification method
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error processing demo request:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}
