import { NextApiRequest, NextApiResponse } from "next";

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

    res.status(200).json(meeting);
  } catch (error) {
    res.send(error);
  }
}
