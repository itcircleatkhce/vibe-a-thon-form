import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email, teamName, teamCode, leaderName } = await request.json()

    // Validate input
    if (!email || !teamName || !teamCode || !leaderName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if Resend API key is configured
    const resendApiKey = process.env.RESEND_API_KEY

    if (!resendApiKey) {
      console.log('Email would be sent to:', email)
      console.log('Team Name:', teamName)
      console.log('Team Code:', teamCode)
      // Return success even without email configured (for development)
      return NextResponse.json({ 
        success: true, 
        message: 'Email service not configured, but registration successful',
        emailSent: false 
      })
    }

    // Send email using Resend
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'mail@rohan-singh.com.np',
        to: [email],
        subject: `Your Team "${teamName}" has been created! - Vibe-a-thon Hackathon`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #F6EBD7;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F6EBD7; padding: 40px 20px;">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 20px rgba(167, 55, 45, 0.1); overflow: hidden;">
                    <!-- Header -->
                    <tr>
                      <td style="background: linear-gradient(135deg, #A7372D 0%, #FF914D 100%); padding: 30px; text-align: center;">
                        <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">🚀 Vibe-a-thon Hackathon</h1>
                        <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">December 7th, 2025</p>
                      </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                      <td style="padding: 40px 30px;">
                        <h2 style="color: #2C2C2C; margin: 0 0 20px 0; font-size: 24px;">Congratulations, ${leaderName}! 🎉</h2>
                        
                        <p style="color: #555555; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                          Your team <strong style="color: #A7372D;">"${teamName}"</strong> has been successfully created for the Vibe-a-thon Mini Hackathon!
                        </p>
                        
                        <!-- Team Code Box -->
                        <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                          <tr>
                            <td style="background: linear-gradient(135deg, #2B9A9A 0%, #3ABFBF 100%); border-radius: 12px; padding: 25px; text-align: center;">
                              <p style="color: rgba(255,255,255,0.9); margin: 0 0 10px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Your Team Code</p>
                              <p style="color: #ffffff; margin: 0; font-size: 36px; font-weight: bold; letter-spacing: 8px; font-family: 'Courier New', monospace;">${teamCode}</p>
                            </td>
                          </tr>
                        </table>
                        
                        <p style="color: #555555; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                          Share this code with your teammates so they can join your team during registration. Remember:
                        </p>
                        
                        <ul style="color: #555555; font-size: 14px; line-height: 1.8; padding-left: 20px; margin: 0 0 30px 0;">
                          <li>Teams need <strong>2-4 members</strong> to be eligible</li>
                          <li>Share the code only with your intended teammates</li>
                          <li>Your teammates should select "Join a Team" during registration</li>
                        </ul>
                        
                        <!-- CTA Button -->
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td align="center">
                              <a href="https://vibe-a-thon-delta.vercel.app/team-status" style="display: inline-block; background: linear-gradient(135deg, #A7372D 0%, #FF914D 100%); color: #ffffff; text-decoration: none; padding: 14px 30px; border-radius: 8px; font-weight: bold; font-size: 16px;">Check Team Status</a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td style="background-color: #F6EBD7; padding: 25px 30px; text-align: center; border-top: 1px solid rgba(167, 55, 45, 0.1);">
                        <p style="color: #777777; font-size: 14px; margin: 0 0 10px 0;">
                          Questions? Contact us at <a href="mailto:itcirclekhec@gmail.com" style="color: #2B9A9A;">itcirclekhec@gmail.com</a>
                        </p>
                        <p style="color: #999999; font-size: 12px; margin: 0;">
                          Made with vibes for the Vibe-a-thon community ✨
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>
        `,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Resend API error:', errorData)
      // Don't fail registration if email fails
      return NextResponse.json({ 
        success: true, 
        message: 'Registration successful, but email could not be sent',
        emailSent: false 
      })
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Team created and email sent successfully',
      emailSent: true 
    })

  } catch (error) {
    console.error('Error sending email:', error)
    // Don't fail registration if email fails
    return NextResponse.json({ 
      success: true, 
      message: 'Registration successful, but email could not be sent',
      emailSent: false 
    })
  }
}
