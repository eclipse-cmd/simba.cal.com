import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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
