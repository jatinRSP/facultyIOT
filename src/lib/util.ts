import crypto from "crypto";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

export function generateToken(): string {
  return crypto.randomBytes(20).toString("hex");
}

export async function sendTokenEmail(email: string, token: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Your Faculty Registration Token",
    text: `Your token for registration is: ${token}\n\nPlease use this token to complete your registration within 24 hours. Do not share this token with anyone.`,
    html: `<p>Your token for registration is: <strong>${token}</strong></p><p>Please use this token to complete your registration within 24 hours. Do not share this token with anyone.</p>`,
  };

  try {
    await transporter.verify();
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.messageId);
  } catch (error) {
    console.error("Error sending email: ", error);
    throw new Error("Failed to send email");
  }
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function comparePasswords(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}
