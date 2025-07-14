const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/sugestao', (req, res) => {
    const { nome, ingredientes } = req.query;
    const htmlResponse = `
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <title>Obrigado pela Sugestão!</title>
            <link rel="stylesheet" href="/css/style.css">
        </head>
        <body>
            <div class="container">
                <div class="agradecimento">
                    <h1>Obrigado pela sugestão!</h1>
                    <p>Sua sugestão foi recebida com sucesso.</p>
                    <p><strong>Nome do Lanche:</strong> ${nome}</p>
                    <p><strong>Ingredientes:</strong> ${ingredientes}</p>
                    <p>Em breve nossa equipe de chefs irá avaliar!</p>
                </div>
                <div class="nav-links">
                    <a href="/">Voltar ao Cardápio</a>
                </div>
            </div>
        </body>
        </html>
    `;
    res.status(200).send(htmlResponse);
});

app.get('/contato', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'views', 'contato.html'));
});

app.post('/contato', (req, res) => {
    const { nome, email, assunto, mensagem } = req.body;
    const htmlResponse = `
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <title>Mensagem Recebida!</title>
            <link rel="stylesheet" href="/css/style.css">
        </head>
        <body>
            <div class="container">
                 <div class="contato-recebido">
                    <h1>Mensagem Recebida!</h1>
                    <p>Olá, ${nome}. Agradecemos pelo seu contato!</p>
                    <p>Recebemos sua mensagem e responderemos em breve no e-mail: <strong>${email}</strong>.</p>
                    <hr>
                    <h3>Resumo da sua mensagem:</h3>
                    <p><strong>Assunto:</strong> ${assunto}</p>
                    <p><strong>Mensagem:</strong> ${mensagem}</p>
                </div>
                <div class="nav-links">
                    <a href="/">Voltar ao Cardápio</a>
                </div>
            </div>
        </body>
        </html>
    `;
    res.status(200).send(htmlResponse);
});

app.get('/api/lanches', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'public', 'data', 'lanches.json'));
});

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor da DevBurger rodando em http://localhost:${PORT}`);
});