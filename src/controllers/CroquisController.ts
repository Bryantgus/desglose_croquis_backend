import { Request, Response } from "express";
import { catchAsync } from "../middleware/catchAsync";

export class CroquisController {
  static calculateCroquis = catchAsync(async (req: Request, res: Response) => {
    try {
      const response = await fetch('https://rectpack-allguillotines.onrender.com/pack', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body)
      })
      const data = await response.json();
      res.json(data);

    } catch (error) {
      res.status(500).json({ error: String(error) });
    }

  })
}