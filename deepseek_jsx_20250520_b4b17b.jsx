const MemberWelcomeEmail = ({ memberName, companyName }) => {
  return `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; }
          .header { background-color: #1a5276; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; }
          .footer { background-color: #f2f2f2; padding: 10px; text-align: center; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Welcome to ASAWUSA</h1>
          <p>Associated Workers Union of South Africa</p>
        </div>
        
        <div class="content">
          <p>Dear ${memberName},</p>
          
          <p>On behalf of the Associated Workers Union of South Africa (ASAWUSA), 
          we are pleased to welcome you as our newest member!</p>
          
          <p>You have been registered as a member from <strong>${companyName}</strong>.</p>
          
          <h3>Your ASAWUSA Benefits:</h3>
          <ul>
            <li>Collective bargaining for better wages</li>
            <li>Workplace protection and representation</li>
            <li>Legal assistance for labor disputes</li>
            <li>Training and skills development programs</li>
          </ul>
          
          <p>For any questions, please contact your local ASAWUSA representative 
          or email us at membersupport@asawusa.org.za</p>
        </div>
        
        <div class="footer">
          <p>ASAWUSA - Building Worker Power Since 2010</p>
          <p>123 Union House, Johannesburg | +27 11 123 4567 | www.asawusa.org.za</p>
        </div>
      </body>
    </html>
  `;
};

export default MemberWelcomeEmail;