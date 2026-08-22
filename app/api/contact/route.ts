import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required form fields." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (apiKey) {
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: "Portfolio Contact Form <onboarding@resend.dev>",
        to: [process.env.CONTACT_EMAIL || "rifdandermawan252@gmail.com"],
        subject: `[Portfolio Inquiry] ${subject}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; background: #09090B; color: #FFFFFF;">
            <h2 style="color: #3B82F6;">New Contact Form Message</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <hr style="border-color: #27272A;" />
            <p><strong>Message:</strong></p>
            <blockquote style="background: #18181B; padding: 15px; border-left: 3px solid #3B82F6;">
              ${message.replace(/\n/g, "<br />")}
            </blockquote>
          </div>
        `,
      });
    } else {
      // Log submission on server console if API key is not configured yet
      console.log("[CONTACT_FORM_SUBMISSION]", { name, email, subject, message });
    }

    return NextResponse.json({
      success: true,
      message: "Message received successfully.",
    });
  } catch (error: unknown) {
    console.error("Error sending contact email:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error processing contact message." },
      { status: 500 }
    );
  }
}
