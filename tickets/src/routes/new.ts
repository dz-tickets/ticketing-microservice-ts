import { requireAuth, validateRequest } from '@dz_tickets/common';
import { body } from 'express-validator';
import express, { Response, Request } from 'express';
import { Ticket } from '../models/ticket';

const route = express.Router();

route.post('/api/tickets',
    requireAuth,
    [
        body('title')
            .not()
            .isEmpty()
            .withMessage('Title is required'),
        body('price')
            .isFloat({ gt: 0 })
            .withMessage('Price must be greater than zero'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { title, price } = req.body;

        const ticket = Ticket.build({
            title,
            price,
            userId: req.currentUser!.id
        });
        await ticket.save();
        res.status(201).send(ticket);
    });

export { route as createTicketRouter };