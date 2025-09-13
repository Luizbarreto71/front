## Backend - AI Games

### Requisitos
- Node.js 18+

### Configuração
1. Copie `.env.example` para `.env` e preencha:
   - `JWT_SECRET`: uma string secreta forte
   - `CLIENT_ORIGIN`: origem do seu frontend (ex: https://seu-dominio.com)
   - `MP_ACCESS_TOKEN`: token do Mercado Pago (Produção ou Sandbox)
   - URLs de retorno do Mercado Pago
2. Instale dependências:
```bash
cd backend
npm install
```
3. Execute localmente:
```bash
npm start
```

### Endpoints
- POST `/api/auth/register` { email, password }
- POST `/api/auth/login` { email, password }
- GET `/api/auth/me` (Bearer token)
- POST `/api/pay/create` (Bearer token)
- POST `/api/pay/webhook` (Webhook do Mercado Pago)
- GET `/api/pro/feature` (Bearer token + usuário pago)
- GET `/api/health`

### Fluxo de Pagamento
1. Usuário logado chama `/api/pay/create` e recebe `init_point`.
2. Redirecionar o usuário para o `init_point` do Mercado Pago.
3. Ao aprovar, o Mercado Pago envia o webhook para `/api/pay/webhook`.
4. Webhook grava o pagamento e marca `users.is_paid = 1` quando `approved`.

### Banco de Dados
- SQLite (`backend/data.sqlite` criado automaticamente)
- Tabelas: `users`, `payments`

### Deploy (Hostinger)
- Crie um serviço Node.js apontando para `backend`
- Variáveis de ambiente: conforme `.env`
- Garanta que o webhook público do Mercado Pago aponte para `https://SEU_BACKEND/api/pay/webhook`
- Ajuste `CLIENT_ORIGIN` para o domínio do frontend na Hostinger



