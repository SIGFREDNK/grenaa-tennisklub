// NEXT
import { NextApiRequest, NextApiResponse } from 'next';

require('dotenv').config();
let nodemailer = require('nodemailer');

const PASSWORD = process.env.PASSWORD;

if (!PASSWORD) throw Error('No password specified in .env file');

/* eslint-disable */
export default async function (req: NextApiRequest, res: NextApiResponse) {
    const transporter = nodemailer.createTransport({
        port: 587,
        host: 'smtp.simply.com',
        auth: {
            user: 'mailbot@simaaps.dk',
            pass: PASSWORD!.toString()
        },
        secure: false
    });

    const text = `
        NAVN: ${req.body.firstname} ${req.body.lastname}\n\r
        TELEFONNUMMER: ${req.body.phone}\n\r
        MAIL: ${req.body.mail}\n\r
        SPILTYPE: ${req.body.playType}\n\r
        MEDLEMSKAB: ${req.body.membership}\n\r
        ${req.body.playType === 'TENNIS' ? `SÆSON: ${req.body.season}` : ''}\n\r
        \n\r
        SAMLET PRIS: ${req.body.price}
    `;

    const html = `
        <p>Indmelding</p>
        <h3>Kontakt oplysninger</h3>
        <ul>
            <li>Navn: ${req.body.firstname} ${req.body.lastname}</li>
            <li>Telefonnummer: ${req.body.phone}</li>
            <li>Mail: ${req.body.email}</li>
            <li>Spiltype: ${req.body.playType}</li>
            <li>Medlemskab: ${req.body.membership}</li>
            ${req.body.playType === 'TENNIS' ? `<li>Sæson: ${req.body.season}</li>` : ''}
        </ul>
        <h3>Samlet Pris</h3>
        <p>${req.body.price}</p>
    `;

    const mailData = {
        from: 'mailbot@simaaps.dk',
        to: 'sigfred00@hotmail.com',
        subject: `Indmelding (${req.body.firstname} ${req.body.lastname})`,
        text: text,
        html: html
    };

    transporter.sendMail(mailData, function (err: Error, info: any) {
        if (err)
            return res.status(500).json({
                status: 'failed',
                message: 'Vi kunne desværre ikke sende beskeden. Kontakt os venligst telefonisk eller per mail'
            });
        else
            return res.status(200).json({
                status: 'success',
                message: 'Beskeden er sendt',
                id: info.messageId,
                response: info.response
            });
    });

    return res.status(200);
}
