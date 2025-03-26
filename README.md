## Sistema de autoatendimento, tipo o do "Méqui"

**Projeto desenvolvido para estudo e uso em Portifólio**  
Este sistema de autoatendimento foi desenvolvido para fins de estudo e tem como objetivo fazer parte de um portfólio para demonstrar habilidades desenvolvidas em Next.js, PostgreSQL, Tailwindcss, Typescript e integrações com o Stripe para meios de pagamento e OpenAI para gerar relatórios por IA.

---

Um sistema de autoatendimento onde os usuários podem escolher como irão retirar seus pedidos, escolher seus produtos e realizar o pagamento. O sistema inclui um sistema de login via Google usando Auth.js, armazenamento e persistência dos dados por meio do PostgreSQL & Prisma e a integração com o gateway de pagamento Stripe para concluir o pagamento via cartão de crédito.

## Features

- **Autenticação de Usuário**: Para um processo de autenticação mais rápido e prático, os usuários podem se logar com sua conta do Google via [Auth.js](https://authjs.dev/).
- **Escolha se vai levar o vai comer no local**: Opções de delivery ou comer no restaurante.
- **Multiplos produtos e geração de Pedido**: Possibilidade em escolher multiplos produtos dentro das categorias e gerar número do pedido para melhor controle.
- **Pagamento por Cartão de Crédito**: segurança e facilidade no pagamento com [Stripe](https://stripe.com/br).
- **Banco de Dados**: PostgreSQL para armazenamento seguro e persistente.
- **Avaliação do restaurante**: Os usuários podem dar uma nota de até 5 estrelas para avaliar sua experiência no restaurante, ajudando a coletar feedbacks valiosos!.
- **Visualização de Descontos**: Os usuários podem ver descontos aplicados diretamente nos produtos, com base nas promoções cadastradas no banco de dados, proporcionando uma experiência ainda mais transparente e vantajosa.

## Integrações

1. **Auth.js** para autenticação de usuários.
2. **Stripe** para pagamento do pedido.
3. **OpenAI Developer Platform** for AI-powered financial report generation.

---

Este é um projeto [Next.js](https://nextjs.org).

## Instalação

```bash
  # Clone este repositório
  $ git@github.com:alexsandro-oliveira/alx-donalds.git

  # Acesse a pasta do projeto no terminal/cmd
  $ cd alx-donalds

  # Instale as dependências
  $ npm install

  # Configure as variáveis de ambiente no arquivo .env utilzando o arquivo .env.exemple
  $ .env.example .env

  # Para obter as variáveis do Stripe.
  $ Crie sua conta em [Stripe](https://stripe.com) para obter sua secret API key

  # Para obter as variáveis dedo Google.
  $ Obtenhas as chaves para login google em [Google-Developers](https://developers.google.com/).

  # Caso queira subir o serviço do PostgreSQL via docker (caso não tenha instalado o PostgreSQL em seu computador)
  $ docker-compose up -d

  # Rodar as migrations do prisma
  $ npx prisma migrate dev

  # Execute a aplicação em modo de desenvolvimento
  $ npm run dev

  # O servidor inciará na porta:3000 por padrão - acesse http://localhost:3000

```

## Deploy na Vercel

O deploy deste app foi feito na [Vercel platform](https://vercel.com/).

https://alx-donalds.vercel.app/alx-donalds

## 📚 Aprendizados e Próximos Passos

O desenvolvimento deste app de autoatendimento para restaurantes trouxe diversos insights sobre **inovação no atendimento ao cliente**. Deixando claro a importancia em deixar o usuário livre para realizar suas escolhas do que comer e onde comer. Com isso surgem os desafios técnicos e conceituais que nos ajudam a refinar uma solução, garantindo maior **usabilidade, impacto e escalabilidade**.

### ✅ **Principais Aprendizados**

- **Experiência do Usuário (UX) é fundamental** 📌  
  Criar um fluxo intuitivo e **acessível** para o usuário escolher onde quer receber seu pedido, o que quer comer e realizar o pagamento de forma simples e segura.
- **O poder das comunidades colaborativas** 🤝  
  A possibilidade de avaliar o restaurante **incentiva o engajamento** entre os usuários e melhora a relação entre fornecedor e cliente, tornando a plataforma um ambiente vivo e autossustentável.

- **Badge de Desconto no produto** 💰  
  A exibição de promoções, destacando descontos aplicáveis diretamente nos produtos foi uma **Feature** implementada para proporcionar uma **experiência** ainda mais **transparente e vantajosa** para o usuário.

- **Login com Google usando NextAuth:** 🚫  
  Para um processo de **autenticação** mais rápido e prático, os usuários podem se logar com sua conta do Google, graças a integração de **oAuth** entre **Auth.js e Google**.
