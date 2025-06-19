# TravelWorld - Agência de Viagens Online

TravelWorld é um projeto completo de site de viagens, desenvolvido para proporcionar uma experiência moderna, responsiva e profissional para usuários que desejam planejar e reservar viagens, hotéis e destinos turísticos.

## ✨ Funcionalidades
- **Página inicial com busca rápida** de destinos e hotéis (autocomplete dinâmico)
- **Destinos populares** com cards visuais
- **Hotéis em destaque** e **ofertas de voos**
- **Newsletter** com cadastro de e-mails (armazenamento em MySQL)
- **Reserva de destinos** e **reserva de hotéis** com formulários modernos
- **Painel administrativo** protegido por senha para visualizar todas as reservas
- **Envio automático de e-mail de confirmação** ao usuário após reserva
- **Validação e feedback dinâmico** nos formulários (AJAX)
- **Design responsivo** e visual profissional

## 🛠️ Tecnologias Utilizadas
- **HTML5** e **CSS3** (com Flexbox, Grid e responsividade)
- **JavaScript** (autocomplete, validação, AJAX)
- **PHP** (back-end, integração com banco, envio de e-mails)
- **MySQL** (armazenamento de reservas e newsletter)
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
├── index.html             # Página inicial
├── reserva-destino.html   # Formulário de reserva de destino
├── reserva-hotel.html     # Formulário de reserva de hotel
├── reserva-destino.php    # Processa reserva de destino
├── reserva-hotel.php      # Processa reserva de hotel
├── db.php                 # Conexão com MySQL
├── newsletter.php         # Cadastro de newsletter
├── admin-reservas.php     # Painel administrativo
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
3. **Configure o acesso ao banco em `db.php`:**
   - Edite usuário, senha e nome do banco conforme seu ambiente.
4. **Personalize o e-mail do remetente e senha do admin em `admin-reservas.php`:**
   - Altere as variáveis `$admin_email` e `$admin_senha` no topo do arquivo.
5. **Hospede os arquivos em um servidor com suporte a PHP e MySQL** (ex: XAMPP, WAMP, LAMP, hospedagem web)
6. **Acesse o site pelo navegador:**
   - `index.html` para o público
   - `admin-reservas.php` para o painel admin (senha definida por você)

## 🔒 Segurança
- O painel admin é protegido por senha simples. Para produção, recomenda-se implementar autenticação mais robusta.
- Os dados dos formulários são validados no front-end (JavaScript) e no back-end (PHP).

## ✉️ E-mail de Confirmação
- O usuário recebe um e-mail automático após realizar uma reserva.
- O e-mail de remetente pode ser personalizado em `admin-reservas.php` e nos scripts PHP.
- Para funcionar em ambiente local, pode ser necessário configurar um servidor SMTP ou usar hospedagem real.

## 💡 Personalização
- Adicione mais destinos, hotéis e funcionalidades conforme desejar.
- Expanda o painel admin para editar/excluir reservas.
- Integre com APIs de voos/hotéis para dados reais.

## 👨‍💻 Autor
- Desenvolvido por Davi Benigo
- Contato: davi.benigo@gmail.com

---

Sinta-se à vontade para adaptar, expandir e usar este projeto como base para sua agência de viagens ou portfólio! 