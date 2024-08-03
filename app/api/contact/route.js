import { NextResponse, NextRequest } from "next/server";
import nodemailer from "nodemailer";

// Handles POST requests to /api

import { google } from "googleapis";

export async function POST(request) {
  const formData = await request.formData();
  console.log(formData);
  const name = formData.get("name");
  const email = formData.get("email");
  const company = formData.get("company");
  const message = formData.get("message");
  console.log(name, email, company, message);

  const username = process.env.NEXT_PUBLIC_EMAIL_USERNAME;
  const password = process.env.NEXT_PUBLIC_EMAIL_PASSWORD;
  const myEmail = process.env.NEXT_PUBLIC_PERSONAL_EMAIL;

  const auth = new google.auth.GoogleAuth({
    // keyFile: "/cred.json",
    credentials: {
      type: "service_account",
      project_id: "winter-cocoa-430810-t6",
      private_key_id: "d3b81ff1d5162e401964cfaac921e787b7a1bf2b",
      private_key:
        "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCw4/66qkHtrYMj\nMRGTyymqRzpGKQC/QlI+XMCB2C+c1Gpk2NM5/0KcceTTny9AZGT6LT6RKZtTWplN\nEz+DHVIo933UH1WI+W/cu0YNDwdyCTjJqEh4j26XdaliVctfw7TNSl1c9zx+vgWq\nObsJPQKIZWi7RGab95vM4HAP72uttu0rJJ+HRx3APB7jfu+29M7IuDGipboBjAzs\nj05XWS6cD58W2rg556DQqDmqnScwZ+sQ278PyWeEiIXeM/RW3CuHDlkcMWssjm3D\nNKd8GUwk8RILe1xc2mj7PF+JKxRgYOEO/oDTqc4cZBqSzZrCEL68pfDxiUNg1FAC\nK3jE9LmlAgMBAAECggEAOJy3ZSlhUT6DZktpezn9uzPxmAu+Y/fHV5Mav1OfpVss\nM9ta+shRmr0uxXXASyT2VkUNraq5vdsUjiDXZlCHf3n56N4gY2alYOkEueAx+1Kt\nPIjhrMgG1m1/SOv5W0xIvJ0MtVihIVUSfhDc5c+DVIDUHH7/MfJ0iATaiJcRCLal\nrcYNpYQxou/3so+lDlLaJO42GELvrqbk04O/T9H60v/ryT4z8MyED7/WZq8PZmw3\nL4LHAvB/rJYXwtGrA/+yjRWeSOL/Wbj/kQ4nc50YdkzsxJvUL2DNqnABe3yTIAcW\nzPFTa5Y81xYf3GlDvL8DmRWQi3sc9frZ7IMv2Q2KDwKBgQD1EG/feoUZfjnUHe1t\n/G27qje7BTWTrlq0kMYLNrCO8hy48xdhIpSIas8iz8KRO3rwT0MuwEKzNH+mjNH1\nb6uiFQvvGvrJBe/olSbm5sX9JJAkqzKs2J/+4jyI0kwpD/IqKMyg2Yh8umtWYEYN\nl3KVb2hajbyHZ28mGc9Bd7MHXwKBgQC4yMHBg3yiPdoOQF4oWxClpwnCqqGyotAm\nBmczbLTSNMyk41/Hg5q62mwKCgDd3U0KPGNGbelBL2T5sdLlkBcKF4LdPbF9MMaf\nkS0k63a3GgqozNxu6U52Cy/eF7BICV1RYZndn10QT/N4Te3Ji8NHkEUkFjDAVJIv\nIhiVAtkxewKBgFYAMbJ0lbcPlA27fvIlLwE3yB0Kw/WSr2REliujQqy3jJrfPGor\nL4L8MLrfvEEpZYhl2IbUk9O97bouGxSN3uafijOb/TyEp9+wUBmiDQM8TJWBuuPr\nlaJmFKZTXsTeQrbG4KDmFj7nUPncCVmFt4F3umBk8y91fg0Z66Dm993zAoGAQN0P\nznr2XAk0Kv6DTs0wmcV50qCM5CTsxfxHa7DEBGnOUC8UZveWb/LOK/P4++h765Tp\nEEbysxQM8O1v529d9wfrwvet/xEJF+ghHa2d3YZBqaFH25MAHMWuhtpv4cmPvUpy\ndW5Ef75g66EHUFFEOjG1Y4Z6lHjbW7ovQNdgIFMCgYEApQ4VZBub5NMqiRKfls/E\n0zhZHVeoHm+C9MBEp3HTptey7z2VGO+cdaCEV+NzB4Xv80ZnraGyDXskLAslz7fR\ncx0wMtWANr27TypepCFFC89OVonFiZLCbft55Zhat+UPuEGP/fCL72QBaZIGnUyo\nH1nq2Y/xkmHiBrKnvk8TLrs=\n-----END PRIVATE KEY-----\n",
      client_email:
        "form-submission@winter-cocoa-430810-t6.iam.gserviceaccount.com",
      client_id: "109093181629029413089",
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url:
        "https://www.googleapis.com/robot/v1/metadata/x509/form-submission%40winter-cocoa-430810-t6.iam.gserviceaccount.com",
      universe_domain: "googleapis.com",
    },
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  const client = await auth.getClient();

  const spreadsheetId = "11b3VimUrESCMzvUEIN04ldFDb9gFW3-FVhz2wzMc4I4";

  const googleSheets = google.sheets({ version: "v4", auth: client });

  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedToday = dd + "/" + mm + "/" + yyyy;

  await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: "Sheet1!A:E",
    valueInputOption: "RAW",
    resource: {
      values: [[name, email, company, message, formattedToday]],
    },
  });

  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: username,
      pass: password,
    },
  });

  try {
    const mail = await transporter.sendMail({
      from: username,
      to: myEmail,
      subject: `Website activity from ${email}`,
      html: `
            <p>Name: ${name} </p>
            <p>Email: ${email} </p>
            <p>Email: ${company} </p>
            <p>Message: ${message} </p>
            `,
    });

    return NextResponse.json({ message: "Success: email was sent" });
  } catch (error) {
    console.log(error);
    NextResponse.status(500).json({ message: "COULD NOT SEND MESSAGE" });
  }
}
