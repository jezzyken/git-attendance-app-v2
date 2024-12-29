const nodemailer = require("nodemailer");
const moment = require("moment");
const AppError = require("../utils/appError");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const generateAbsenceEmailTemplate = (
  parentName,
  studentName,
  className,
  date
) => {
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>Student Absence Notification</h2>
      <p>Dear ${parentName},</p>
      <p>This is to inform you that your child, <strong>${studentName}</strong>, was marked absent 
         for <strong>${className}</strong> on ${date}.</p>
      <p>If you believe this is an error or if you would like to provide documentation for this absence, 
         please contact us.</p>
      <br>
      <p>Thank you for your attention to this matter.</p>
      <p>Best regards,</p>
      <p>School Administration</p>
    </div>
  `;
};
class EmailService {
  static async sendAbsenceNotification(studentInfo, classInfo, date) {
    try {
      const formattedDate = moment(date).format("MMMM DD, YYYY");
      const parentName = studentInfo?.parentName || "Parent/Guardian";
      const studentName = `${studentInfo.user.firstName} ${studentInfo.user.lastName}`;
      const className = classInfo.subject.subjectName;

      const mailOptions = {
        from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM_ADDRESS}>`,
        to: studentInfo.parentEmail,
        subject: "Class Absence Notification",
        html: generateAbsenceEmailTemplate(
          parentName,
          studentName,
          className,
          formattedDate
        ),
      };

      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent successfully:", info.messageId);
      return info;
    } catch (error) {
      console.error("Error sending email:", error);
      throw new AppError("Failed to send email notification", 500);
    }
  }

  static async sendEmail(options) {
    try {
      const mailOptions = {
        from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM_ADDRESS}>`,
        to: options.to,
        subject: options.subject,
        html: options.html || options.text,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent successfully:", info.messageId);
      return info;
    } catch (error) {
      console.error("Error sending email:", error);
      throw new AppError("Failed to send email", 500);
    }
  }
}

module.exports = EmailService;
