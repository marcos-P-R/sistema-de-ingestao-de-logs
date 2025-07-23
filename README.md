# Centralizador de Logs com Kafka, Loki e Grafana

Este projeto implementa um pipeline completo de ingestão de logs:

- **API Fastify (Node.js)**: Recebe logs via HTTP (JSON).
- **Worker Java (Spring Boot)**: Consome logs do Kafka e envia para o Loki.
- **Kafka**: Fila intermediária de logs para garantir resiliência.
- **Loki**: Armazenamento leve e eficiente para logs.
- **Grafana**: Visualização dos logs.

---

## 📦 Tecnologias

- Node.js + Fastify
- Java + Spring Boot + Kafka Client + WebClient
- Apache Kafka
- Grafana + Loki
- Docker Compose

---

## 🚀 Como executar

1. **Clone o repositório:**

```bash
git clone url
cd centralizador-logs
```

2. **Suba os serviços com Docker Compose:**
```bash
docker compose up --build
```

3. **Acesse o Grafana:**
- URL: http://localhost:3000
- Usuário: admin
- Senha: admin

4. **Configure o Loki como fonte de dados:**
- Configuration → Data Sources → Add data source → Loki
- URL: http://loki:3100

5. **Envie um log de teste para a API:**
```bash
curl -X POST http://localhost:4000/logs \
  -H "Content-Type: application/json" \
  -d '{
    "service": "auth-service",
    "level": "error",
    "message": "Falha ao autenticar usuário",
    "timestamp": "2025-07-22T20:00:00Z",
    "context": {
      "userId": "123",
      "ip": "192.168.1.100"
    }
  }'
```

