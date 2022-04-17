import fs from "fs";
import handlebars from "handlebars";
import moment from "moment";
import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;

  if (method === "DELETE") {
    const updateMeeting = await prisma?.meeting.update({
      where: {
        id: req.query.id as string,
      },
      data: {
        status: "cancelled",
      },
    });

    res.status(200).json({ message: "meeting cancelled", meeting: updateMeeting });
    return;
  }

  const body = req.body;

  const { email, date, name, notes, guest } = body;

  if (!email || !date || !name) {
    res.status(403).json({
      error: true,
      message: "all inputs field are required",
    });
  }

  const readHTMLFile = function (path: string, callback: any) {
    fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
      if (err) {
        console.log("Error occured while reading file: ", err);
        return;
      } else {
        callback(null, html);
      }
    });
  };

  //Initiate node mailer
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465, //587
    secure: true, // true for 465, false for other ports
    auth: {
      user: "emmie.cmd@gmail.com",
      pass: "iqwyzqvlirarrwtq",
    },
  });

  try {
    const meeting = await prisma?.meeting.create({
      data: {
        attendee_name: name,
        attendee_email: email,
        time: date,
        notes: notes ?? undefined,
        guest: guest ?? undefined,
      },
    });

    // send mail with defined transport object
    const sendTo = guest ? [meeting?.attendee_email, guest] : [meeting?.attendee_email];

    const mailHtmlTemplate = process.cwd() + "/meeting-email.html";
    console.log("EMAIL TEMPLATE: ", mailHtmlTemplate);
    readHTMLFile(mailHtmlTemplate, async function (err: any, html: any) {
      if (err) {
        res.status(406).json({ message: "an error occured, please try again" });
        return;
      }

      const template = handlebars.compile(html);
      const replacements = {
        name: meeting?.attendee_name,
        date: moment(meeting?.time).format("MMMM Do YYYY, h:mm:ss a"),
      };
      const htmlToSend = template(replacements);

      const info = await transporter.sendMail({
        from: "emmie.cmd@gmail.com",
        to: sendTo,
        subject: "Simba.Cal.com Meeting initiated ✔",
        html: htmlToSend,
      });

      console.log("Message sent: %s", info.messageId);
    });

    res.status(200).json(meeting);
    return;
  } catch (error) {
    res.send(error);
  }
}
