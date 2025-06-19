# TravelWorld - Agência de Viagens Online

TravelWorld é um projeto completo de site de viagens, desenvolvido para proporcionar uma experiência moderna, responsiva e profissional para usuários que desejam planejar e reservar viagens, hotéis e destinos turísticos.

## ✨ Funcionalidades
- **Página inicial com busca rápida** de destinos e hotéis (autocomplete dinâmico)
- **Destinos populares** com cards visuais
- **Hotéis em destaque** e **ofertas de voos**
- **Newsletter** com cadastro de e-mails (armazenamento em MySQL)
- **Reserva de destinos** e **reserva de hotéis** com formulários modernos
- **Painel administrativo** (em desenvolvimento para Node.js)
- **Envio automático de e-mail de confirmação** ao usuário após reserva
- **Validação e feedback dinâmico** nos formulários (AJAX)
- **Design responsivo** e visual profissional
- **Back-end Node.js/Express compatível com Vercel (serverless)**

## 🛠️ Tecnologias Utilizadas
- **HTML5** e **CSS3** (com Flexbox, Grid e responsividade)
- **JavaScript** (autocomplete, validação, AJAX)
- **Node.js** (Express-style, serverless functions para Vercel)
- **MySQL** (armazenamento de reservas e newsletter)
- **Nodemailer** (envio de e-mails)
- **Font Awesome** (ícones)
- **Google Fonts** (Montserrat)

## 📁 Estrutura de Pastas
```
site-de-viagem-main/
├── assets/                # Imagens e logos
├── css/
│   ├── style.css          # Estilos principais
│   └── js/
│       └── script.js      # Scripts JS do site
├── api/                   # Endpoints Node.js para Vercel
│   ├── reserva-destino.js
│   ├── reserva-hotel.js
│   └── newsletter.js
├── db.js                  # Conexão com MySQL
├── package.json           # Dependências Node.js
├── .env.example           # Exemplo de variáveis de ambiente
├── index.html             # Página inicial
├── reserva-destino.html   # Formulário de reserva de destino
├── reserva-hotel.html     # Formulário de reserva de hotel
└── README.md              # Este arquivo
```

## ⚡ Instalação e Uso
1. **Clone o repositório ou extraia os arquivos**
2. **Configure o banco de dados MySQL:**
   - Crie o banco e as tabelas executando:
     ```sql
     CREATE DATABASE travelworld DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
     USE travelworld;
     CREATE TABLE newsletter (
         id INT AUTO_INCREMENT PRIMARY KEY,
         email VARCHAR(255) NOT NULL UNIQUE,
         data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     );
     CREATE TABLE reserva_destino (
         id INT AUTO_INCREMENT PRIMARY KEY,
         nome VARCHAR(100) NOT NULL,
         email VARCHAR(100) NOT NULL,
         destino VARCHAR(100) NOT NULL,
         data_ida DATE NOT NULL,
         data_volta DATE NOT NULL,
         passageiros INT NOT NULL,
         data_reserva TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     );
     CREATE TABLE reserva_hotel (
         id INT AUTO_INCREMENT PRIMARY KEY,
         nome VARCHAR(100) NOT NULL,
         email VARCHAR(100) NOT NULL,
         hotel VARCHAR(100) NOT NULL,
         checkin DATE NOT NULL,
         checkout DATE NOT NULL,
         hospedes INT NOT NULL,
         data_reserva TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     );
     ```
3. **Configure as variáveis de ambiente** (no painel da Vercel ou arquivo `.env` local):
   - DB_HOST, DB_USER, DB_PASS, DB_NAME
   - SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_FROM
   - Veja `.env.example` para referência
4. **Instale as dependências Node.js:**
   ```bash
   npm install
   ```
5. **Faça o deploy para a Vercel:**
   - O projeto já está pronto para serverless (pasta `api/`)
   - Configure as variáveis de ambiente no painel da Vercel
   - Deploy automático pelo Git ou upload manual
6. **Acesse o site pelo navegador:**
   - `index.html` para o público
   - Reservas e newsletter funcionam via endpoints `/api/`

## 🔒 Segurança
- Os dados dos formulários são validados no front-end (JavaScript) e no back-end (Node.js).
- Recomenda-se proteger endpoints administrativos e variáveis sensíveis.

## ✉️ E-mail de Confirmação
- O usuário recebe um e-mail automático após realizar uma reserva.
- O e-mail de remetente é configurado via variável de ambiente `SMTP_FROM`.
- Para funcionar em ambiente local, pode ser necessário configurar um servidor SMTP ou usar hospedagem real.

## 💡 Personalização
- Adicione mais destinos, hotéis e funcionalidades conforme desejar.
- Expanda o painel admin para editar/excluir reservas (em desenvolvimento para Node.js).
- Integre com APIs de voos/hotéis para dados reais.

## 👨‍💻 Autor
- Desenvolvido por Davi Benigo
- Contato: davi.benigo@gmail.com

---

Sinta-se à vontade para adaptar, expandir e usar este projeto como base para sua agência de viagens ou portfólio! 