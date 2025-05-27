import express, { Request, Response } from 'express';
import { Ticket } from '../models/ticket';
import { BadRequestError, NotFoundError } from '@dz_tickets/common';

const router = express.Router();

router.get('/api/tickets/:id', async (req: Request, res: Response) => {
    let ticket;
    try {
        ticket = await Ticket.findById(req.params.id);
    } catch(err) {
        throw new BadRequestError('Invalid id');
    }
    if (!ticket) {
        throw new NotFoundError();
    }
    res.send(ticket);
});

export { router as showTicketRoute }