# 🚀 Calculadora Financeira & Simulador de Investimentos

Este projeto é uma **Calculadora Financeira & Simulador de Investimentos** desenvolvida em React. Ele oferece um conjunto de ferramentas financeiras para auxiliar usuários no controle de suas finanças pessoais e na tomada de decisões de investimento, combinando usabilidade e interatividade.

---

## 👥 Integrantes do Grupo

* **RYAN CANDEU AMBONI**
* **NATHAN HENRIQUE FRASSETTO**
* **MATEUS DO NASCIMENTO INÁCIO**

---

## 💡 Descrição do Problema

No cenário financeiro atual, muitas pessoas enfrentam desafios significativos para gerenciar suas economias, planejar gastos e tomar decisões de investimento informadas. A falta de ferramentas integradas e acessíveis pode levar à desorganização financeira, decisões impulsivas de compra e aproveitamento limitado de oportunidades de investimento.

Este aplicativo surge como uma solução para simplificar esses processos, oferecendo funcionalidades essenciais em uma única interface:
* **Controle de Orçamento:** Permite o registro e acompanhamento de receitas e despesas para uma visão clara da saúde financeira.
* **Decisão de Compra:** Ajuda a avaliar a sustentabilidade de novas aquisições, especialmente as parceladas, com base na economia mensal disponível.
* **Análise de Investimentos:** Facilita o cálculo de retornos financeiros sob regimes de juros simples e compostos, fundamental para o planejamento futuro.

---

## 🛠️ Tecnologias Utilizadas

O projeto foi construído sobre uma base robusta de tecnologias web modernas:

* **Frontend:**
* **React (v19.x):** Biblioteca JavaScript líder para construção de interfaces de usuário dinâmicas e reativas.
* **JavaScript (ES6+):** A linguagem de programação central, utilizada com sintaxe moderna e assíncrona.
* **HTML5 & CSS3:** Fundamentos da estrutura e estilização visual da aplicação, garantindo semântica e responsividade.
* **Create React App:** Ferramenta oficial para configurar um ambiente de desenvolvimento React moderno, com build e otimização.
* * **GitHub:** Plataforma de hospedagem do repositório de código.
* **Netlify:** Plataforma para deploy e hospedagem contínua da aplicação.

---


## 📊 Descrição das Entidades e Suas Propriedades

As principais entidades de dados manipuladas e as informações inseridas pelos usuários são estruturadas da seguinte forma:

### 💰 Receita
Representa uma entrada de dinheiro no orçamento.
* `id`: `number` (Identificador único, gerado automaticamente usando `Date.now()`).
* `desc`: `string` (Descrição da receita, ex: "Salário", "Freelance", "Reembolso de Despesas").
* `valor`: `number` (Valor monetário da receita, ex: `2500.00`, `150.75`).

### 💸 Despesa
Representa uma saída de dinheiro do orçamento.
* `id`: `number` (Identificador único, gerado automaticamente usando `Date.now()`).
* `desc`: `string` (Descrição da despesa, ex: "Aluguel", "Supermercado", "Conta de Luz").
* `valor`: `number` (Valor monetário da despesa, ex: `800.00`, `45.90`).

### Outras Entidades/Dados Relevantes para Cálculos:

* **Item Desejado (Simulador "Compro ou Espero?"):**
* `valorItem`: `number` (Valor total do item desejado).
* `parcelas`: `number` (Número de parcelas em que o item seria pago).
* **Dados de Investimento (Juros Simples/Compostos):**
* `capitalInicial`: `number` (Valor inicial a ser investido ou emprestado).
* `taxaJuros`: `number` (Taxa de juros, em porcentagem ao mês, ex: `0.5`, `1.2`).
* `tempo`: `number` (Período de tempo em meses).

---

## 🚀 Como Executar o Projeto Localmente

Siga os passos abaixo para configurar e rodar o projeto em seu ambiente de desenvolvimento:


1. **Clone o Repositório:**
Abra seu terminal (PowerShell, CMD, Git Bash, etc.) e clone o projeto. Este comando baixará todos os arquivos do seu repositório GitHub para o seu computador.
```bash
git clone [https://github.com/RyanAmboni/ProjetoFinalFrontEnd.git](https://github.com/RyanAmboni/ProjetoFinalFrontEnd.git)
```
(Substitua a URL acima pela URL real do seu repositório se ela for diferente).

2. **Navegue até a Pasta do Projeto:**
Entre no diretório raiz do projeto que você acabou de clonar:
```bash
cd ProjetoFinalFrontEnd
```

3. **Instale as Dependências:**
Este comando instalará todas as bibliotecas e pacotes necessários, conforme especificado no `package.json` do projeto.
```bash
npm install
```

4. **Inicie o Servidor de Desenvolvimento:**
Após a instalação das dependências, você pode iniciar o servidor de desenvolvimento do React.
```bash
npm start
```
Isso abrirá a aplicação em seu navegador padrão, geralmente em `http://localhost:3000`. O servidor monitorará as alterações no código e recarregará a página automaticamente.

---

## ✨ Outros Conteúdos Relevantes Implementados no Projeto

Este projeto foi desenvolvido com atenção a detalhes e boas práticas, indo além dos requisitos básicos para enriquecer a experiência do usuário e demonstrar habilidades de desenvolvimento front-end:

* **Sistema de Notificações Internas (Toasts):**
Um sistema de mensagens dinâmicas e não intrusivas (toasts) foi implementado. Ele fornece feedback instantâneo ao usuário sobre o sucesso de operações (ex: "Receita adicionada com sucesso!", "Item editado com sucesso!"), informações importantes (ex: "Simulando compra...", "Não há resultado para copiar.") e alertas de erro (ex: "Por favor, preencha todos os campos corretamente."). As notificações surgem suavemente pela direita e desaparecem após alguns segundos.
* **Animações e Transições Significativas:**
A aplicação incorpora diversas animações e transições CSS para criar uma experiência de usuário mais polida e envolvente.
* **Implementação Completa de CRUD (Create, Read, Update, Delete):**
A seção "Calculadora Financeira" oferece controle total sobre as entidades de Receitas e Despesas:
* **Criar (Create):** Adição de novas receitas e despesas com descrição e valor.
* **Ler (Read):** Exibição clara das listas de receitas e despesas, e seus totais.
* **Atualizar (Update):** Funcionalidade para editar a descrição e o valor de itens já adicionados, com campos de input dinâmicos.
* **Excluir (Delete):** Remoção individual de qualquer receita ou despesa.
* **Código Altamente Modularizado e Componentizado:**
Seguindo os princípios do React, a aplicação é dividida em componentes menores e reutilizáveis (e.g., `Header`, `CalculadoraFinanceira`, `Toast`), facilitando a manutenção, a testabilidade e a escalabilidade do projeto.
* **Responsividade Abrangente:**
O design da interface é totalmente responsivo, adaptando-se fluidamente a diversos tamanhos de tela, desde dispositivos móveis até desktops, garantindo uma experiência de usuário consistente e agradável em qualquer aparelho.
* **Deploy Contínuo:**
O projeto foi configurado para **deploy contínuo via Netlify** (integrado com o GitHub), o que significa que cada `git push` para a branch `main` dispara um novo build e atualização automática da aplicação online. Isso demonstra prontidão para ambientes de produção.

