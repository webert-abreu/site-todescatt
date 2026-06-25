import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message, propertyId, propertyTitle, source } = body;

    // Validate required fields
    if (!name || (!email && !phone)) {
      return NextResponse.json(
        { error: 'Nome e pelo menos um contato (email ou telefone) são obrigatórios.' },
        { status: 400 }
      );
    }

    const crmWebhookUrl = process.env.CRM_WEBHOOK_URL;

    // Se a URL do CRM não estiver configurada, podemos apenas simular o sucesso para não quebrar a UI
    // ou registrar num log. No futuro o cliente insere a variável e passa a funcionar automaticamente.
    if (!crmWebhookUrl) {
      console.log('CRM_WEBHOOK_URL não configurada. Lead recebido:', {
        name,
        email,
        phone,
        message,
        propertyId,
        propertyTitle,
        source
      });
      return NextResponse.json({ success: true, warning: 'CRM não configurado' });
    }

    // Preparar o payload para enviar ao CRM
    const crmPayload = {
      name,
      email: email || '',
      phone: phone || '',
      message: message || '',
      property_id: propertyId || '',
      property_title: propertyTitle || '',
      source: source || 'Site Todescatt',
      created_at: new Date().toISOString()
    };

    const crmResponse = await fetch(crmWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${process.env.CRM_API_KEY}` // Descomente caso o CRM exija token futuramente
      },
      body: JSON.stringify(crmPayload)
    });

    if (!crmResponse.ok) {
      console.error('Falha ao enviar lead para o CRM. Status:', crmResponse.status);
      // Aqui ainda podemos retornar success para o cliente para ele não ver um erro
      // mas registrar o erro para os desenvolvedores
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro na API de contato:', error);
    return NextResponse.json(
      { error: 'Ocorreu um erro interno ao processar o seu contato.' },
      { status: 500 }
    );
  }
}
