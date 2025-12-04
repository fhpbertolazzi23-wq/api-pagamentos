const express = require('express');
const cors = require('cors'); 

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API de Pagamentos está online.");
});

app.post('/pagamento', async (req, res) => {
  try {
    const { userId, courseId, amount, status } = req.body; // alguns gateways enviam status do pagamento

    console.log("Webhook recebido:", { userId, courseId, amount, status });

    if (status !== 'paid') {
      return res.status(400).json({ error: "Pagamento não confirmado" });
    }

    // chama a API do colega para matricular
    // await axios.post('https://api-do-colega.com/matriculas', { userId, courseId });

    return res.json({
      message: "Pagamento confirmado e matrícula processada",
      recebido: { userId, courseId, amount }
    });

  } catch (err) {
    console.error("Erro no webhook:", err);
    return res.status(500).json({ error: "Falha ao processar webhook" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("API de pagamentos rodando na porta " + PORT);
});
