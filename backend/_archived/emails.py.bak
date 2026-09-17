from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import os
from typing import Optional

class EmailDeliveryError(Exception):
    pass

def send_contact_email(name: str, email: str, phone: str, company: Optional[str], service: str, message: str):
    """
    Send contact form email to VISIOART
    """
    recipient_email = "visioartprod@gmail.com"
    subject = f"Novo Contato - VISIOART: {service}"
    
    html_content = f"""
    <html>
        <head>
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                .header {{ background: #080808; color: #c8b89a; padding: 20px; text-align: center; }}
                .content {{ background: #f5f2ee; padding: 30px; }}
                .field {{ margin-bottom: 15px; }}
                .field-label {{ font-weight: bold; color: #080808; }}
                .field-value {{ margin-top: 5px; padding: 10px; background: #fff; border-left: 3px solid #c8b89a; }}
                .footer {{ text-align: center; padding: 20px; color: #888; font-size: 12px; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>VISIOART</h1>
                    <p>Nova Mensagem de Contato</p>
                </div>
                <div class="content">
                    <div class="field">
                        <div class="field-label">Nome:</div>
                        <div class="field-value">{name}</div>
                    </div>
                    <div class="field">
                        <div class="field-label">E-mail:</div>
                        <div class="field-value">{email}</div>
                    </div>
                    <div class="field">
                        <div class="field-label">Telefone:</div>
                        <div class="field-value">{phone}</div>
                    </div>
                    {f'<div class="field"><div class="field-label">Empresa:</div><div class="field-value">{company}</div></div>' if company else ''}
                    <div class="field">
                        <div class="field-label">Serviço de Interesse:</div>
                        <div class="field-value">{service}</div>
                    </div>
                    <div class="field">
                        <div class="field-label">Mensagem:</div>
                        <div class="field-value">{message}</div>
                    </div>
                </div>
                <div class="footer">
                    <p>Este email foi enviado através do formulário de contato do site VISIOART</p>
                </div>
            </div>
        </body>
    </html>
    """
    
    try:
        sendgrid_api_key = os.environ.get('SENDGRID_API_KEY')
        if not sendgrid_api_key:
            raise EmailDeliveryError("SENDGRID_API_KEY not configured")
        
        sender_email = os.environ.get('SENDER_EMAIL', 'noreply@visioart.com')
        
        message = Mail(
            from_email=sender_email,
            to_emails=recipient_email,
            subject=subject,
            html_content=html_content
        )
        
        # Set reply-to to the customer's email
        message.reply_to = email
        
        sg = SendGridAPIClient(sendgrid_api_key)
        response = sg.send(message)
        
        return response.status_code == 202
        
    except Exception as e:
        raise EmailDeliveryError(f"Failed to send email: {str(e)}")
