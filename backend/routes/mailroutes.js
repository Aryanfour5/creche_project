
const adminEmail = 'aryanbachute063@gmail.com'; // Admin's email

// Mail setup (using Nodemailer)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: process.env.EMAIL_USER, // Sender email from .env file
      pass: process.env.EMAIL_PASS, // Sender email password from .env file (or app password)
  },
});

const sendEmail = (to, subject, text) => {
    if (!to) {
        console.error('Recipient email is missing!');
        return Promise.reject(new Error('Recipient email is missing'));
    }

    const mailOptions = {
        from: 'bachutearyan@gmail.com',
        to: to,
        subject: subject,
        text: text,
    };

    return transporter.sendMail(mailOptions);
};

app.post('/api/nanny/book-appointment/:nannyId', authenticate, async (req, res) => {
    const { nannyId } = req.params;
    const { userLocation, appointmentDate, meetingTime } = req.body;
    const userId = req.user.userId;
  
    if (!meetingTime) {
      return res.status(400).json({ message: "Meeting time is required." });
    }
  
    try {
      const appointmentDateTime = new Date(`${appointmentDate}T${meetingTime}:00.000Z`);
      const appointment = new Appointment({
        userId,
        nannyId,
        location: userLocation,
        meetingTime: appointmentDateTime,
      });
  
      await appointment.save();
  
      // Retrieve user and nanny details for the email
      const user = await User.findById(userId);
      const nanny = await Nanny.findById(nannyId);
  
      if (!user || !nanny) {
        return res.status(404).json({ message: "User or nanny not found." });
      }
  
      // Log user and nanny email to verify they exist
      console.log('User Email:', user.email);
      console.log('Nanny Email:', nanny.contactEmail);
  
      // Send confirmation email to the user
      const emailSubject = "Appointment Confirmation";
      const emailText = `
        Hi ${user.username},
  
        Your appointment with ${nanny.firstName} has been booked successfully!
  
        Appointment Details:
        - Date: ${appointmentDate}
        - Time: ${meetingTime}
        - Location: ${userLocation}
  
        Thank you for choosing our service!
      `;
  
      await sendEmail(user.email, emailSubject, emailText);
  
      // Send confirmation email to the nanny
      const nannyEmailSubject = "New Appointment Booking";
      const nannyEmailText = `
        Hi ${nanny.firstName},
  
        You have a new appointment booked with ${user.username}!
  
        Appointment Details:
        - Date: ${appointmentDate}
        - Time: ${meetingTime}
        - Location: ${userLocation}
        - User: ${user.username}
  
        Please confirm your availability.
      `;
  
      await sendEmail(nanny.contactEmail, nannyEmailSubject, nannyEmailText);
      
      res.status(200).json({ message: 'Appointment booked successfully!' });
    } catch (error) {
      console.error('Error booking appointment:', error);
      res.status(500).json({ message: 'Error booking appointment. Please try again later.' });
    }
  });