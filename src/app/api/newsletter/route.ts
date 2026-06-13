import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    const emailContent = `
New Newsletter Subscription

Email: ${email}
Subscribed at: ${new Date().toISOString()}
    `.trim()

    // Send notification email using Resend
    if (process.env.RESEND_API_KEY) {
      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Philo Homes <onboarding@resend.dev>',
          to: ['info@philo.homes'],
          subject: `New Newsletter Subscription: ${email}`,
          text: emailContent,
        }),
      })

      if (!resendResponse.ok) {
        console.error('Resend error:', await resendResponse.text())
        throw new Error('Failed to send email via Resend')
      }
    }
    // SendGrid fallback
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
          subject: `New Newsletter Subscription: ${email}`,
          content: [{ type: 'text/plain', value: emailContent }],
        }),
      })

      if (!sendgridResponse.ok) {
        console.error('SendGrid error:', await sendgridResponse.text())
        throw new Error('Failed to send email via SendGrid')
      }
    }
    // Development fallback
    else {
      console.log('=== NEWSLETTER SUBSCRIPTION ===')
      console.log(emailContent)
      console.log('===============================')
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error processing newsletter subscription:', error)
    return NextResponse.json(
      { error: 'Failed to process subscription' },
      { status: 500 }
    )
  }
}
