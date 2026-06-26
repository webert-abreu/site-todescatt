import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message, propertyId, propertyTitle, source } = body;

    // Acessando as variáveis de ambiente no lado do servidor
    const webhookUrl = process.env.NEXT_PUBLIC_CRM_WEBHOOK_URL || process.env.CRM_WEBHOOK_URL;
    const apiKey = process.env.NEXT_PUBLIC_CRM_API_KEY || process.env.CRM_API_KEY;

    if (!webhookUrl) {
      console.error('Erro: CRM_WEBHOOK_URL não configurada no servidor.');
      return NextResponse.json(
        { error: 'Configuração do servidor ausente.' },
        { status: 500 }
      );
    }

    const payload = {
      name,
      email: email || '',
      phone: phone || '',
      message: message || '',
      property_id: propertyId || '',
      property_title: propertyTitle || '',
      source: source || 'Site Todescatti Imóveis',
      created_at: new Date().toISOString()
    };

    const crmResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey || ''
      },
      body: JSON.stringify(payload)
    });

    if (!crmResponse.ok) {
      const errorText = await crmResponse.text();
      console.error('Falha ao enviar lead para o CRM. Status:', crmResponse.status, errorText);
      return NextResponse.json(
        { error: 'Falha na comunicação com o CRM.' },
        { status: crmResponse.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro interno na API de contato:', error);
    return NextResponse.json(
      { error: 'Ocorreu um erro interno ao processar o seu contato.' },
      { status: 500 }
    );
  }
}
