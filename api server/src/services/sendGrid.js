import sgMail from '@sendgrid/mail';
import { SENDGRID_API_KEY } from '../configuration';

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
sgMail.setApiKey(SENDGRID_API_KEY);

export default sgMail;